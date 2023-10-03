import { FC } from "react";
import styles from "@/styles/main/statistic.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";


export const Statistics: FC = () => {
    const t = useTranslations()
    return (
        <section className={styles.statistic_part_wrap}>
            <div className={styles.statistic_part}>
                <div className={styles.statistic_part_items_wrap}>
                    <ul className={styles.statistic_part_items}>
                        <li className={`${styles.statistic_part_item} ${styles.statistic_part_frstItem}`}>
                            <div className={styles.statistic_part_itemHeader}>
                                <Image
                                    src="/icon_clock.svg"
                                    width={34}
                                    height={34}
                                    alt="Clock"
                                    className={styles.statistic_part_itemHeader_icon}
                                />
                                <p className={styles.statistic_part_itemHeader_text}>{t("5-10 minutes")}</p>
                            </div>
                            <div className={styles.statistic_part_item_main}>
                                <span className={styles.statistic_part_item_mainText}>{t("On average, a transaction takes from the moment of registration")}</span>
                            </div>
                        </li>
                        <li className={`${styles.statistic_part_item} ${styles.statistic_part_scndItem}`}>
                            <div className={styles.statistic_part_itemHeader}>
                                <Image
                                    src="/icon_stack.svg"
                                    width={34}
                                    height={34}
                                    alt="Clock"
                                    className={styles.statistic_part_itemHeader_icon}
                                />
                                <p className={styles.statistic_part_itemHeader_text}>{t("10 thousand")}</p>
                            </div>
                            <div className={styles.statistic_part_item_main}>
                                <span className={styles.statistic_part_item_mainText}>{t("Users trust us")}</span>
                            </div>
                        </li>
                        <li className={`${styles.statistic_part_item} ${styles.statistic_part_thrdItem}`}>
                            <div className={styles.statistic_part_itemHeader}>
                                <Image
                                    src="/icon_private.svg"
                                    width={34}
                                    height={34}
                                    alt="Clock"
                                    className={styles.statistic_part_itemHeader_icon}
                                />
                                <p className={styles.statistic_part_itemHeader_text}>{t("Private")}</p>
                            </div>
                            <div className={styles.statistic_part_item_main}>
                                <span className={styles.statistic_part_item_mainText}>{t("We guarantee security when making payments")}</span>
                            </div>
                        </li>
                        <li className={`${styles.statistic_part_item} ${styles.statistic_part_lastItem}`}>
                            <div className={styles.statistic_part_itemHeader}>
                                <Image
                                    src="/icon_save.svg"
                                    width={36}
                                    height={36}
                                    alt="Clock"
                                    className={styles.statistic_part_itemHeader_icon}
                                />
                                <p className={styles.statistic_part_itemHeader_text}>{t("Transparent")}</p>
                            </div>
                            <div className={styles.statistic_part_item_main}>
                                <span className={styles.statistic_part_item_mainText}>{t("We have over 100+ reviews and no hidden fees")}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Statistics;
