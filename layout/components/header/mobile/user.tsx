"use client"

import {FC} from "react";
import styles from "@/styles/header/mobile/user.module.css"
import {useStoreLogout, useStoreUser} from "@/store/user";
import Image from 'next/image'
import {useTranslations} from "next-intl";
import Link from "next/link";

export const UserM: FC = () => {
    const t = useTranslations()
    const store = useStoreLogout()
    const img = `https://avatars.steamstatic.com/${useStoreUser.getState().steam.avatarhash}_medium.jpg`
    return (
        <div className={styles.menu_profile}>
            <div className={styles.sub_menu_profile}>
                <span className={styles.sub_menu_profile_mainText}>{useStoreUser.getState().steam.personaname}</span>
                <Link href="/cabinet">
                    <div className={styles.menu_profile_out}>
                        <Image
                            src="/personalArea.svg"
                            width={24}
                            height={16}
                            alt="personal Area"
                            className={styles.menu_profile_out_icon}
                        />
                        <span className={styles.menu_profile_out_text}>
                            {t("Personal Area")}
                        </span>
                    </div>
                </Link>
            </div>
            <img src={img} className={styles.user} alt={useStoreUser.getState().steam.personaname}/>
        </div>
    )
}

export default UserM