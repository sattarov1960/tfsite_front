import {Steam} from "@/interface/steam";

export interface UserI {
    steam: Steam
    auth: boolean,
    balance_rub: number
    balance_usd: number
    registration: string

}

export interface userStore {
    menu: boolean
    setlogOut: () => void
    OpenMenu: () => void
    CloseMenu: () => void
    setUserBalanceRUB: (data: number) => void
    setUserBalanceUSD: (data: number) => void
    reset: () => void
}