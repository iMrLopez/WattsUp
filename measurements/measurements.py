#!/usr/bin/env python3
"""
measurements.py

Script para automatizar la recolección de métricas:
1) Tiempo de inferencia (inferencias/segundo)
2) Recursos consumidos (CPU, RAM, Disco, Red)
3) Impacto energético estimado (Joule y kWh)
4) (Opcional) Calidad de Inferencia para un clasificador

Uso:
  python measurements.py \
      --endpoint http://localhost:8000/estimate \
      --payloads samples.json \
      --cpu-power 65 --ram-power 5 \
      [--classification-csv test.csv] \
      [--classification-endpoint http://localhost:8000/classify]
"""

import time
import json
import argparse
import requests
import psutil
import math
from statistics import mean, stdev

try:
    # Opcional: scikit-learn para métricas de clasificación
    from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix
    import pandas as pd
except ImportError:
    accuracy_score = precision_score = recall_score = confusion_matrix = None
    pd = None

def measure_inference(endpoint, payloads):
    """
    Mide tiempo de cada inferencia y retorna:
      - tiempos: lista de segundos por llamada
      - inferencias_por_segundo: promedio de 1/tiempo
      - std_ips: desviación estándar de inferencias/segundo
    """
    tiempos = []
    ipss = []
    for payload in payloads:
        t0 = time.perf_counter()
        resp = requests.post(endpoint, json=payload)
        resp.raise_for_status()
        t1 = time.perf_counter()
        dt = t1 - t0
        tiempos.append(dt)
        ipss.append(1.0 / dt if dt > 0 else 0.0)

    return {
        'tiempos': tiempos,
        'inferencias_por_segundo': mean(ipss),
        'std_ips': stdev(ipss) if len(ipss) > 1 else 0.0
    }

def measure_resources(endpoint, payloads):
    """
    Mide recursos (CPU%, RAM) antes y después de las inferencias.
    Retorna promedios y deltas de disco y red.
    """
    cpu_samples = []
    mem_samples = []
    disk0 = psutil.disk_io_counters()
    net0  = psutil.net_io_counters()

    for payload in payloads:
        # Muestra previa
        proc = psutil.Process()
        cpu0 = psutil.cpu_percent(interval=None)
        mem0 = proc.memory_info().rss / (1024**2)
        # Inferencia
        resp = requests.post(endpoint, json=payload)
        resp.raise_for_status()
        # Muestra posterior
        cpu1 = psutil.cpu_percent(interval=None)
        mem1 = proc.memory_info().rss / (1024**2)
        cpu_samples.append((cpu0 + cpu1) / 2)
        mem_samples.append((mem0 + mem1) / 2)

    disk1 = psutil.disk_io_counters()
    net1  = psutil.net_io_counters()

    return {
        'cpu_pct_avg':  mean(cpu_samples),
        'cpu_pct_std':  stdev(cpu_samples) if len(cpu_samples) > 1 else 0.0,
        'mem_mb_avg':   mean(mem_samples),
        'mem_mb_std':   stdev(mem_samples) if len(mem_samples) > 1 else 0.0,
        'disk_delta': {
            'read_bytes':  disk1.read_bytes - disk0.read_bytes,
            'write_bytes': disk1.write_bytes - disk0.write_bytes
        },
        'net_delta': {
            'sent_bytes':     net1.bytes_sent - net0.bytes_sent,
            'received_bytes': net1.bytes_recv - net0.bytes_recv
        }
    }

def measure_energy(tiempos, cpu_power, ram_power):
    """
    Calcula energía consumida en Joules y kWh:
      Joules = (cpu_power + ram_power) * tiempo_segundos
      kWh    = Joules / 3600
    """
    joules_list = [(cpu_power + ram_power) * t for t in tiempos]
    kwh_list    = [j / 3600.0 for j in joules_list]
    return {
        'energy_j_avg':   mean(joules_list),
        'energy_j_std':   stdev(joules_list) if len(joules_list) > 1 else 0.0,
        'energy_kwh_avg': mean(kwh_list),
        'energy_kwh_std': stdev(kwh_list) if len(kwh_list) > 1 else 0.0
    }

def measure_classification(csv_path, endpoint):
    """
    Evalúa accuracy, precision, recall y confusion matrix.
    CSV debe tener columna 'label' y features restantes.
    """
    if pd is None:
        print("pandas y scikit-learn no están instalados.")
        return {}
    df = pd.read_csv(csv_path)
    if 'label' not in df.columns:
        print("La CSV debe tener una columna 'label'.")
        return {}
    y_true = df['label'].tolist()
    X = df.drop(columns=['label']).to_dict(orient='records')
    y_pred = []
    for x in X:
        resp = requests.post(endpoint, json=x)
        resp.raise_for_status()
        y_pred.append(resp.json().get('predicted_label'))
    return {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, average='macro'),
        'recall': recall_score(y_true, y_pred, average='macro'),
        'confusion_matrix': confusion_matrix(y_true, y_pred).tolist()
    }

def main():
    parser = argparse.ArgumentParser(description="Medición de métricas del sistema WattsUp")
    parser.add_argument('--endpoint', required=True,
                        help='URL del endpoint /estimate')
    parser.add_argument('--payloads', required=True,
                        help='Archivo JSON con lista de payloads')
    parser.add_argument('--cpu-power', type=float, required=True,
                        help='Potencia estimada CPU (W)')
    parser.add_argument('--ram-power', type=float, required=True,
                        help='Potencia estimada RAM (W)')
    parser.add_argument('--classification-csv',
                        help='CSV para evaluar calidad de inferencia')
    parser.add_argument('--classification-endpoint',
                        help='Endpoint para predicción de clasificación')
    args = parser.parse_args()

    # Cargar payloads
    with open(args.payloads, 'r') as f:
        payloads = json.load(f)

    # 1) Tiempo de inferencia
    print("=== Medición de Inferencia ===")
    inf_stats = measure_inference(args.endpoint, payloads)
    print(json.dumps(inf_stats, indent=2))

    # 2) Recursos consumidos
    print("\n=== Medición de Recursos ===")
    res_stats = measure_resources(args.endpoint, payloads)
    print(json.dumps(res_stats, indent=2))

    # 3) Impacto energético
    print("\n=== Medición Energética ===")
    energy_stats = measure_energy(
        inf_stats['tiempos'], args.cpu_power, args.ram_power
    )
    print(json.dumps(energy_stats, indent=2))

    # 4) Calidad de inferencia (opcional)
    if args.classification_csv and args.classification_endpoint:
        print("\n=== Calidad de Inferencia ===")
        class_stats = measure_classification(
            args.classification_csv, args.classification_endpoint
        )
        print(json.dumps(class_stats, indent=2))

if __name__ == '__main__':
    main()

