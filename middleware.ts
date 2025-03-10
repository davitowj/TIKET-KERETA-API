import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith(`/karyawan`)) {
        //  Jika url diawali dengan karyawan

        // Ambil data dari cookie
        const token = request.cookies.get(`token`)?.value

        // Prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" //URL Halaman Login

        if (typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyKaryawan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith(`/pelanggan`)) {
        //  Jika url diawali dengan karyawan

        // Ambil data dari cookie
        const token = request.cookies.get(`token`)?.value

        // Prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" //URL Halaman Login

        if (typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyPelanggan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
        return NextResponse.next()
    }

    return NextResponse.next()
}

// menentukan route mana saja yang akan memberlakukan proses middleware
export const config = {
    matcher: [
        "/karyawan/:path*", "/pelanggan/:path*"
    ]
}
