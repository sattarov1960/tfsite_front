"use client"

import {FC} from "react";
import styles from "@/styles/popUp/withdraw/withdraw.module.css"
import Image from "next/image";
import {useStoreErrorWithdraw} from "@/store/user";
import {useTranslations} from "next-intl";

export const ErrorMain: FC = () => {
    const t = useTranslations()
    const store = useStoreErrorWithdraw()
    return (
        <section className={styles.popUp_wrap_err}>
            <span className={styles.popUp_par}>{t("Operation error")}</span>
            <Image src="/close.svg" alt="close" className={styles.popUp_img_close} width={22} height={22} onClick={store.Close}/>
            <hr className={styles.popUp_hr}/>
            <Image src="/sad_smile.svg" alt="ok smile" className={styles.popUp_img_ok} width={60} height={60}/>
            <span className={styles.popUp_desc_grey}><span className={styles.popUp_desc_white}>{t("Withdrawing funds from your")}<br/>{t("account was not created")}</span></span>
            <span className={styles.popUp_desc_grey_sad}>{t("Please try again after a while")}</span>
        </section>
    )
}