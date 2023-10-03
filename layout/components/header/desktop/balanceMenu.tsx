'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/header/desktop/balance.module.css"
import Image from "next/image";
import {useStoreUpBalanceRUB, useStoreUpBalanceUSD, useStoreWithdrawRUB, useStoreWithdrawUSDT} from "@/store/user";


export const BalanceMenu: FC<{platform: string}> = ({platform}) => {
    const t = useTranslations()
    const store_withdraw_usdt = useStoreWithdrawUSDT()
    const store_withdraw_rub = useStoreWithdrawRUB()
    const storeUpBalanceRUB = useStoreUpBalanceRUB()
    const storeUpBalanceUSD = useStoreUpBalanceUSD()
    const openWithdraw = () => {
        if (platform === "usdt"){
            store_withdraw_usdt.Open()
            storeUpBalanceUSD.setIsOpenBalance(false)
        }
        else if (platform === "rub") {
            store_withdraw_rub.Open()
            storeUpBalanceRUB.setIsOpenBalance(false)
        }
    }
    return (
        <div className={styles.sub_menu_balance_top_menu}>
            <div className={styles.sub_menu_balance_top_menu_item} onClick={openWithdraw}>
                <span className={styles.sub_menu_balance_top_menu_withdraw}>{t("Withdraw")}</span>
                <Image
                    src="/withdraw_menu_balance.svg"
                    width={12}
                    height={2}
                    alt="Wallet"
                    className={styles.sub_menu_balance_top_icon_withdraw}
                />
            </div>
        </div>
    )
}

export default BalanceMenu