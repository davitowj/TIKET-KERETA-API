import { ScheduleType } from "@/app/karyawan/types"
import Link from "next/link"


type Props = {
    item : ScheduleType
}

export const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleString(
        `id-ID`, 
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }
    )
}
const Schedule = (myProp: Props) => {
    return (
        <div className="flex flex-wrap w-full border rounded-md shadow-md my-2">
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Berangkat Dari 
                </small>
                <strong>
                    {myProp.item.departured_location}
                </strong>

                <small className="text-xs font-semibold text-sky-700">
                    Waktu Keberangkatan 
                </small>
                <strong>
                    {showTime(myProp.item.departured_time)}
                </strong>
            </div>

            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Tiba di 
                </small>
                <strong>
                    {myProp.item.arrived_location}
                </strong>

                <small className="text-xs font-semibold text-sky-700">
                    Waktu Kedatangan
                </small>
                <strong>
                    {showTime(myProp.item.arrived_time)}
                </strong>
            </div>

            <div className="w-full md:w-4/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Unit Kereta
                </small>
                <strong>
                    {myProp.item.train_details.name}
                </strong>

                <small className="text-xs font-semibold text-sky-700">
                    Harga
                </small>
                <strong>
                    {myProp.item.price.toLocaleString(`en-US`, {
                        style: `currency`, currency: `IDR`
                    })}
                </strong>
            </div>
            <div className="w-full p-3 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">Opsi</small>
              <Link href={`/pelanggan/jadwal/${myProp.item.id}`}>   
              <button type="button"
              className="px-4 py-2 rounded-md bg-orange-700 hover:bg-orange-500 text-white">
                Pesan
              </button>
              </Link>  
            </div>
        </div>
    )
}

export default Schedule