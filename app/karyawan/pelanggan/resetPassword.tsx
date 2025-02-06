"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { UserType } from "../types"

type props = {
    pelanggan: UserType
}

const ResetPasswordPelanggan = (myProp: props) => {
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")

    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const TOKEN = getCookie(`token`)
            const url = `/customer/${myProp.pelanggan.id}`
            const requestData = {
                password
            }

            // hit endpoint to add kereta
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if (response.data.success == true) {
                toast(message, {
                    containerId: `toastEditPass-${myProp.pelanggan.id}`,
                    type: "success"
                })

                setShow(false)
                //reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEditPass-${myProp.pelanggan.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something Wrong`,
                {
                    containerId: `toastEditPass-${myProp.pelanggan.id}`,
                    type: "error"
                }
            )
        }

    }

    return (
        <div>
            <ToastContainer containerId={`toastEditPass-${myProp.pelanggan.id}`} />
            <button type="button"
                onClick={() => openModal()}
                className="px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>

            </button>

            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">Edit Data Pelanggan</h1>
                        <span className="text-sm text-slate-500">
                            Pastikan Data Yang Diisi Sudah Benar
                        </span>

                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Password
                            </small>
                            <input type="text" id={`password-${myProp.pelanggan.id}`}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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

export default ResetPasswordPelanggan