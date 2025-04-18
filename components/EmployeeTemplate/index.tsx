"use client"

import { removeCookie } from "@/helper/client-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

type props = {
    children: ReactNode
}

const EmployeeTemplate = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()


    const handleLogout = () => {
        // menghapus token dari cookie
        removeCookie(`token`)
        router.replace(`/`) //direct to login
        
    }

    return (
        <div className="w-dvw">
            {/* Header Section */}
            <header className="w-full p-5 bg-orange-600 flex items-center gap-3 ">
                <button type="button"
                    className="size-8 rounded-full flex justify-center items-center bg-blue-600 hover:bg-blue-400 text-white"
                    onClick={() => setShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <h1 className="text-xl font-bold text-white">
                    Sekopling Jes Gejes
                </h1>
            </header>

            {/* Side Bar Section */}
            <div className={`w-1/2 md:w-1/3 lg: 1/4 bg-blue-600 h-dvh fixed top-0 transform transition-transform ${show ? "left-0" : "right-full"}`}>

                {/* Brand Section */}
                <div className="w-full relative">
                    <div className="w-full my-5 flex justify-center text-white font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                        </svg>
                    </div>
                    <div className="absolute right-3 -top-5 cursor-pointer font-bold text-white text-2xl"
                        onClick={() => setShow(false)}>
                        &times;
                    </div>
                </div>

                {/* Menu Section */}
                <div className="w-full flex flex-col">
                    <Link href={`/karyawan/kereta`}
                        className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400">
                        Data Kereta
                    </Link>

                    <Link href={`/karyawan/admin`}
                        className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400">
                        Data Admin
                    </Link>

                    <Link href={`/karyawan/pelanggan`}
                        className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400">
                        Data Pelanggan
                    </Link>

                    <Link href={`/karyawan/jadwal`}
                        className="w-full rounded-md text-white p-3 font-semibold hover:bg-blue-400">
                        Data jadwal
                    </Link>

                    <div className="w-full rounded-md text-white p-3 font-semibold bg-rose-700 hover:bg-rose-400 cursor-pointer"
                    onClick={() => handleLogout()}>
                        Keluar 
                    </div>
                </div>

            </div>

            {myProp.children}

        </div>
    )
}

export default EmployeeTemplate