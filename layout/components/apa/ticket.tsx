"use client"

import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/apa/ticket.module.css"
import {useTranslations} from "next-intl";
import Currency from "@/layout/components/apa/currency";
import {useStoreAuth, useStoreBUY, useStoreCurrency, useStoreProducts, useStoreSELL, useStoreUser} from "@/store/user";


// @ts-ignore
export const Ticket = ({ticketRUB, ticketUSD}) => {
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
            <h2 className={styles.ticketsKeys_block_mainText}>{t("Business trip ticket")}</h2>
            <p className={styles.ticketsKeys_block_subText}>(Tour of Duty Ticket)</p>

            <div className={styles.ticketsKeys_part_swap}>
                <div>
                    <div className={styles.ticketsKeys_part_swap_sub_block}>
                        <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>{store_currency.currency === "RUB" ? ticketRUB.buy : ticketUSD.buy} {store_currency.currency === "RUB" ? "₽" : "$"}</p>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
                    </div>
                    <button className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`} onClick={() => create_trade("BUY", store_currency.currency === "RUB" ?  "Tour of Duty Ticket RUB" : "Tour of Duty Ticket USD")}>{t("BUY")}</button>
                    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText_underButton}>
                            {t("We can sell:")}
                            <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>{store_currency.currency === "RUB" ? ticketRUB.can_sell : ticketUSD.can_sell}</span>
                        </span>
                    </div>
                </div>
                <Image
                    src="/ticket.png"
                    width={260}
                    height={260}
                    alt="Ticket"
                    className="ticket"
                />
                <div className={styles.ticketsKeys_part_swap_block}>
                    <div className={styles.ticketsKeys_part_swap_sub_block}>
                        <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>{store_currency.currency === "RUB" ? ticketRUB.sell : ticketUSD.sell} {store_currency.currency === "RUB" ? "₽" : "$"}</p>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
                    </div>
                    <button className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`} onClick={() => create_trade("SELL", store_currency.currency === "RUB" ?  "Tour of Duty Ticket RUB" : "Tour of Duty Ticket USD")}>{t("SELL")}</button>
                    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
                        <span className={styles.ticketsKeys_part_swap_sub_block_subText}>
                            {t("We can buy:")}
                            <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>{store_currency.currency === "RUB" ? ticketRUB.can_buy : ticketUSD.can_buy}</span>
                        </span>
                    </div>
                </div>
            </div>
            <hr className={styles.line_between_blocks}/>
        </div>
    )
}

export default Ticket;