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
    <main className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Models {year}</h1>
      <Suspense fallback={<p>Loacding...</p>}>
        <ul className="bg-white p-4 rounded shadow-md w-96">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <li key={index} className="border-b p-2">
                {vehicle.Model_Name}
              </li>
            ))
          ) : (
            <p>No data</p>
          )}
        </ul>
      </Suspense>
    </main>
  )
}
