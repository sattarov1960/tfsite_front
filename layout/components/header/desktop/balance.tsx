'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/header/desktop/balance.module.css"
import Image from "next/image";
import {useStoreUpBalanceRUB, useStoreUpBalanceUSD, useStoreUser} from "@/store/user";
import BalanceMenu from "@/layout/components/header/desktop/balanceMenu";


export const Balance: FC = () => {
    const storeUser = useStoreUser()
    const t = useTranslations()
    const storeUpBalanceRUB = useStoreUpBalanceRUB()
    const storeUpBalanceUSD = useStoreUpBalanceUSD()
    return (
        <div className={styles.menu_balance}>
            <div className={styles.sub_menu_balance}>
                <div className={styles.sub_menu_balance_top}>
                    <Image
                        src="/icon_wallet.svg"
                        width={24}
                        height={24}
                        alt="Wallet"
                        className={styles.sub_menu_balance_top_icon}
                    />
                    <span className={styles.sub_menu_balance_top_textOrange}>₽ {storeUser.balance_rub}</span>
                    <Image
                        src="/open_balance.svg"
                        width={12}
                        height={6}
                        alt="Open Balance"
                        className={styles.sub_menu_balance_top_icon_open}
                        onClick={() => storeUpBalanceRUB.setIsOpenBalance(!storeUpBalanceRUB.isOpenMenu)}
                    />
                </div>
                <div className={styles.sub_menu_balance_bot} onClick={() => storeUpBalanceRUB.Open()}>
                                <span className={styles.sub_menu_balance_bot_text}
                                >{t("Top up")}</span
                                >
                    <Image
                        src="/icon_plus.svg"
                        width={12}
                        height={12}
                        alt="UP"
                        className={styles.sub_menu_balance_bot_icon}
                    />
                </div>
                {storeUpBalanceRUB.isOpenMenu ? <BalanceMenu platform="rub"/> : null}
            </div>

            <div className={styles.sub_menu_balance}>
                <div className={styles.sub_menu_balance_top}>
                    <Image
                        src="/icon_wallet.svg"
                        width={24}
                        height={24}
                        alt="Wallet"
                        className={styles.sub_menu_balance_top_icon}
                    />
                    <span className={styles.sub_menu_balance_top_textFiolet}>$ {storeUser.balance_usd}</span>
                    <Image
                        src="/open_balance.svg"
                        width={12}
                        height={6}
                        alt="Open Balance"
                        className={styles.sub_menu_balance_top_icon_open}
                        onClick={() => storeUpBalanceUSD.setIsOpenBalance(!storeUpBalanceUSD.isOpenMenu)}
                    />
                </div>
                <div className={styles.sub_menu_balance_bot} onClick={() => storeUpBalanceUSD.Open()}>
                                <span className={styles.sub_menu_balance_bot_text}>{t("Top up")}</span>
                    <Image
                        src="/icon_plus.svg"
                        width={12}
                        height={12}
                        alt="UP"
                        className={styles.sub_menu_balance_bot_icon}
                    />
                </div>
                {storeUpBalanceUSD.isOpenMenu ? <BalanceMenu platform="usdt"/> : null}
            </div>
        </div>
    )
}

export default Balance