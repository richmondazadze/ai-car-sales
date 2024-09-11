'use client'

import { useState } from 'react'
import CarList from '@/components/CarList'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null) // Updated to number | null

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">AI Car Sales</h1>
      <CarList onSelectCar={setSelectedCar} /> {/* onSelectCar will now work correctly */}
      {selectedCar && <ContactForm carId={selectedCar} />}
    </main>
  )
}
