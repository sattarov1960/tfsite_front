"use client"
import key_active_exchange from "@/public/key_exchange_lot.webp"
import open_items from "@/public/open_items.svg"
import Image from 'next/image'
import styles from "@/styles/exchange/exchangeTop.module.css"
import {useEffect, useState} from "react";
import {roundTo} from "@/utilities/Round";
import axios from "axios";
import {toast} from "react-toastify";
import {useStoreAllOrders} from "@/store/user";
import {useTranslations} from "next-intl";


interface Item {
    count: number
    price: number
    typeOrder: string
    symbol: string
}

function Order({price, symbol, count, typeOrder}: Item){
    const getSymbol = (symbol: string) => {
        let symbolName = ""
        switch (symbol){
            case "USD":
                symbolName = "$"
                break
            case "RUB":
                symbolName = "₽"
                break
            default:
                symbolName = symbol
                break
        }
        return symbolName
    }
    return (
        <>
            <div className={`${styles.order_item_wrap} ${typeOrder === "buy" ? styles.order_left : null}`}>{typeOrder === "buy" ? count : null}</div>
            <div className={`${styles.order_item_wrap} ${styles.order_center}`}>{price} {getSymbol(symbol)}</div>
            <div className={`${styles.order_item_wrap} ${typeOrder === "sell" ? styles.order_right : null}`}>{typeOrder === "sell" ? count : null}</div>
        </>
    )
}


export function ExchangeTop() {
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        // window.scrollBy({
        //     top: 200,
        //     left: 0,
        //     behavior: 'smooth'
        // });
    })
    const t = useTranslations()
    const buyOrders = useStoreAllOrders(state => state.buyOrders)
    const sellOrders = useStoreAllOrders(state => state.sellOrders)
    return (
        <>
            <section className={styles.exchange_top_wrap}>
                <div className={styles.exchange_left_wrap}>
                    <Image
                        src={key_active_exchange}
                        alt="Key"
                        className={styles.exchange_left_wrap_img}
                    />
                </div>
                <div className={styles.exchange_right_wrap}>
                    <div className={styles.exchange_right_top_wrap}>
                        <div className={styles.exchange_right_top_wrap}>
                            <h1 className={styles.exchange_right_top_wrap_h1}>{t("Mann Co Crate Key")}</h1>
                            <span className={styles.exchange_right_top_wrap_span_frst}><span className={styles.exchange_right_top_wrap_span_scnd}></span></span>
                        </div>
                    </div>
                    <p className={styles.exchange_right_p}>(Mann Co Supply Crate Key)</p>
                    <div className={styles.exchange_right_bottom_wrap}>
                        <div className={styles.statistics_header_orders}>
                            <p className={styles.exchange_statistics_p}>{t("Buy and sell requests")}</p>
                            <div className={styles.statistics_header_open_wrap} onClick={() => setOpen(!isOpen)}>
                                <span className={styles.statistics_header_open_span}>{isOpen ? t("Hide"): t("Expand")}</span>
                                <Image src={open_items} alt="open" height={24} width={24} style={{rotate: isOpen ? "180deg" : ""}}/>
                            </div>
                        </div>
                        <div className={styles.exchange_statistics_header_wrap}>
                            <span className={styles.exchange_statistics_header_span_frst}>{t("To purchase")}</span>
                            <span className={styles.exchange_statistics_header_span_scnd}>{t("Price")}</span>
                            <span className={styles.exchange_statistics_header_span_thrd}>{t("For sale")}</span>
                        </div>
                        <div className={styles.orders_table_wrap}>
                            {sellOrders.length || buyOrders.length ? <>
                                <div className={styles.exchange_statistics_hr}></div>
                                {sellOrders.slice(0, isOpen ? undefined : 3).map(({price, symbol, count, typeOrder}, index) =>
                                    <Order key={index} price={price} typeOrder={typeOrder} count={count} symbol={symbol}/>)}
                                <div className={styles.exchange_statistics_hr}></div>
                                {buyOrders.slice(0, isOpen ? undefined : 3).map(({price, symbol, count, typeOrder}, index) =>
                                    <Order key={index} price={price} typeOrder={typeOrder} count={count} symbol={symbol}/>)}
                                <div className={styles.exchange_statistics_hr}></div>
                            </>: <></>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}