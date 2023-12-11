"use client"

import { FC } from "react";
import Link from 'next/link'
import styles from "@/styles/header/desktop/login.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";
import { useSearchParams } from 'next/navigation'


export const Login: FC = () => {
    const searchParams = useSearchParams()
    const rValue = searchParams.get('r')
    console.log(rValue)
    const t = useTranslations()
    return (
        <button>
            <Link href={`${process.env.api}/login${rValue ? "?r=" + rValue : ""}`}>
                <div className={styles.login_btn}>
                    <Image
                        src="/login_steam.svg"
                        width={36}
                        height={36}
                        alt="Login"
                    />
                    <span className={styles.login_btn_text}>{t("Log in through Steam")}</span>
                </div>
            </Link>
        </button>
    )
}

export default Login;
