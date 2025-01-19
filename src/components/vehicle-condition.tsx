'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function VehicleCondition() {
  const [condition, setCondition] = useState<'Used' | 'New'>('Used')

  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
      {['Used', 'New'].map((type) => (
        <button
          key={type}
          onClick={() => setCondition(type as 'Used' | 'New')}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            condition === type
              ? 'bg-teal-700 text-white'
              : 'bg-transparent text-gray-600'
          )}
        >
          {type} Cars
        </button>
      ))}
    </div>
  )
}

