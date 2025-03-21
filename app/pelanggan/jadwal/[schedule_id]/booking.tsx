"use client"

import { GerbongType } from "@/app/karyawan/types"
import { use, useEffect, useState } from "react"
import Seat from "./seat"
import { it } from "node:test"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"
import { useRouter } from "next/navigation"

type Props = {
    schedule_id: number,
    wagons: GerbongType[]
}

type SeatBook = {
    passanger_id: string
    passanger_name: string
    seat_number: string
}

const Booking = (myProp: Props) => {
    const [details, setDetails] = useState<SeatBook[]>([])
    const [wagons, setWagons] = useState<GerbongType[]>([])
    const router = useRouter()

    /**copy data array dari property "wagons" ke state "wagons"  */
    useEffect(() => {
        setWagons([...myProp.wagons])
    }, [myProp])

    const handleAddSeat = (seatBook: SeatBook) => {
        const temp = [...details]
        temp.push(seatBook)
        setDetails([...temp])


        const tempWagon = [...wagons]
        /**mencari posisi index dari gerbong yang mempunyai seat_number dari yang dipilih oleh pengguna */

        const findWagonIndex = tempWagon.findIndex(item => item.seats
            .map(it => it.seat_number)
            .includes(seatBook.seat_number)
        )

        /**Mencari posisi index dari kursi yang dipilih */ 
        const findSeatIndex = tempWagon[findWagonIndex]
        .seats.findIndex(item => item.seat_number === seatBook.seat_number)

        /**ubah status "used menjadi true" */
        tempWagon[findWagonIndex].seats[findSeatIndex].used = true

        setWagons([...tempWagon])
    }

    const handleRemoveSeat = (index: number, seatBook: SeatBook) => {
        const temp = [...details]
        temp.splice(index, 1)
        setDetails(temp)


        const tempWagon = [...wagons]
        /**mencari posisi index dari gerbong yang mempunyai seat_number dari yang dipilih oleh pengguna */

        const findWagonIndex = tempWagon.findIndex(item => item.seats
            .map(it => it.seat_number)
            .includes(seatBook.seat_number)
        )

        /**Mencari posisi index dari kursi yang dipilih */ 
        const findSeatIndex = tempWagon[findWagonIndex]
        .seats.findIndex(item => item.seat_number === seatBook.seat_number)

        /**ubah status "used menjadi false" */
        tempWagon[findWagonIndex].seats[findSeatIndex].used = false

        setWagons([...tempWagon])
    }

    const handleSave = async () => {
        try {
            if(details.length == 0) {
                toast(`Kamu harus pilih kursi dulu`, {
                    type: "warning"
                })
                return;
            }

            const url = `/purchase/customer`
            const requestData = {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: myProp.schedule_id,
                details
            }
            const TOKEN = getCookie(`token`) || ""
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {Authorization: `bearer ${TOKEN}`}
            })
            if(response.data.success == true) {
                const message = response.data.message
                toast(message, {
                    containerId:`toastBook`,
                    type: `success`
                })
                /**direct ke dalaman pencarian jadwal */
                router.replace(`/pelanggan/jadwal`)

            } 
        } catch (error) {
            console.log(error)
            toast(`Something wrong`, {
                containerId: `toastBook`
            })
            
        }
    }


    return(
        <div>

            <ToastContainer containerId={`toastBook`} />
            {
                myProp.wagons.map((item, index) => (
                    <div key={`keyWagon-${index}`}
                    className="w-full my-2 p-3 rounded-md shadow-md border">
                        <h3 className="font-semibold my-2">
                            {item.name}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {
                                item.seats.map((seat, indexSeat) => (
                                    <Seat 
                                    key={`keySeat-${index}-${indexSeat}`}
                                    item={seat}
                                    onSave={ seatBook => handleAddSeat(seatBook)}
                                    />
                                ))
                            }

                        </div>
                    </div>
                ))
            }
            <button type="button" onClick={() => handleSave()} 
            className="w-full rounded-md my-2 bg-green-600 hover:bg-green-500 text-white">
                Pesan Sekareng
            </button>

        </div>
    )

}

export default Booking