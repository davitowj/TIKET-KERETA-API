import Cookies from "js-cookie"

export const storeCookie = (key: string, value: string): void => {
    /**Menyimpan data ke cookie */
    Cookies.set(key, value)
}

export const getCookie = (key: string): string => {
    return Cookies.get(key) || ""
}

export const removeCookie = (key: string): void => {
    Cookies.remove(key)
}