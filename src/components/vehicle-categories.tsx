'use client'

import Image from 'next/image'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const categories = [
  { label: 'Make', options: ['Mercedes', 'Toyota', 'Volvo', 'Tesla', 'Mazda', 'BMW'] },
  { label: 'Model', options: [] },
  { label: 'Town', options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'] },
  { label: 'Budget', options: [] },
  { label: 'Vehicle Type', options: ['SUV', 'Sedan', 'Van', 'Truck', 'Luxury'] },
  { label: 'Mileage', options: ['SUV', 'Sedan', 'Van', 'Truck', 'Luxury'] },
]

const brandLogos = {
    Mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png',
    Toyota: 'https://www.carlogos.org/car-logos/toyota-logo.png', 
    Volvo: 'https://www.carlogos.org/car-logos/volvo-logo.png',  
    Tesla: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png',
    Mazda: 'https://www.carlogos.org/car-logos/mazda-logo.png', 
    BMW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
  };
  
  
export function VehicleCategories() {
  return (
    <div className="space-y-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-1">
          {categories.map((category) => (
            <button
              key={category.label}
              className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              {category.label}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-3 gap-6">
        {Object.entries(brandLogos).map(([brand, logo]) => (
          <button
            key={brand}
            className="flex flex-col items-center space-y-2"
          >
            <div className="relative h-12 w-12">
              <Image
                src={logo}
                alt={brand}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs text-gray-600">{brand}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

