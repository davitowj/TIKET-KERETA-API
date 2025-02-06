"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const AddPelanggan = () => {
    const [username, setUserame] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setUserame("")
        setPassword("")
        setNik("")
        setName("")
        setAddress("")
        setPhone("")
        
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            
            const TOKEN = getCookie(`token`)
            const url = `/customer/register`
            const requestData = {
                username, password, nik, name, address, phone
            }

            // hit endpoint to add kereta
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            
            const message = response.data.message

            if(response.data.success == true) {
                toast(message, {
                    containerId: `toastAdd`,
                    type: "success"
                })
                
                setShow(false)
                //reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAdd`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something Wrong`,
                {
                    containerId: `toastAdd`,
                    type: "error"
                }
            )
        }

    }

    return(
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button type="button" 
            onClick={ () => openModal()}
            className=" flex px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-400 text-white">Tambah Data Pelanggan</button>

            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">Tambah Data Pelanggan</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Data Yang Diisi Sudah Benar
                        </span>

                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Username Pelanggan
                            </small>
                            <input type="text" id={`username`} 
                            value={username} 
                            onChange={e => setUserame(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Password Pelanggan
                            </small>
                            <input type="text" id={`password`} 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text" id={`nik`} 
                            value={nik} 
                            onChange={e => setNik(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Pelanggan
                            </small>
                            <input type="text" id={`name`} 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Alamat 
                            </small>
                            <input type="text" id={`address `} 
                            value={address} 
                            onChange={e => setAddress(e.target.value)}
                            required={true}
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nomor Telepon
                            </small>
                            <input type="text" id={`phone`} 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)}
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

export default AddPelanggan