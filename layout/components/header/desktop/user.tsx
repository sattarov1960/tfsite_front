"use client"

import {FC} from "react";
import styles from "@/styles/header/desktop/user.module.css"
import {useStoreUser} from "@/store/user";
import {useTranslations} from "next-intl";
import Image from 'next/image'
import { useStoreLogout } from "@/store/user";

export const User: FC = () => {
    const t = useTranslations()
    const store = useStoreLogout()
    const img = `https://avatars.steamstatic.com/${useStoreUser.getState().steam.avatarhash}_medium.jpg`
    return (
        <div className={styles.wrap_desktop}>
            <div className={styles.menu_profile}>
                <div className={styles.sub_menu_profile}>
                        <span className={styles.sub_menu_profile_mainText}>{useStoreUser.getState().steam.personaname}</span>
                    <div className={styles.menu_profile_out}>
                        <Image
                            src="/icon_goOut.svg"
                            width={20}
                            height={20}
                            alt="Log Out"
                            className={styles.sub_menu_balance_top_icon}
                            onClick={() => store.Open()}
                        />
                        <span className={styles.menu_profile_out_text} onClick={() => store.Open()}>
                            {t("Logout")}
                        </span>
                    </div>
                </div>
                <img src={img} alt={useStoreUser.getState().steam.personaname} className={styles.menu_profile_img}/>
            </div>
        </div>
    )
}

export default User