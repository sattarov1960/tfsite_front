"use client"

import {FC} from "react";
import styles from "@/styles/popUp/withdraw/withdraw.module.css"
import Image from "next/image";
import {useStoreSuccessWithdraw} from "@/store/user";
import {useTranslations} from "next-intl";

export const SuccessMain: FC = () => {
    const t = useTranslations()
    const store = useStoreSuccessWithdraw()
    return (
        <section className={styles.popUp_wrap}>
            <span className={styles.popUp_par}>{t("Operation completed successfully")}</span>
            <Image className={styles.popUp_img_close} src="/close.svg" alt="close" width={22} height={22} onClick={store.Close}/>
            <hr className={styles.popUp_hr}/>
            <Image className={styles.popUp_img_ok} src="/ok_smile.svg" alt="ok smile" width={60} height={60}/>
            <p className={styles.popUp_desc_grey}>{t("The funds will be sent to your")}<br/>{t("wallet within")} <span className={styles.popUp_desc_white}>{t("24 hours")}</span></p>
        </section>
    )
}