import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Zap, Users } from "lucide-react"
import type { Vehicle } from "@/types/vehicle"

interface VehicleSearchResultsProps {
  results: Vehicle[]
}

const VehicleSearchResults: React.FC<VehicleSearchResultsProps> = ({ results }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {results.map((vehicle) => (
        <motion.div
          key={vehicle.id}
          className="bg-card rounded-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-48">
            <Image
              src={vehicle.img || "/placeholder.svg"}
              alt={`${vehicle.make} ${vehicle.model}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {vehicle.booked_from ? "Booked" : "Available"}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">
              {vehicle.make} {vehicle.model}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{vehicle.year}</span>
              <span className="text-sm font-medium">${vehicle.rate}/day</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{vehicle.mileage} miles</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Users className="w-4 h-4 mr-1" />
              <span>{vehicle.seat_capacity} seats</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span className="font-semibold mr-1">Type:</span>
              <span>{vehicle.body_type}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {vehicle.booked_from
                  ? `Booked: ${formatDate(vehicle.booked_from)} - ${formatDate(vehicle.booked_to)}`
                  : "Available Now"}
              </span>
            </div>
            <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center">
              <Zap className="w-4 h-4 mr-2" />
              Book Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default VehicleSearchResults

