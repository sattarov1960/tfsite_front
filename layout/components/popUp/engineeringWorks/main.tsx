"use client"

import styles from "@/styles/popUp/engineeringWorks/engineeringWorks.module.css";
import {useTranslations} from "next-intl";
import Image from "next/image";

export const Main = () => {
    const t = useTranslations()
    return (
        <section className={styles.popup_wrap}>
            <h1 className={styles.popup_header}>{t("Engineering works")}</h1>
            <div className={styles.account_blocked_content_hr}/>
            <Image width={60} height={60} className={styles.popup_center_icon} src="/engineeringWorks.svg" alt="engineeringWorks"/>
            <h2 className={styles.popup_desc_text}>{t("The site is undergoing technical work")}</h2>
            <p className={styles.popup_desc_text_gray}>{t("We apologize")}</p>
        </section>
    )
}