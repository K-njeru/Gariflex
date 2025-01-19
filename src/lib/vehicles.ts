import { supabase } from './supabase';
import type { Vehicle, VehicleFilter } from '@/types/vehicle'

export async function getVehicles(filter?: VehicleFilter) {
  let query = supabase
    .from('vehicles')
    .select('*')

  if (filter?.make) {
    query = query.eq('make', filter.make)
  }
  if (filter?.model) {
    query = query.eq('model', filter.model)
  }
  if (filter?.town) {
    query = query.eq('town', filter.town)
  }
  if (filter?.type) {
    query = query.eq('type', filter.type)
  }
  if (filter?.condition) {
    query = query.eq('condition', filter.condition)
  }
  if (filter?.budget) {
    query = query.lte('hourlyRate', filter.budget)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data as Vehicle[]
}

