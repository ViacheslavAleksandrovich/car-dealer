'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Make = {
  MakeId: number
  MakeName: string
}

const getCurrentYear = () => new Date().getFullYear()

export default function HomePage() {
  const [makes, setMakes] = useState<Make[]>([])
  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
    )
      .then((res) => res.json())
      .then((data) => setMakes(data.Results))
  }, [])

  const handleNext = () => {
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">Choose car</h1>
        <label className="block mb-2">Model:</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">Choose model</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Year:</label>
        <select
          className="w-full border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Choose year</option>
          {[...Array(getCurrentYear() - 2015 + 1)].map((_, i) => {
            const year = 2015 + i
            return (
              <option key={year} value={year}>
                {year}
              </option>
            )
          })}
        </select>

        <button
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          onClick={handleNext}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </div>
    </main>
  )
}
