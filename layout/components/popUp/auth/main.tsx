"use client"

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/auth/main.module.css"
import Image from "next/image";
import Link from 'next/link'
import {useStoreAuth} from "@/store/user";

export const Main: FC = () => {
    const t = useTranslations()
    const store = useStoreAuth()
    return (
        <div className={styles.popUp_authorizationRequest}>
            <div className={styles.popUp_header}>
                <Image
                    src="/popUp_cross.svg"
                    width={40}
                    height={40}
                    alt="Cross"
                    className={styles.cross}
                    onClick={() => store.Close()}
                />
                <h2 className={styles.popUp_header_text}>{t("Authorization required")}</h2>
                <hr className={styles.popUp_header_line}/>
            </div>
            <div className={styles.popUp_main}>
                <span className={styles.popUp_main_textGray}>{t("To continue, you need to log in through")}
                    <span className={styles.popUp_main_textWhite}>Steam</span>.
                </span>
                <Link href={`${process.env.api}/login`}>
                    <button className={styles.popUp_main_buttonDesktop}>
                        <Image
                            src="/popup_icon_steam.svg"
                            width={36}
                            height={36}
                            alt="Steam"
                            className={styles.popUp_main_buttonDesktop_icon}
                        />
                        <span className={styles.popUp_main_buttonDesktop_text}>{t("Log in through Steam")}</span>
                    </button>
                </Link>
                <Link href={`${process.env.api}/login`}>
                    <button className={styles.popUp_main_buttonMobile}>
                        <span className={styles.popUp_main_buttonMobile_text}>{t("Log in through Steam")}</span>
                        <Image
                            src="/icon_steam.svg"
                            width={36}
                            height={36}
                            alt="Flag"
                            className={styles.popUp_main_buttonMobile_icon}
                        />
                    </button>
                </Link>
            </div>
        </div>
    )
}