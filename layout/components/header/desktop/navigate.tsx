'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import styles from "@/styles/header/desktop/navigate.module.css"
import Image from 'next/image'
import Link from "next/link";
import {useStoreUser} from "@/store/user";


const Navigate: FC = () => {
    const storeUser = useStoreUser()
    const scrollToBuySell = (name: string) => {
        const buySellSection = document.getElementById(name);
        if (buySellSection) {
            buySellSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
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
                        className={`${styles.hover_navigate} ${["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? "" : styles.menu_item_icon_active}`}
                    />
                    <Link href="/"><span className={`${styles.menu_item_text} ${["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? styles.menu_item_text_active : ""}`}>{t("Home")}</span></Link>
                </div>
                {["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? <hr className={styles.menu_item_active_border}/> : null}
            </li>
            <li className={styles.menu_item}>
                <div className={styles.sub_menu_item}>
                    <Image
                        src="/exchange.svg"
                        width={20}
                        height={20}
                        alt="exchange"
                        style={{opacity: "40%"}}/>
                        {/*className={`${styles.hover_navigate} ${pathname.includes("swap") ? "" : styles.menu_item_icon_active}`}/>*/}
                    {/*<Link href="/swap"><span className={`${styles.menu_item_text} ${pathname.includes("swap") ? styles.menu_item_text_active : ""}`}>{t("swap")}</span></Link>*/}
                    <Link href="/"><span className={`${styles.menu_item_text_inactive} ${pathname.includes("swap") ? styles.menu_item_text_active : ""}`}>{t("swap")}</span></Link>
                </div>
                {pathname.includes("/swap") ? <hr className={styles.menu_item_active_border}/> : null}
            </li>
            <li className={styles.menu_item}>
                <div className={styles.sub_menu_item}>
                    <Image
                        src="/icon_dollar_gray.svg"
                        width={22}
                        height={22}
                        alt="BUY/SELL"
                        className={`${styles.hover_navigate} ${pathname.includes("#buy-sell") ? "" : styles.menu_item_icon_active}`}
                    />
                    <Link href="/#buy-sell" onClick={(e) => {
                        e.preventDefault();
                        scrollToBuySell('buy-sell');
                    }}><span className={styles.menu_item_text}>{t("Buy/Sell")}</span></Link>
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
                        className={`${styles.hover_navigate} ${pathname.includes("#faq") ? "" : styles.menu_item_icon_active}`}/>
                    <Link href="/#faq" onClick={(e) => {
                        e.preventDefault();
                        scrollToBuySell('faq');
                    }}><span className={`${styles.menu_item_text} ${pathname.includes("#faq") ? styles.menu_item_text_active : ""}`}>{t("FAQ")}</span></Link>
                </div>
                {pathname.includes("#faq") ? <hr className={styles.menu_item_active_border}/> : null}
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