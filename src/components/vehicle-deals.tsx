'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const deals = [
  {
    id: 1,
    name: 'Toyota Camry 2022',
    image: 'https://www.motortrend.com/uploads/sites/10/2017/11/2016-toyota-camry-se-sedan-angular-front.png',
    hourlyRate: 25,
    dailyRate: 150,
    town: 'Nairobi',
    year: 2022,
    mileage: 12000,
    condition: 'New' as const,
  },
  {
    id: 2,
    name: 'Toyota Camry 2025',
    image: 'https://cdn.motor1.com/images/mgl/bgENQj/s1/2025-toyota-camry.jpg',
    hourlyRate: 30,
    dailyRate: 180,
    town: 'Nairobi',
    year: 2025,
    mileage: 0,
    condition: 'New' as const,
  },
]

export function VehicleDeals() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Top deals</h3>
        <button className="flex items-center text-sm text-muted-foreground hover:text-gray-900">
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex-none w-72 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-cover"
                />
                {deal.condition === 'New' && (
                  <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-2">{deal.name}</h4>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm">
                    <span className="font-bold text-teal-700">${deal.hourlyRate}</span>
                    <span className="text-gray-500">/hour</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-teal-700">${deal.dailyRate}</span>
                    <span className="text-gray-500">/day</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{deal.town}</span>
                  <span>{deal.year}</span>
                  <span>{deal.mileage.toLocaleString()} Km</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

