import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import type { Vehicle } from "@/types/vehicle"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const vehicles = await prisma.models.findMany({
      where: {
        OR: [
          { make: { make: { contains: query, mode: "insensitive" } } },
          { model: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        make: true,
      },
      orderBy: {
        make: {
          make: "asc",
        },
      },
    })

    const formattedVehicles: Vehicle[] = vehicles.map((vehicle) => ({
      id: vehicle.id,
      make: vehicle.make.make,
      model: vehicle.model,
      reg_no: vehicle.reg_no,
      year: vehicle.year,
      mileage: vehicle.mileage,
      body_type: vehicle.body_type,
      seat_capacity: vehicle.seat_capacity,
      rate: vehicle.rate,
      img: vehicle.img,
      booked_from: vehicle.booked_from ? vehicle.booked_from.toISOString() : null,
      booked_to: vehicle.booked_to ? vehicle.booked_to.toISOString() : null,
      created_at: vehicle.created_at ? vehicle.created_at.toISOString() : new Date().toISOString(),
    }))

    return NextResponse.json(formattedVehicles)
  } catch (error) {
    console.error("Error searching vehicles:", error)
    return NextResponse.json({ error: "An error occurred while searching vehicles" }, { status: 500 })
  }
}

