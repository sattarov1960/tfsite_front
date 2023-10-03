"use client"

import {FC} from "react";
import styles from "@/styles/header/mobile/user.module.css"
import {useStoreLogout, useStoreUser} from "@/store/user";
import Image from 'next/image'
import {useTranslations} from "next-intl";

export const UserM: FC = () => {
    const t = useTranslations()
    const store = useStoreLogout()
    const img = `https://avatars.steamstatic.com/${useStoreUser.getState().steam.avatarhash}_medium.jpg`
    return (
        <div className={styles.menu_profile}>
            <div className={styles.sub_menu_profile}>
                <span className={styles.sub_menu_profile_mainText}>{useStoreUser.getState().steam.personaname}</span>
                <div className={styles.menu_profile_out}>
                    <Image
                        src="/icon_goOut.svg"
                        width={24}
                        height={16}
                        alt="Log out"
                        className={styles.menu_profile_out_icon}
                        onClick={() => store.Open()}
                    />
                    <span className={styles.menu_profile_out_text} onClick={() => store.Open()}>
                        {t("Logout")}
                    </span>
                </div>
            </div>
            <img src={img} className={styles.user} alt={useStoreUser.getState().steam.personaname}/>
        </div>
    )
}

export default UserM