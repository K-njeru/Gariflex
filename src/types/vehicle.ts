export interface Vehicle {
    id: string
    name: string
    make: string
    model: string
    year: number
    image: string
    hourlyRate: number
    dailyRate: number
    town: string
    mileage: number
    type: 'SUV' | 'Sedan' | 'Van' | 'Truck' | 'Luxury'
    condition: 'Used' | 'New'
    available: boolean
  }
  
  export type VehicleFilter = {
    make?: string
    model?: string
    town?: string
    budget?: number
    type?: Vehicle['type']
    condition?: Vehicle['condition']
  }
  
  