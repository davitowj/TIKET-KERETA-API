import { axiosInstance } from "@/helper/api"
import FilterJadwal from "./FilterJadwal"
import { getServerCookie } from "@/helper/server-cookie"
import { ScheduleType } from "@/app/karyawan/types"
import Schedule from "./Schedule"

type Props = {
    searchParams: Promise<{
        departured_location?: string
        arrived_location ?: string

    }>
}

// Get data jadwal
const getJadwal = async (departured_location: string, arrived_location: string): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`
        const TOKEN = await getServerCookie(`token`)
    
        // hit endpoint 
        const response: any = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })
        if(response.data.success == true) 
            return response.data.data 
        
        return[]
    } catch (error) {
        console.log(error);
        return[]
    }
}        
    
const JadwalPage = async (myProp: Props) => {
    const departured_location =
        (await myProp.searchParams).departured_location?.toString() || ""

    const arrived_location =
        (await myProp.searchParams).arrived_location?.toString() || ""
    
    const dataJadwal = await getJadwal(
        departured_location,
        arrived_location
    )
    return (
        <div className="w-full p-3">
            <div className="bg-sky-700 w-full p-3 rounded-md shadow-md ">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan Kereta Api
                </h1>

                <FilterJadwal
                departured_location={departured_location}
                arrived_location={arrived_location}
                />
            </div>

            {
                departured_location !== "" &&
                arrived_location !== "" &&
                <div className="my-3">
                    {/* Div ini aan tampil jika departured location dan arrived location telah diiisi / ttidak ksong */}

                    {
                        dataJadwal.length == 0 ? 
                        <div className="w-full p-3 rounded-md bg-orange-100">
                            Maaf, jadwal tidak tersedia
                        </div> : 
                        <div>
                            {
                                dataJadwal.map((jadwal, index) => (
                                    <Schedule
                                    item={jadwal}
                                    key={`keyJadwal-${index}`}
                                    />
                                ))
                            }
                        </div>
                    }

                </div>
            }

        </div>
    )
}

export default JadwalPage