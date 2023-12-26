"use client"

import {FC} from "react";
import styles from "@/styles/popUp/ban/main.module.css"
import {useTranslations} from "next-intl";
import Image from "next/image";

export const Main: FC = () => {
    const t = useTranslations()
    return (
        <section className={styles.account_blocked_wrap}>
            <h1 className={styles.account_blocked_h1}>{t("Your account is blocked!")}</h1>
            <div className={styles.account_blocked_content_hr}/>
            <div className={styles.account_blocked_content_wrap}>
                <Image width={60} height={60} className={styles.account_blocked_content_img} src="/block.svg" alt="Blocked"/>
                <h2 className={styles.account_blocked_content_h2}>{t("Your account is temporarily blocked")}</h2>
                <p className={styles.account_blocked_content_p}>{t("We apologize! To unblock, write to us in Telegram")}</p>
                <a className={styles.account_blocked_content_link} href="https://t.me/MannCoSupplyCrateKey">
                    <u>{t("Link to Telegram TF2 key")}</u>
                </a>
            </div>
        </section>
    )

}

export default Main;