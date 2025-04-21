export default interface Car {
  id: number;
  position: number;
  model_name: string;
  number_of_seats: number;
  range: string;
  efficiency: string;
  weight: string;
  acceleration_0_100: string;
  one_stop_range: string;
  battery_capacity: string;
  fastcharge_speed: string;
  towing_capacity: string;
  cargo_volume: string;
  price_in_uk: string;
  image_url: string;
  launch_date: string;
  discontinue_date: string;
  is_available: boolean;
}

// Mirror your backend Pydantic model:
export interface EstimateInput {
  battery_capacity: number
  vehicle_age: number
  charging_duration: number
  company: string
  period: string
}

// Shape of the JSON response:
export interface EstimateResponse {
  energy_kwh: number
  estimated_cost: number
}



export interface Tariff {
  periodName: string
  costKwh: number
}

export interface Company {
  companyName: string
  tariffs: Tariff[]
}