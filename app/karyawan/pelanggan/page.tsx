// function to get all data admin

import { getServerCookie } from "@/helper/server-cookie";
import { UserType } from "../types";
import { axiosInstance } from "@/helper/api";
import Pelanggan from "./Pelanggan";
import AddPelanggan from "./addPelanggan";



const getPelanggan = async (): Promise<UserType[]> => {
    try {
        //get token from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/customer`

        //hit endpoint
        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        if(response.data.success == true) {
            return response.data.data
        }

        return []
    } catch (error) {
        console.log(error);
        return [

        ]
        
    }
}

const PelangganPage = async () => {
    /** call function to load data admin from backend */

    const dataPelanggan = await getPelanggan()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold"> Data pelanggan </h1>
            <span className="text-sm">Halaman ini memuat daftar pelanggan yang tersedia</span>

            <div className="my-3">
                <AddPelanggan />
                {/* mapping data kereta */}
                
                {
                    dataPelanggan.map((pelanggan, index) => (
                        <Pelanggan
                        item={pelanggan}
                        key={`pelanggan-${index}`}/>
                     ))
                }

            </div>
        </div>
    )
}

export default PelangganPage