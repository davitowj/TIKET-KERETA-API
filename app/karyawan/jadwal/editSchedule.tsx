"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { ScheduleType } from "../types"

type Props = {
    schedule: ScheduleType
    /**Menyimpan array semua data kereta */
    
}

const EditSchedule = (myProp: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)


    const openModal = () => {
        setShow(true)
        setDeparturedLocation(myProp.schedule.departured_location)
        setArrivedLocation(myProp.schedule.arrived_location)
        setDeparturedTime(new Date)
        setArrivedTime(new Date)
        setPrice(myProp.schedule.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.schedule.id}`
            const requestData = {
                departured_location, departured_time, arrived_location, arrived_time, price
            }
            
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if (response.data.success == true) {
                setShow(false)
                toast(message, {
                    containerId: `toastEdit-${myProp.schedule.id}`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.schedule.id}`,
                    type: `warning`
                })
            }

        } catch (error) {
            console.log(error);
            toast(`Something Wrong`,
                {
                    containerId: `toastEdit-${myProp.schedule.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`} />
            <button className="px-4 py-2 rounded-md text-white bg-sky-700 hover:bg-sky-500"
                type="button"
                onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">Edit Jadwal Kereta</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Data Yang Diisi Sudah Benar
                        </span>

                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-600">
                                Berangkat Dari 
                            </small>
                            <input type="text" id={`departured_location-${myProp.schedule.id}`} 
                            value={departured_location}
                            onChange={e=> setDeparturedLocation(e.target.value)}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            required={true}
                        />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-600">
                               Waktu Keberangkat
                            </small> <br />
                            <DatePicker 
                            showTimeInput={true}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            id={`departured_time-${myProp.schedule.id}`}
                            selected={new Date(departured_time)}
                            dateFormat={`dd MMMM yyyy HH:mm`}
                            onChange={date => setDeparturedTime(date || new Date)}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-600">
                                Tiba Di
                            </small>
                            <input type="text" id={`arrived_location-${myProp.schedule.id}`} 
                            value={arrived_location}
                            onChange={e=> setArrivedLocation(e.target.value)}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            required={true}
                        />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-600">
                               Waktu Kedatangan
                            </small> <br />
                            <DatePicker 
                            showTimeInput={true}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            id={`arrived_time-${myProp.schedule.id}`}
                            selected={new Date(arrived_time)}
                            dateFormat={`dd MMMM yyyy HH:mm`}
                            onChange={date => setArrivedTime(date || new Date)}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-600">
                                Harga
                            </small>
                            <input type="number" id={`price-${myProp.schedule.id}`} 
                            value={price}
                            onChange={e=> setPrice(Number(e.target.value))}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            required={true}
                        />
                        </div>
                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-500 text-white">
                            Close
                        </button>

                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-500 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )

}
export default EditSchedule