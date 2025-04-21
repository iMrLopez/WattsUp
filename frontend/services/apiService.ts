import axios from "axios";
import { Company, EstimateInput, EstimateResponse } from '../models/car.interface';

const backendUrl = "http://localhost:8000";

export async function estimate(payload: EstimateInput) {
  return axios.post<EstimateResponse>(
    `${backendUrl}/estimate`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
}

export async function getCompaniesAndTariffs() {
  return axios.get(`${backendUrl}/meta/companies_and_tariffs`);
}

export async function getCompaniesWithTariffs() {
  return axios.get<Company[]>('http://localhost:8000/meta/companies-with-tariffs');
}