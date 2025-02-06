"use client"
import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

 
type props = {
    id_wagon : number
}

const AddSeat = (myProp: props) => {

    const [id_wagon, setIdWagon] = useState<number>(0)
    const [seat_number, setSeatNumber] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setSeatNumber("")
        setIdWagon(myProp.id_wagon)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async(e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url =`/train/wagon/seat`
            const requestData = { seat_number     
            }

            const response : any = await axiosInstance.post(
                url, requestData, 
                {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                }
            )

            const message = response.data.message

            if(response.data.success == true) {
                setShow(false)

                toast(message, {
                    containerId: `toastAddSeat`,
                    type: `success`
                })

                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAddSeat`,
                    type: "warning"
                })
            }

        } catch (error) {
            console.log(error)
            toast(
                `Something Wrong`,
                {
                    containerId: `toastAddSeat`,
                    type: "error"
                }
            )
            
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddSeat`} />
            <button type="button" 
            onClick={() => openModal()}
            className="px-4 py-4 rounded-md bg-green-700 hover:bg-green-500 p-2 text-white">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>


            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">Tambah Kursi Kereta</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Data Yang Diisi Sudah Benar
                        </span>

                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Seat Number
                            </small>
                            <input type="text" id={`seat_number`} 
                            value={seat_number.toString()} 
                            onChange={e => setSeatNumber(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
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

export default AddSeat