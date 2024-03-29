"use client"
import styles from "@/styles/exchange/activeLots.module.css"
import key_active_lot from "@/public/key_active_lot.png"
import Image from "next/image"
import {useStoreAllOrders, useStoreBuyOrder} from "@/store/user";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useTranslations} from "next-intl";

interface Item {
    count: number
    price: number
    orderId: string
    typeOrder: string
}


function Lot({count, price, orderId}: Item){
    const store = useStoreBuyOrder()
    const t = useTranslations()
    function buy(){
        store.setOrderCount(count)
        store.setOrderPrice(price)
        store.setOrderId(orderId)
        store.setMaxOrderCount(count)
        store.Open()
    }
    return (
        <div className={styles.active_lot_wrap}>
            <div className={styles.active_frst_part}>
                <Image src={key_active_lot} alt="key active lot" className={styles.active_lot_img} width={73} height={72}/>
                <div className={styles.active_lot_frst_wrap}>
                    <span className={styles.active_lot_text_white}>{t("Mann co box key")}</span>
                    <span className={styles.active_lot_text_gray}>TF2KEY</span>
                </div>
            </div>
            <div className={styles.active_count_price_mobile}>
                <span className={`${styles.active_lot_text_white} ${styles.active_lot_text_white_mobile}`}>{count} <span className={`${styles.active_lot_text_gray} ${styles.active_lot_text_gray_mobile}`}>{t("things")}</span></span>
                <span className={`${styles.active_lot_text_white} ${styles.active_lot_text_white_mobile}`}>{price} <span className={`${styles.active_lot_text_gray} ${styles.active_lot_text_gray_mobile}`}>{t("руб")}.</span></span>
            </div>
            <button onClick={() => buy()} className={styles.active_lot_button}>
                <span>
                    {t("Buy")}
                </span>
            </button>
        </div>
    )
}


export function ActiveLots(){
    const sellOrders = useStoreAllOrders(state => state.sellOrders)
    const t = useTranslations()
    return (
        <>
            {sellOrders.length ? <section className={styles.section_active_lot}>
                <h2 className={styles.section_active_lot_header}>{t("Active lots for sale")}</h2>
                <div className={styles.active_lots_wrap}>
                    {sellOrders.map((item, index) => <Lot typeOrder={item.typeOrder} key={index} count={item.count}
                                                     price={item.price} orderId={item.orderId}/>)}
                </div>
            </section> : null}
        </>
    )
}