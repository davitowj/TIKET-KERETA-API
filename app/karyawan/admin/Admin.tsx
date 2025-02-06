"use client"
import Link from "next/link"
import { UserType } from "../types"
import EditAdmin from "./editAdmin"
import DropAdmin from "./dropAdmin"
import ResetPasswordAdmin from "./resesPassword"


type props = {
    item: UserType
}

const Admin = (myProp: props) => {
    return (

        <div className="w-full flex  flex-wrap my-2 border rounded-md">

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">Username</small>
                <span>
                    <Link href={`/karyawan/admin${myProp.item.id}`}>
                        {myProp.item.user_details.username}
                    </Link>
                </span>

            </div>

            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">Nama Admin</small>
                <span>
                    <Link href={`/karyawan/admin${myProp.item.id}`}>
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
                    <EditAdmin admin={myProp.item} />
                    <DropAdmin admin={myProp.item} />
                    <ResetPasswordAdmin admin={myProp.item} />

                </div>
            </div>

        </div>
    )
}

export default Admin