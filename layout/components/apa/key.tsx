"use client"

import {FC, useEffect, useState} from "react";
import Image from "next/image";
import styles from "@/styles/apa/key.module.css"
import {useTranslations} from "next-intl";
import currency, {Currency} from "@/layout/components/apa/currency";
import {useStoreAuth, useStoreBUY, useStoreCurrency, useStoreProducts, useStoreSELL, useStoreUser} from "@/store/user";
import axios from "axios";
import {store} from "next/dist/build/output/store";
import {ProductI} from "@/interface/auth";




// @ts-ignore
export const Key = ({keyRUB, keyUSD}) => {
    const t = useTranslations()
    const store_auth = useStoreAuth()
    const store_user = useStoreUser()
    const store_sell = useStoreSELL()
    const store_buy = useStoreBUY()
    const store_product = useStoreProducts()
    const store_currency = useStoreCurrency()
    const create_trade = (operation: string, name: string) => {
        if (!store_user.auth){
            store_auth.Open()
            return
        }
        if (operation === "SELL"){
            store_sell.Open()
        }
        else{
            store_buy.Open()
            store_buy.setActiveItem(name)
            // @ts-ignore
            const item = store_product[name]
            const amount = Math.floor(((item.symbol === "$" ? store_user.balance_usd : store_user.balance_rub) / item.buy))
            if (amount > item.can_sell) {
                store_buy.setNumber(item.can_sell)
            }
            else {
                store_buy.setNumber(amount)
            }
        }
        store_sell.setActiveItem(name)
    }
    return (
        <div className={styles.ticketsKeys_sub_part}>
            <h2 className={styles.ticketsKeys_block_mainText}>{t("Mann Co Crate Key")}</h2>
            <p className={styles.ticketsKeys_block_subText}>(Mann Co Supply Crate Key)</p>
            <div className={styles.ticketsKeys_block_currency}>
                <span className={styles.ticketsKeys_block_currency_text}>{t("Choose currency:")}</span>
                <Currency/>
            </div>
            <div className={styles.ticketsKeys_part_swap}>
                <div>
                    <div className={styles.ticketsKeys_part_swap_sub_block}>
                        <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>{store_currency.currency === "RUB" ? keyRUB.buy : keyUSD.buy} {store_currency.currency === "RUB" ? "₽" : "$"}</p>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
                    </div>
                    <button className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`} onClick={() => create_trade("BUY", store_currency.currency === "RUB" ?  "Mann Co. Supply Crate Key RUB" : "Mann Co. Supply Crate Key USD")}>{t("BUY")}</button>
                    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>
                            {t("We can sell:")}
                            <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>{store_currency.currency === "RUB" ? keyRUB.can_sell : keyUSD.can_sell}</span>
                        </span>
                    </div>
                </div>
                <Image
                    src="/key.png"
                    width={260}
                    height={260}
                    alt="Keys"
                    className="key"
                />
                <div className={styles.ticketsKeys_part_swap_block}>
                    <div className={styles.ticketsKeys_part_swap_sub_block}>
                        <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>{store_currency.currency === "RUB" ? keyRUB.sell : keyUSD.sell} {store_currency.currency === "RUB" ? "₽" : "$"}</p>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
                    </div>
                    <button className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`} onClick={() => create_trade("SELL", store_currency.currency === "RUB" ?  "Mann Co. Supply Crate Key RUB" : "Mann Co. Supply Crate Key USD")}>{t("SELL")}</button>
                    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText_underButton}>
                            {t("We can buy:")}
                            <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>{store_currency.currency === "RUB" ? keyRUB.can_buy : keyUSD.can_buy}</span>
                        </span>
                    </div>
                </div>
            </div>
            <hr
                id="buy-sell" className={styles.line_between_blocks}/>
        </div>
    )
}

export default Key;