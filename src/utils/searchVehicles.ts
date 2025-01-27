import type { Vehicle } from "@/types/vehicle"

export async function searchVehicles(query: string): Promise<Vehicle[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error("Failed to fetch vehicles")
    }
    const data: Vehicle[] = await response.json()
    return data
  } catch (error) {
    console.error("Error searching vehicles:", error)
    throw error
  }
}

