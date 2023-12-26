"use client"
import { FC } from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/sidebar/sidebra.module.css"
import Image from 'next/image'
import lk from "@/public/lk.svg"
import transactions from "@/public/transactions.svg"
import Link from "next/link";
import {usePathname} from "next/navigation";


export const SidebarCabinet: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()
    return (
        <aside>
            <h1 className={styles.sidebar_text_top}>Личный кабинет</h1>
            <div className={styles.sidebar_items_wrap}>
                <Link href="/cabinet">
                    <div className={pathname.includes("/cabinet") ? styles.sidebar_item_wrap : styles.sidebar_item_wrap_inactive}>
                        <Image
                            src={lk}
                            alt="Cabinet"
                            width={28}
                            height={28}
                            className={styles.sidebar_item_img}
                        />
                        <h2 className={styles.sidebar_item_h2}>Личная информация</h2>
                    </div>
                </Link>
                <Link href="/transactions">
                    <div className={pathname.includes("/transactions") ? styles.sidebar_item_wrap : styles.sidebar_item_wrap_inactive}>
                        <Image
                            src={transactions}
                            alt="Transactions"
                            width={28}
                            height={28}
                            className={styles.sidebar_item_img}
                        />
                        <h2 className={styles.sidebar_item_h2}>Транзакции</h2>
                    </div>
                </Link>
            </div>
        </aside>
    )
}

