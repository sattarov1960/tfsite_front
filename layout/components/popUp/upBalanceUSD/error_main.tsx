"use client"

import { FC } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/popUp/upBalanceUSD/error_main.module.css"
import Image from "next/image";
import { useStoreUpBalanceUSD } from "@/store/user";
import Link from "next/link";

export const Error: FC = () => {
    const store = useStoreUpBalanceUSD()
    const t = useTranslations()
    return (
        <div className={styles.popUp_replenishmentOfTheBalance_inDollars}>
            <div className={styles.popUp_header}>
                <h2 className={styles.popUp_header_textDesktop}>
                    {t("Error topping up balance in USDT")}
                </h2>
                <h2 className={styles.popUp_header_textMobile}>
                    {t("Error topping up balance")}
                </h2>
                <Image
                    src="/popUp_cross.svg"
                    width={14}
                    height={14}
                    alt="cross"
                    className={styles.cross}
                    onClick={() => store.setOpenError(false)}
                />
                <hr className={styles.popUp_header_line}/>
            </div>
            <div className={styles.popUp_main}>
                <Image
                    src="/icon_smile.svg"
                    width={14}
                    height={14}
                    alt="smiley"
                    className={styles.smile}
                />
                <p className={styles.popUp_main_textWhite}>
                    {t("Another user may have decided to top up their balance for the same amount at the moment!")}
                </p>
                <span className={styles.popUp_main_textGray}>
                    {t("Since we have to limit the ability to create a balance top-up request for the same amount from different users due to banks/payment systems, a top-up error occurred")}
                </span>
                <span className={`${styles.popUp_main_textGray} ${styles.popUp_main_textGrayPrivacyPolicy}`}>
                    {t("Try")}
                    <Link href={`${process.env.current}/`}>
                        <span className={styles.popUp_main_textWhitePrivacyPolicy}>{t("refresh the page")}</span>
                    </Link>
                    {t("or")}
                    <Link href={`${process.env.current}/`}>
                        <span className={styles.popUp_main_textWhitePrivacyPolicy}>{t("return to the main page")}</span>
                    </Link>
                    {t("and top up the balance again!")}
                </span>
            </div>
        </div>
    )
}
