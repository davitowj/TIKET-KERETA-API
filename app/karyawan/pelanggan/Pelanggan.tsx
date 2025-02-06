"use client"
import Link from "next/link"
import { UserType } from "../types"
import EditPelanggan from "./editPelanggan"
import DropPelanggan from "./dropPelanggan"
import ResetPasswordPelanggan from "./resetPassword"


type props = {
    item: UserType
}

const Pelanggan = (myProp: props) => {
    return (

        <div className="w-full flex  flex-wrap my-2 border rounded-md">

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">Username</small>
                <span>
                    <Link href={`/karyawan/pelanggan${myProp.item.id}`}>
                        {myProp.item.user_details.username}
                    </Link>
                </span>

            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">Nama Customer</small>
                <span>
                    <Link href={`/karyawan/pelanggan${myProp.item.id}`}>
                        {myProp.item.name}
                    </Link>
                </span>

            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">No Telfon</small>
                <span>
                    {myProp.item.phone}
                </span>
            </div>


            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">Opsi</small>
                <div className="flex gap-2 items-center">
                    <EditPelanggan pelanggan={myProp.item} />
                    <DropPelanggan pelanggan={myProp.item} />
                    <ResetPasswordPelanggan pelanggan={myProp.item} />
                

                </div>
            </div>

        </div>
    )
}

export default Pelanggan