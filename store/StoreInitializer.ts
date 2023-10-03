"use client";

import {FC, useRef} from "react"
import {useStoreProducts, useStoreTransactions, useStoreUser} from "@/store/user"
import {UserI} from "@/interface/user";
import {ProductI, ProductsI} from "@/interface/auth";
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
