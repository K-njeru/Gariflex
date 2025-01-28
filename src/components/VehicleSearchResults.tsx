import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Zap, Users, ChevronRight } from "lucide-react"
import type { Vehicle } from "@/types/vehicle"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface VehicleSearchResultsProps {
  results: Vehicle[]
}

const VehicleSearchResults: React.FC<VehicleSearchResultsProps> = ({ results }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {results.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="flex-none w-80 rounded-lg overflow-hidden bg-card shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={vehicle.img || "/placeholder.svg"}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {vehicle.booked_from ? "Booked" : "Available"}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">
                  {vehicle.make} {vehicle.model}
                </h4>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="font-bold text-teal-700">${vehicle.rate}</span>
                    <span className="text-muted-foreground">/day</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{vehicle.year}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{vehicle.mileage} miles</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{vehicle.seat_capacity} seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">Type:</span>
                    <span>{vehicle.body_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{vehicle.booked_from ? "Booked" : "Available"}</span>
                  </div>
                </div>
                {vehicle.booked_from && (
                  <div className="text-xs text-muted-foreground mb-3">
                    Booked: {formatDate(vehicle.booked_from)} - {formatDate(vehicle.booked_to)}
                  </div>
                )}
                <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default VehicleSearchResults

