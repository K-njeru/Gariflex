"use server"

import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import emailjs from "@emailjs/nodejs"

const prisma = new PrismaClient()

export type VehicleWithMake = {
  id: number
  model: string
  reg_no: string
  rate: number
  make: {
    make: string
  }
}

export async function getVehicles(): Promise<VehicleWithMake[]> {
  const vehicles = await prisma.models.findMany({
    select: {
      id: true,
      model: true,
      rate: true,
      reg_no: true,
      make: {
        select: {
          make: true,
        },
      },
    },
    orderBy: {
      make: {
        make: "asc",
      },
    },
  })
  return vehicles
}

const formSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Drop-off location is required"),
  pickupDateTime: z.date({
    required_error: "Pickup date and time is required",
  }),
  dropoffDateTime: z.date({
    required_error: "Drop-off date and time is required",
  }),
  vehicleId: z.number().min(1, "Vehicle selection is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  idNumber: z.string().min(1, "ID/Passport number is required"),
  specialRequest: z.string().optional(),
})

export type HireFormData = z.infer<typeof formSchema>

export async function submitHireRequest(data: HireFormData) {
  const validated = formSchema.parse(data)

  // Fetch vehicle details for the email
  const vehicle = await prisma.models.findUnique({
    where: { id: validated.vehicleId },
    include: {
      make: true,
    },
  })

  if (!vehicle) {
    throw new Error("Vehicle not found")
  }

  // Calculate rental duration and total cost
  const days = Math.ceil(
    (validated.dropoffDateTime.getTime() - validated.pickupDateTime.getTime()) / (1000 * 60 * 60 * 24),
  )
  const totalCost = days * vehicle.rate

  // Prepare email template parameters
  const templateParams = {
    to_email: process.env.ADMIN_EMAIL,
    from_name: `${validated.firstName} ${validated.lastName}`,
    from_email: validated.email,
    phone: validated.phone,
    id_number: validated.idNumber,
    vehicle: `${vehicle.make.make} ${vehicle.model} (${vehicle.reg_no})`,
    pickup_location: validated.pickupLocation,
    pickup_date: validated.pickupDateTime.toLocaleString(),
    dropoff_location: validated.dropoffLocation,
    dropoff_date: validated.dropoffDateTime.toLocaleString(),
    duration: `${days} days`,
    rate: `KES ${vehicle.rate}/day`,
    total_cost: `KES ${totalCost}`,
    special_request: validated.specialRequest || "None",
  }

  try {
    await emailjs.send(process.env.EMAILJS_SERVICE_ID!, process.env.EMAILJS_TEMPLATE_ID!, templateParams, {
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      privateKey: process.env.EMAILJS_PRIVATE_KEY!,
    })

    return {
      success: true,
      message: "Your request has been sent successfully! We'll get back to you shortly.",
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    throw new Error("Failed to send hire request. Please try again later.")
  }
}

