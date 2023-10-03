'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/header/desktop/balance.module.css"
import Image from "next/image";


export const BalanceMenu: FC = () => {
    const t = useTranslations()
    return (
        <div>
            <span>{t("Withdraw")}</span>
            <Image
                src="/withdraw_menu_balance.svg"
                width={12}
                height={2}
                alt="Wallet"
                className={styles.sub_menu_balance_top_icon}
            />
        </div>
    )
}

export default BalanceMenu