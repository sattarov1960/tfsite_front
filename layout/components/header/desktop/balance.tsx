'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/header/balance.module.css"
import {BalanceI} from "@/utilities/Navigate";
import Image from "next/image";


export const Balance: FC<BalanceI> = ({balance_rub, balance_usd}) => {
    const t = useTranslations()
    return (
        <div className={styles.menu_balance}>
            <div className={styles.sub_menu_balance}>
                <div className={styles.sub_menu_balance_top}>
                    <Image
                        src="/icon_wallet.svg"
                        width={24}
                        height={24}
                        alt="Wallet"
                        className={styles.sub_menu_balance_top_icon}
                    />
                    <span className={styles.sub_menu_balance_top_textOrange}
                    >₽ {balance_rub}</span
                    >
                </div>
                <div className={styles.sub_menu_balance_bot}>
                                <span className={styles.sub_menu_balance_bot_text}
                                >{t("Top up")}</span
                                >
                    <Image
                        src="/icon_plus.svg"
                        width={12}
                        height={12}
                        alt="UP"
                        className={styles.sub_menu_balance_bot_icon}
                    />
                </div>
            </div>
            <div className={styles.sub_menu_balance}>
                <div className={styles.sub_menu_balance_top}>
                    <Image
                        src="/icon_wallet.svg"
                        width={24}
                        height={24}
                        alt="Wallet"
                        className={styles.sub_menu_balance_top_icon}
                    />
                    <span className={styles.sub_menu_balance_top_textFiolet}
                    >$ {balance_usd}</span
                    >
                </div>
                <div className={styles.sub_menu_balance_bot}>
                                <span className={styles.sub_menu_balance_bot_text}
                                >{t("Top up")}</span
                                >
                    <Image
                        src="/icon_plus.svg"
                        width={12}
                        height={12}
                        alt="UP"
                        className={styles.sub_menu_balance_bot_icon}
                    />
                </div>
            </div>
        </div>
    )
}

export default Balance