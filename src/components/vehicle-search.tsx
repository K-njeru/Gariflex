'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
/*import { VehicleCondition } from './vehicle-condition' */
import { VehicleCategories } from './vehicle-categories'
import { VehicleDeals } from './vehicle-deals'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function VehicleSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <div className="w-full bg-teal-700 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-medium">Hi, John Doe!</h2>
            <p className="text-xs text-muted-foreground">Nairobi, KE</p>
          </div>
        </div>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by car make or model"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white ring-search border-search focus-visible:ring-1 focus-visible:ring-search"
        />
      </div>
      </div>

      {/* Vehicle Condition Toggle 
      <VehicleCondition />
      */}

      {/* Categories */}
      <div className="px-4 py-6">
      <div className="my-6">
        <h3 className="text-sm font-medium mb-4">Search by category</h3>
        <VehicleCategories />
      </div>

      {/* Deals */}
      <div className="mt-8">
        <VehicleDeals />
      </div>
      </div>
    </>
  )
}

