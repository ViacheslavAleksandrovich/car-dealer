import { Suspense } from 'react'

type Params = {
  params: {
    makeId: string
    year: string
  }
}

type Vehicle = {
  Model_Name: string
}

async function fetchModels(makeId: string, year: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  )
  const data = await res.json()
  return data.Results as Vehicle[]
}

export async function generateStaticParams() {
  const makesRes = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  )
  const makesData = await makesRes.json()
  const makes = makesData.Results.slice(0, 5)

  const years = [2021, 2022, 2023]

  return makes.flatMap((make: { MakeId: number }) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    })),
  )
}

export default async function ResultPage({ params }: Params) {
  const { makeId, year } = params
  const vehicles = await fetchModels(makeId, year)

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Models {year}
      </h1>

      <Suspense fallback={<p>Loading...</p>}>
        <ul className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl space-y-4">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <li key={index} className="border-b pb-4">
                <span className="text-lg text-gray-800">
                  {vehicle.Model_Name}
                </span>
              </li>
            ))
          ) : (
            <p>No data for this model and year</p>
          )}
        </ul>
      </Suspense>
    </main>
  )
}
