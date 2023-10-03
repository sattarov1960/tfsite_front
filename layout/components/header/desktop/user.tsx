'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/header/user.module.css"
import {UserI} from "@/utilities/Navigate";
import Image from "next/image";


export const User: FC<UserI> = ({personName, hashIMG}) => {
    const t = useTranslations()
    const img = `https://avatars.steamstatic.com/${hashIMG}_medium.jpg`
    return (
        <div className={styles.sub_header_mobile_rightBlock}>
            <div className={styles.menu_profile}>
                <div className={styles.sub_menu_profile}>
                        <span className={styles.sub_menu_profile_mainText}>{personName}</span>
                    <div className={styles.menu_profile_out}>
                        <Image
                            src="/icon_goOut.svg"
                            width={20}
                            height={20}
                            alt="Log Out"
                            className={styles.sub_menu_balance_top_icon}
                        />
                        <span className={styles.menu_profile_out_text}>{t("Logout")}</span>
                    </div>
                </div>
                <img src={img} alt={personName} className={styles.menu_profile_img}/>
            </div>
        </div>
    )
}

export default User