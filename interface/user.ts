import {Steam} from "@/interface/steam";

export interface UserI {
    steam: Steam
    auth: boolean,
    balance_rub: number
    balance_usd: number
    registration: string,
    countTrades: number
    is_banned: boolean
    email: string
    phone: string
    telegramEnable: boolean
    telegramCodeActivate: string
    telegramName: string
    telegramAddress: string
    telegramAvatar: string
    steamTradeUrl: string
    steamApiKey: string
    userId: number
}

export interface userStore {
    menu: boolean
    setlogOut: () => void
    OpenMenu: () => void
    CloseMenu: () => void
    setTelegramEnable: (data: boolean) => void
    setUserBalanceRUB: (data: number) => void
    setUserBalanceUSD: (data: number) => void
    setSteamTradeUrl: (data: string) => void
    setSteamApiKey: (data: string) => void
    setEmail: (data: string) => void
    setPhone: (data: string) => void
    reset: () => void
}