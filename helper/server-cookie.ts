/**Cookie
 * cookie adalah tempat penyimpana pada browser, biasanya untuk menyimpan data sesi user */
import Cookies from "js-cookie"
import { cookies } from "next/headers"

export const getServerCookie = async (key: string): Promise<string> => {
    return (await cookies()).get(key)?.value || ""

}



