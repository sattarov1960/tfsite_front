"use client"

import {FC} from "react";
import Image from "next/image";
import styles from "@/styles/faq/faq.module.css"
import {useTranslations} from "next-intl";
import {useStoreAccordion} from "@/store/user";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export const FAQ: FC = () => {
    const t = useTranslations()
    const store = useStoreAccordion()
    const pathname = usePathname()
    return (
        <section>
            <div className={styles.ticketsKeys_FAQ_part} id="faq">
                <h2 className={styles.ticketsKeys_FAQ_part_mainText}>
                    {t("Frequently Asked Questions (FAQ)")}
                </h2>
                <div className={styles.ticketsKeys_FAQ_part_accordionReviews}>
                    <div className={styles.ticketsKeys_FAQ_part_accordionItems}>
                        {pathname.includes("swap") &&
                            <>
                                <div>
                                    <div className={styles.ticketsKeys_FAQ_part_accordion_subItem}
                                         onClick={() => store.setActive(store.active === 5 ? null : 5)}>
                                        <Image
                                            src="/accrodion_cross.svg"
                                            width={40}
                                            height={40}
                                            alt="Cross"
                                            className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 5 ?
                                                styles.ticketsKeys_FAQ_part_accordionItem_icon_open :
                                                styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                        />
                                        <span
                                            className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("How to buy")}</span>
                                    </div>
                                    {store.active === 5 ?
                                        <>
                                            <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Answer How Buy")}
                        </span>
                                            </div>
                                            <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Answer How Buy")}
                        </span>
                                            </div>
                                        </>
                                        : null}
                                    <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                                </div>
                                <div className={styles.ticketsKeys_FAQ_part_accordionItem}>
                                    <div className={styles.ticketsKeys_FAQ_part_accordion_subItem}
                                         onClick={() => store.setActive(store.active === 6 ? null : 6)}>
                                        <Image
                                            src="/accrodion_cross.svg"
                                            width={40}
                                            height={40}
                                            alt="Cross"
                                            className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 6 ?
                                                styles.ticketsKeys_FAQ_part_accordionItem_icon_open :
                                                styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                        />
                                        <span
                                            className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("How to sell")}</span>
                                    </div>
                                    {store.active === 6 ?
                                        <>
                                            <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Answer How Seller")}
                        </span>
                                            </div>
                                            <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Answer How Seller")}
                        </span>
                                            </div>
                                        </>
                                        : null}
                                    <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                                </div>
                            </>
                        }
                        <div className={`${pathname.includes("swap") && styles.ticketsKeys_FAQ_part_accordionItem}`}>
                            <div className={styles.ticketsKeys_FAQ_part_accordion_subItem}
                                 onClick={() => store.setActive(store.active === 1 ? null : 1)}>
                                <Image
                                    src="/accrodion_cross.svg"
                                    width={40}
                                    height={40}
                                    alt="Cross"
                                    className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 1 ?
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_open :
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                />
                                <span
                                    className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("How to top up your Steam balance using TF2 keys")}</span>
                            </div>
                            {store.active === 1 ?
                                <>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Buy TF2 keys on our website")}
                        </span>
                                    </div>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Buy TF2 keys on our website")}
                        </span>
                                    </div>
                                </>
                                : null}
                            <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                        </div>
                        <div className={styles.ticketsKeys_FAQ_part_accordionItem}>
                            <div className={styles.ticketsKeys_FAQ_part_accordion_subItem}
                                 onClick={() => store.setActive(store.active === 2 ? null : 2)}>
                                <Image
                                    src="/accrodion_cross.svg"
                                    width={40}
                                    height={40}
                                    alt="Cross"
                                    className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 2 ?
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_open :
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                />
                                <span
                                    className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("When will the keys appear on the site")}</span>
                            </div>
                            {store.active === 2 ?
                                <>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Keys appear on the site")}
                        </span>
                                    </div>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Keys appear on the site")}
                        </span>
                                    </div>
                                </>
                                : null}
                            <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                        </div>
                        <div className={styles.ticketsKeys_FAQ_part_accordionItem}>
                            <div className={styles.ticketsKeys_FAQ_part_accordion_subItem} onClick={() => store.setActive(store.active === 3 ? null : 3)}>
                                <Image
                                    src="/accrodion_cross.svg"
                                    width={40}
                                    height={40}
                                    alt="Cross"
                                    className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 3 ? 
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_open : 
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                />
                                <span className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("What is the commission and withdrawal time")}</span>
                            </div>
                            {store.active === 3 ?
                                <>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("It all depends on the method you choose")}
                        </span>
                                    </div>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("It all depends on the method you choose")}
                        </span>
                                    </div>
                                </>
                                 : null}
                            <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                        </div>
                        <div className={styles.ticketsKeys_FAQ_part_accordionItem}>
                            <div className={styles.ticketsKeys_FAQ_part_accordion_subItem} onClick={() => store.setActive(store.active === 4 ? null : 4)}>
                                <Image
                                    src="/accrodion_cross.svg"
                                    width={40}
                                    height={40}
                                    alt="Cross"
                                    className={`${styles.ticketsKeys_FAQ_part_accordionItem_icon} ${store.active === 4 ? 
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_open : 
                                        styles.ticketsKeys_FAQ_part_accordionItem_icon_close}`}

                                />
                                <span className={styles.ticketsKeys_FAQ_part_accordionItem_text}>{t("The site does not send exchanges, you cannot accept it")}</span>
                            </div>
                            {store.active === 4 ?
                                <>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Check if your profile is hidden")}
                        </span>
                                    </div>
                                    <div className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_mobile}>
                                        <span className={styles.ticketsKeys_FAQ_part_accordionItem_getOut_text}>
                            {t("Check if your profile is hidden")}
                        </span>
                                    </div>
                                </>
                                 : null}
                            <hr className={styles.ticketsKeys_FAQ_part_accordionItem_underline}/>
                        </div>
                    </div>
                    <div className={styles.ticketsKeys_FAQ_part_reviews}>
                        <Link href="https://t.me/ManCoKeybot">
                            <Image
                                src="/tg_bot.png"
                                width={310}
                                height={117}
                                alt="tg_bot"
                                className={styles.ticketsKeys_FAQ_part_reviews_image}
                            />
                        </Link>
                        <div className={styles.ticketsKeys_FAQ_part_sub_reviews}>
                            <ul>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <p className={`${styles.ticketsKeys_FAQ_part_sub_reviews_item_textOrange} ${styles.ticketsKeys_FAQ_part_sub_reviews_item_frstTextOrange}`}>2+</p>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <p className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textOrange}>240К+</p>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <p className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textOrange}>15к+</p>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <p className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textOrange}>77</p>
                                </li>
                            </ul>
                            <ul>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <span
                                        className={`${styles.ticketsKeys_FAQ_part_sub_reviews_item_textWhite} ${styles.ticketsKeys_FAQ_part_sub_reviews_item_frstTextWhite}`}>{t("Years in business")}</span>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <span
                                        className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textWhite}>{t("Keys sold")}</span>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <span className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textWhite}>{t("Happy customers")}</span>
                                </li>
                                <li className={styles.ticketsKeys_FAQ_part_sub_reviews_item}>
                                    <span className={styles.ticketsKeys_FAQ_part_sub_reviews_item_textWhite}>{t("Grateful reviews")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ;