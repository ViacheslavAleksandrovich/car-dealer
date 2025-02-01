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
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Choose a car
        </h1>

        <label className="block text-lg font-medium text-gray-700 mb-2">
          Models
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">Choose a model</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        <label className="block text-lg font-medium text-gray-700 mt-4 mb-2">
          Year
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Choose a year</option>
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
          className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg disabled:bg-gray-400 transition duration-300 hover:bg-blue-500"
          onClick={handleNext}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </div>
    </main>
  )
}
