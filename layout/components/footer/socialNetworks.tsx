'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from 'next/link'
import styles from "@/styles/footer/navigate.module.css"
import Image from "next/image";


const PrivacyMobile: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()
    return (
        <ul className={styles.sub_footer_socialNetworks_items}>
            <li className={styles.sub_footer_socialNetworks_itemText}>Написать нам:</li>
            <div className={styles.sub_footer_socialNetworks_sub_items}>
                <li className={`${styles.sub_footer_socialNetworks_item} ${styles.sub_footer_socialNetworks_frstItem}`}>
                    <Image
                        src="/icon_steam.svg"
                        width={28}
                        height={28}
                        alt="Steam"
                        className={styles.sub_footer_socialNetworks_item_icon}
                    />
                </li>
                <li className={styles.sub_footer_socialNetworks_item}>
                    <Image
                        src="/icon_vk.svg"
                        width={30}
                        height={30}
                        alt="VK"
                        className={`${styles.sub_footer_socialNetworks_item_icon} ${styles.sub_footer_socialNetworks_item_iconVK}`}
                    />
                </li>
                <li className={styles.sub_footer_socialNetworks_item}>
                    <Image
                        src="/icon_tg.svg"
                        width={24}
                        height={24}
                        alt="TG"
                        className={styles.sub_footer_socialNetworks_item_icon}/>
                </li>
            </div>
        </ul>
    )
}

export default PrivacyMobile