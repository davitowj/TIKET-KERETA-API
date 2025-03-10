"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
    departured_location: string
    arrived_location: string
}

const FilterJadwal = (myProp: Props) => {
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] =useState<string>("")

    const router = useRouter()

    const handleSearch = () => {
        if(departured_location !== "" && 
            arrived_location !== ""
        ) {
            router.push(`/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`)
        }

    }

    /**useEffect duganakan untuk update data saat komponen ini dimuat ulang */
    useEffect(() => {
        setDeparturedLocation(myProp.departured_location)
        setArrivedLocation(myProp.arrived_location)
    }, [myProp])

    return (
        <div className="w-full my-5 flex flex-wrap items-center">
                    <div className="w-full md:w-1/2 p-3">
                        <strong className="font-semibold text-white">
                            Stasiun Asal
                        </strong> <br />
                        <input type="text" id={`departured_location`} 
                        className="w-full border p-2 rounded-sm"
                        value={departured_location}
                        onChange={e => setDeparturedLocation(e.target.value)}
                        
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-3">
                        <strong className="font-semibold text-white">
                            Stasiun Tujuan
                        </strong> <br />
                        <input type="text" id={`arrived_location`} 
                        className="w-full border p-2 rounded-sm"
                        value={arrived_location}
                        onChange={e => setArrivedLocation(e.target.value)}
                        
                        />
                    </div>

                    <button type="button"
                    onClick={() => handleSearch()}
                    className="px-4 py-2 rounded-md bg-orange-700 hover:bg-orange-500 text-white">
                        Cari Jadwal
                    </button>
                </div>
    )
}

export default FilterJadwal