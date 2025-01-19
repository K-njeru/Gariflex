import { VehicleSearch } from '@/components/vehicle-search'
import { BottomNav } from '@/components/bottom-nav'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-16">
        <VehicleSearch />
      </main>
      <BottomNav />
    </div>
  )
}

