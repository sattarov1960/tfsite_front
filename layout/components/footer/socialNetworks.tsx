import {FC} from "react";
import {useTranslations} from "next-intl";
import Link from 'next/link'
import styles from "@/styles/footer/socialNetworks.module.css"
import Image from "next/image";


const SocialNetworks: FC = () => {
    const t = useTranslations()
    return (
        <section className={styles.sub_footer_socialNetworks_items_wrap}>
            <ul className={styles.sub_footer_socialNetworks_items}>
                <li className={styles.sub_footer_socialNetworks_itemText}>{t("Write to us:")}</li>
                <div className={styles.sub_footer_socialNetworks_sub_items}>
                    <Link href="/">
                        <li className={`${styles.sub_footer_socialNetworks_item} ${styles.sub_footer_socialNetworks_frstItem}`}>
                            <Image
                                src="/icon_steam.svg"
                                width={28}
                                height={28}
                                alt="Steam"
                                className={styles.sub_footer_socialNetworks_item_icon}
                            />
                        </li>
                    </Link>
                    <Link href="https://vk.com/tf2key">
                        <li className={styles.sub_footer_socialNetworks_item}>
                            <Image
                                src="/icon_vk.svg"
                                width={30}
                                height={30}
                                alt="VK"
                                className={`${styles.sub_footer_socialNetworks_item_icon} ${styles.sub_footer_socialNetworks_item_iconVK}`}
                            />
                        </li>
                    </Link>
                    <Link href="https://t.me/TF2keys">
                        <li className={styles.sub_footer_socialNetworks_item}>
                            <Image
                                src="/icon_tg.svg"
                                width={24}
                                height={24}
                                alt="TG"
                                className={styles.sub_footer_socialNetworks_item_icon}/>
                        </li>
                    </Link>
                </div>
            </ul>
        </section>
    )
}

export default SocialNetworks