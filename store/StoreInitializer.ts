"use client";

import {FC, useRef} from "react"
import {
    useStoreAllOrders,
    useStoreBUY,
    useStoreProducts,
    useStoreSELL,
    useStoreTransactions,
    useStoreUser
} from "@/store/user"
import {UserI} from "@/interface/user";
import {Item, OfferI, ProductI, ProductsI} from "@/interface/auth";
import {TransactionI, TransactionItemsI} from "@/interface/transactions";

export const StoreInitializerUser: FC<UserI> = ({balance_rub,
                                             balance_usd,
                                             auth,
                                             registration,
                                             steam,
                                             is_banned,
                                             countTrades,
                                             email,
                                             phone,
                                             telegramCodeActivate,
                                             telegramAddress,
                                             telegramEnable,
                                             telegramName,
                                             steamApiKey,
                                             steamTradeUrl,
                                             telegramAvatar}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreUser.setState({balance_usd: balance_usd,
                                     balance_rub: balance_rub,
                                     auth: auth,
                                     steam: steam,
                                     registration: registration,
                                     is_banned: is_banned,
                                     countTrades: countTrades,
                                     telegramName: telegramName,
                                     telegramEnable: telegramEnable,
                                     telegramAddress: telegramAddress,
                                     phone: phone,
                                     email: email,
                                     telegramCodeActivate: telegramCodeActivate,
                                     steamApiKey: steamApiKey,
                                     steamTradeUrl: steamTradeUrl,
                                     telegramAvatar: telegramAvatar})
        initialized.current = true
    }
    return null
}

// @ts-ignore
export const StoreInitializerProducts: FC<{keyRUB: ProductI,
                                           keyUSD: ProductI,
                                           ticketUSD: ProductI,
                                           ticketRUB: ProductI}> = ({keyRUB, keyUSD, ticketUSD, ticketRUB}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreProducts.setState({
            "Mann Co. Supply Crate Key RUB": keyRUB,
            "Mann Co. Supply Crate Key USD": keyUSD,
            "Tour of Duty Ticket RUB": ticketRUB,
            "Tour of Duty Ticket USD": ticketUSD
        })
        initialized.current = true
    }
    return null
}
export const StoreInitializerTransactions: FC<{
    viewTransactions: TransactionI[],
    transactions: TransactionI[],
    amount: number
}> = ({viewTransactions, transactions, amount}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreTransactions.setState({
            viewTransactions: viewTransactions,
            transactions: transactions,
            amount: amount
        })
        initialized.current = true
    }
    return null
}
export const StoreInitializerSELL: FC<{
    offers: OfferI[],
    amount: number
}> = ({offers, amount}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreSELL.setState({
            offers: offers,
            amount: amount
        })
        initialized.current = true
    }
    return null
}

export const StoreInitializerBUY: FC<{
    offers: OfferI[],
    amount: number
}> = ({offers, amount}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreBUY.setState({
            offers: offers,
            amount: amount
        })
        initialized.current = true
    }
    return null
}



export const StoreInitializerAllOrders: FC<{
    buyOrders: Item[],
    sellOrders: Item[],
}> = ({buyOrders, sellOrders}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreAllOrders.setState({
            buyOrders: buyOrders,
            sellOrders: sellOrders,
        })
        initialized.current = true
    }
    return null
}