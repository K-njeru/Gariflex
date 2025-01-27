export interface Vehicle {
  id: number
  make: string
  model: string
  reg_no: string
  year: number
  mileage: number
  body_type: string
  seat_capacity: number
  rate: number
  img: string
  booked_from: string | null
  booked_to: string | null
}

