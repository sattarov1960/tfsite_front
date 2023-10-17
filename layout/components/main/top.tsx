'use client';

import { FC } from "react";
import styles from "@/styles/main/top.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";
import Link from "next/link";


export const Top: FC = () => {
    const scrollToBuySell = (name: string) => {
        const buySellSection = document.getElementById(name);
        if (buySellSection) {
            buySellSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const t = useTranslations()
    return (
        <section className={styles.for_background}>
            <Link href="#buy-sell"  onClick={(e) => {e.preventDefault();scrollToBuySell('buy-sell');}}>
                <Image
                    src="/arrow_mainPart.svg"
                    width={40}
                    height={40}
                    alt="Arrow"
                    className={styles.for_background_arrow}
                />
            </Link>
            <div className={styles.main_part}>
                <div className={styles.main_part_leftBlock}>
                    <h1 className={styles.main_part_leftBlock_textWhite}>{t("Automated buy and sell bots")}</h1>
                    <h2 className={styles.main_part_leftBlock_textGradient}>{t("Mann Co keys")}</h2>
                    <div className={styles.main_part_leftBlock_subText}>
                <span className={styles.main_part_leftBlock_subTextGray}>{t("we work")}
                    <span className={styles.main_part_leftBlock_subTextOrange}>₽</span>
                    {t("And")}
                    <span className={styles.main_part_leftBlock_subTextOrange}>$</span>
                    {t("all popular payment and withdrawal methods!")}
                </span>
                    </div>
                </div>
                <div className={styles.main_part_rightBlock}>
                    <ul className={styles.main_part_rightBlock_items}>
                        <li className={`${styles.main_part_sub_rightBlock_item} ${styles.main_part_sub_rightBlock_frstItem}`}>
                            <Image
                                src="/icon_coins.svg"
                                width={30}
                                height={30}
                                alt="coins"
                                className={styles.main_part_sub_rightBlock_item_icon}
                            />
                            <div className={styles.main_part_sub_rightBlock_item_subText}>
                                <p className={styles.main_part_sub_rightBlock_item_subText_prgf}>{t("ALWAYS UPDATED PRICES")}</p>
                                <span className={styles.main_part_sub_rightBlock_item_subText_text}>
                            {t("We closely monitor the key market")}
                        </span>
                            </div>
                        </li>
                        <li className={styles.main_part_sub_rightBlock_item}>
                            <Image
                                src="/icon_currencies.svg"
                                width={30}
                                height={30}
                                alt="coins"
                                className={styles.main_part_sub_rightBlock_item_icon}
                            />
                            <div className={styles.main_part_sub_rightBlock_item_subText}>
                                <p className={styles.main_part_sub_rightBlock_item_subText_prgf}>{t("AUTOMATED TOP-UP AND WITHDRAWALS")}</p>
                                <span className={styles.main_part_sub_rightBlock_item_subText_text}>{t("The following methods are available")}</span>
                            </div>
                        </li>
                        <li className={styles.main_part_sub_rightBlock_item}>
                            <Image
                                src="/icon_shield.svg"
                                width={32}
                                height={32}
                                alt="shield"
                                className={styles.main_part_sub_rightBlock_item_icon}
                            />
                            <div className={styles.main_part_sub_rightBlock_item_subText}>
                                <p className={styles.main_part_sub_rightBlock_item_subText_prgf}>{t("Over 10,000 users trust us")}</p>
                                <span className={styles.main_part_sub_rightBlock_item_subText_text}>{t("We started our journey")}</span>
                            </div>
                        </li>
                        <li className={styles.main_part_sub_rightBlock_item}>
                            <Image
                                src="/icon_peoples.svg"
                                width={28}
                                height={30}
                                alt="peoples"
                                className={styles.main_part_sub_rightBlock_item_icon}
                            />
                            <div className={styles.main_part_sub_rightBlock_item_subText}>
                                <p className={styles.main_part_sub_rightBlock_item_subText_prgf}>{t("Responsive tech support")}</p>
                                <span className={styles.main_part_sub_rightBlock_item_subText_text}>{t("We are always in touch with our clients")}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Top;
