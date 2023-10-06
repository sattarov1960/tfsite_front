"use client";

import {FC, useRef} from "react"
import {useStoreBUY, useStoreProducts, useStoreSELL, useStoreTransactions, useStoreUser} from "@/store/user"
import {UserI} from "@/interface/user";
import {OfferI, ProductI, ProductsI} from "@/interface/auth";
import {TransactionI, TransactionItemsI} from "@/interface/transactions";

export const StoreInitializerUser: FC<UserI> = ({balance_rub,
                                             balance_usd,
                                             auth,
                                             registration,
                                             steam}) => {
    const initialized = useRef(false)
    if (!initialized.current){
        useStoreUser.setState({balance_usd: balance_usd,
                                     balance_rub: balance_rub,
                                     auth: auth,
                                     steam: steam,
                                     registration: registration})
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
