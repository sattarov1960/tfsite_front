'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from 'next/link'
import styles from "@/styles/header/desktop/navigate.module.css"
import Image from 'next/image'


const Navigate: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()
    return (
        <ul className={styles.menu_items}>
        <li className={styles.menu_itemFrst}>
        <div className={styles.sub_menu_item}>
        <Image
            src="/icon_main_white.svg"
    width={21}
    height={21}
    alt="Home"
    className={styles.menu_item_icon}
    />
    <Link href="/"><span className={`${styles.menu_item_text} ${["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? styles.menu_item_text_active : ""}`}>{t("Home")}</span></Link>
    </div>
    {["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? <hr className={styles.menu_item_active_border}/> : null}
        </li>
        <li className={styles.menu_item}>
    <div className={styles.sub_menu_item}>
    <Image
        src="/icon_dollar_gray.svg"
        width={22}
        height={22}
        alt="BUY/SELL"
        className={styles.menu_item_icon}
        />
        <Link href="/#buy-sell"><span className={styles.menu_item_text}>{t("Buy/Sell")}</span></Link>
    </div>
        {pathname.includes("#buy-sell") ? <hr className={styles.menu_item_active_border}/> : null}
            </li>
            <li className={styles.menu_item}>
        <div className={styles.sub_menu_item}>
        <Image
            src="/icon_question_gray.svg"
            width={20}
            height={20}
            alt="FAQ"
            className={styles.menu_item_icon}/>
        <Link href="/#faq"><span className={`${styles.menu_item_text} ${pathname.includes("#faq") ? styles.menu_item_text_active : ""}`}>{t("FAQ")}</span></Link>
        </div>
            {pathname.includes("#faq") ? <hr className={styles.menu_item_active_border}/> : null}
                </li>
                <li className={styles.menu_item}>
            <div className={styles.sub_menu_item}>
            <Image
                src="/icon_transactions_gray.svg"
                width={20}
                height={20}
                alt="Transactions"
                className={styles.menu_item_icon}/>
            <Link href="/transactions"><span className={`${styles.menu_item_text} ${pathname.includes("transactions") ? styles.menu_item_text_active : ""}`}>{t("Transactions")}</span></Link>
            </div>
                {pathname.includes("/transactions") ? <hr className={styles.menu_item_active_border}/> : null}
                    </li>
                    </ul>
                )
                }

                export default Navigate


// <>
//     <Link href="/"><h3 className={styles.test}>{t("Home")} - {["/ru", "/en", "/blr", "/ua", "/"].includes(pathname)  ? "Active" : "Deactivate"}</h3></Link>
//     <Link href="/#buy-sell"><h3>{t("Buy/Sell")}</h3></Link>
//     <Link href="/#faq"><h3>{t("FAQ")}</h3></Link>
//     <Link href="/transactions"><h3>{t("Transactions")} - {pathname.includes("transactions") ? "Active" : "Deactivate"}</h3></Link>
//     <h1>{pathname}</h1>
// </>