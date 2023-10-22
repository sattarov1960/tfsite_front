"use client"

import {FC} from "react";
import USDT from "@/layout/components/popUp/withdraw/usdt";
import RUB from "@/layout/components/popUp/withdraw/rub";
import Success from "@/layout/components/popUp/withdraw/success";
import Error from "@/layout/components/popUp/withdraw/error";
import {useStoreUser} from "@/store/user";
import {BalancePaymentSystem} from "@/layout/components/popUp/withdraw/balance";

export const Withdraw: FC = () => {
    const store_user = useStoreUser()
    if (!store_user.auth) return null
    return (
        <>
            <Error/>
            <Success/>
            <BalancePaymentSystem/>
            <USDT/>
            <RUB/>
        </>
    )
}
export default Withdraw