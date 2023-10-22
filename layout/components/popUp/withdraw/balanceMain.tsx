"use client"

import {FC} from "react";
import styles from "@/styles/popUp/withdraw/withdraw.module.css"
import Image from "next/image";
import {useStoreErrorBalanceWithdraw} from "@/store/user";
import {useTranslations} from "next-intl";

export const BalanceMain: FC = () => {
    const t = useTranslations()
    const store = useStoreErrorBalanceWithdraw()
    return (
        <section className={styles.popUp_wrap}>
            <span className={styles.popUp_wrap_text_header}>{t("Payment system balance")}</span>
            <Image src="/close.svg" alt="close" className={styles.popUp_img_close} width={22} height={22} onClick={store.Close}/>
            <hr className={styles.popUp_hr}/>
            <Image src="/info.png" alt="info" className={styles.popUp_info_img} width={40} height={40}/>
            <div className={styles.popUp_text_wrap}>
                <span className={styles.popUp_text_white}>{t("Wallet balance", {wallet: store.wallet})}</span>
                <span className={styles.popUp_text_orange}>{store.currency} <span className={styles.popUp_text_orange_bold}>{store.balance.toFixed(2)}</span></span>
            </div>
            <span className={styles.popUp_info_text}>{t("The entered withdrawal amount must be less than")}</span>
        </section>
    )
}