"use client"

import {FC} from "react";
import styles from "@/styles/header/desktop/user.module.css"
import {useStoreUser} from "@/store/user";
import {useTranslations} from "next-intl";
import Image from 'next/image'
import { useStoreLogout } from "@/store/user";
import Link from "next/link";

export const User: FC = () => {
    const t = useTranslations()
    const store = useStoreLogout()
    const img = `https://avatars.steamstatic.com/${useStoreUser.getState().steam.avatarhash}_medium.jpg`
    return (
        <div className={styles.wrap_desktop}>
            <div className={styles.menu_profile}>
                <div className={styles.sub_menu_profile}>
                    <span className={styles.sub_menu_profile_mainText}>{useStoreUser.getState().steam.personaname}</span>
                    <Link href="/cabinet">
                    {/*<Link href={`${process.env.api}/logout`}>*/}
                        <div className={styles.menu_profile_out}>
                                <Image
                                    src="/personalArea.svg"
                                    width={20}
                                    height={20}
                                    alt="personal Area"
                                    className={styles.sub_menu_balance_top_icon}
                                />
                                <u className={styles.menu_profile_out_text}>
                                    {t("Personal Area")}
                                    {/*{t("Logout")}*/}
                                </u>
                        </div>
                    </Link>
                </div>
                <img src={img} alt={useStoreUser.getState().steam.personaname} className={styles.menu_profile_img}/>
            </div>
        </div>
    )
}

export default User