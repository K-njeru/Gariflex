import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Zap, Users, ChevronRight } from "lucide-react"
import type { Vehicle } from "@/types/vehicle"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface VehicleSearchResultsProps {
  results: Vehicle[]
  searchPerformed: boolean
}

const VehicleSearchResults: React.FC<VehicleSearchResultsProps> = ({ results, searchPerformed }) => {
  const [showAll, setShowAll] = useState(false)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const isNew = (createdAt: string) => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return new Date(createdAt) > sevenDaysAgo
  }

  const displayedResults = showAll ? results : results.slice(0, 4)

  if (searchPerformed && results.length === 0) {
    return <div className="text-center text-muted-foreground mt-8">No make or model listed matched your query!</div>
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Search Results</h3>
        {results.length > 4 && (
          <Button
            variant="ghost"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {displayedResults.map((vehicle) => (
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
                {isNew(vehicle.created_at) && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    New
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
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
                    <MapPin className="w-4 h-4 mr-1 text-teal-700" />
                    <span>{vehicle.mileage} miles</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-teal-700" />
                    <span>{vehicle.seat_capacity} seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">Type:</span>
                    <span>{vehicle.body_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-teal-700" />
                    <span>{vehicle.booked_from ? "Booked" : "Available"}</span>
                  </div>
                </div>
                {vehicle.booked_from && (
                  <div className="text-xs text-muted-foreground mb-3">
                    Booked: {formatDate(vehicle.booked_from)} - {formatDate(vehicle.booked_to)}
                  </div>
                )}
                <div className="mt-auto">
                  <Button
                    className="w-full"
                    variant="default"
                    disabled={!!vehicle.booked_from}
                    aria-disabled={!!vehicle.booked_from}
                  >
                    <Zap className="w-4 h-4 mr-2 text-teal-700" />
                    {vehicle.booked_from ? "Not Available" : "Book Now"}
                  </Button>
                </div>
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

