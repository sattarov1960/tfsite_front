'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from 'next/link'
import styles from "@/styles/footer/navigate.module.css"


const Navigate: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()
    return (
        <>
            <ul className={styles.sub_footer_items}>
                <Link href="/">
                    <li className={`${styles.sub_footer_item} ${styles.sub_footer_frstItem} ${["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? styles.sub_footer_item_active : null}`}>{t("Home")}</li>
                </Link>
                <Link href="/#buy-sell">
                    <li className={`${styles.sub_footer_item}  ${pathname.includes("#buy-sell") ? styles.sub_footer_item_active : null}`}>{t("Buy/Sell")}</li>
                </Link>
                <Link href="/#faq">
                    <li className={`${styles.sub_footer_item}  ${pathname.includes("#faq") ? styles.sub_footer_item_active : null}`}>{t("FAQ")}</li>
                </Link>
                <Link href="/transactions">
                    <li className={`${styles.sub_footer_item}  ${pathname.includes("/transactions") ? styles.sub_footer_item_active : null}`}>{t("Transactions")}</li>
                </Link>
                <Link href="/privacy">
                    <li className={`${styles.sub_footer_item}  ${pathname.includes("/privacy") ? styles.sub_footer_item_active : null}`}>{t("Privacy Policy")}</li>
                </Link>
            </ul>
            <ul className={styles.sub_footer_items_mobile}>
                <Link href="/">
                    <li className={`${styles.sub_footer_item} ${["/ru", "/en", "/blr", "/ua", "/"].includes(pathname) ? styles.sub_footer_item_active : null}`}>{t("Home")}</li>
                </Link>
                <Link href="/#buy-sell">
                    <li className={`${styles.sub_footer_item} ${pathname.includes("#buy-sell") ? styles.sub_footer_item_active : null}`}>{t("Buy/Sell")}</li>
                </Link>
                <Link href="/#faq">
                    <li className={`${styles.sub_footer_item} ${pathname.includes("#faq") ? styles.sub_footer_item_active : null}`}>{t("FAQ")}</li>
                </Link>
                <Link href="/transactions">
                    <li className={`${styles.sub_footer_item} ${pathname.includes("/transactions") ? styles.sub_footer_item_active : null}`}>{t("Transactions")}</li>
                </Link>
                <Link href="/privacy">
                    <li className={`${styles.sub_footer_item} ${pathname.includes("/privacy") ? styles.sub_footer_item_active : null}`}>{t("Privacy Policy")}</li>
                </Link>
            </ul>
        </>
    )
}

export default Navigate