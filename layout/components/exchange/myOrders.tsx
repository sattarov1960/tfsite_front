"use client"

import {roundTo} from "@/utilities/Round";
import styles from "@/styles/exchange/myOrders.module.css"
import buy from "@/layout/components/popUp/buy/buy";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useStoreAllOrders, useStoreAuth, useStoreMyOrders, useStoreUser} from "@/store/user";
import {useTranslations} from "next-intl";

export function MyOrders(){
    const t = useTranslations()
    const store_auth = useStoreAuth()
    const store_user = useStoreUser()
    const setRerender = useStoreMyOrders(state => state.setRerender)
    const rerender = useStoreMyOrders(state => state.rerender)
    const deleteOrder = useStoreAllOrders(state => state.deleteOrder)
    const [{buyPrice, countBuy, buyOrderID}, setBuyOrder] = useState({buyPrice: 0, countBuy: 0, buyOrderID: ""})
    const [{sellPrice, countSell, sellOrderID}, setSellOrder] = useState({sellPrice: 0, countSell: 0, sellOrderID: ""})
    const [haveBuyOrder, setHaveBuyOrders] = useState(false)
    const [haveSellOrder, setHaveSellOrders] = useState(false)
    useEffect(() => {
        if (!store_user.auth){
            return
        }
        axios.get(`${process.env.api}/get_my_orders_rub`, {withCredentials: true}).then((response) => {
            const data: {buyPrice: number,
                         countBuy: number,
                         buyOrderID: string,
                         sellPrice: number,
                         countSell: number,
                         sellOrderID: string,
                         haveBuyOrder: boolean,
                         haveSellOrder: boolean,
                         status: boolean,
                         error: string | undefined} = response.data
            if (data.status){
                setBuyOrder({buyPrice: data.buyPrice, countBuy: data.countBuy, buyOrderID: data.buyOrderID})
                setSellOrder({sellPrice: data.sellPrice, countSell: data.countSell, sellOrderID: data.sellOrderID})
                setHaveBuyOrders(data.haveBuyOrder)
                setHaveSellOrders(data.haveSellOrder)
            }
            else{
                toast.error(data.error ? data.error : t("Error while receiving user requests"))
            }
        }).catch((error) => {
            console.log(error)
            toast.error(t("Error while receiving user requests"))
        })
    }, [rerender]);
    function cancelOrder(orderID: string, action: string){
        if (!store_user.auth){
            store_auth.Open()
            return
        }
        if (orderID){
            const toastId = toast(t("Deleting the application"), {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                isLoading: true
            });
            axios.post(`${process.env.api}/cancel_order`, {orderID: orderID}, {withCredentials: true}).then((response) => {
                const data: {status: boolean, error: string | undefined} = response.data
                if (data.status){
                    deleteOrder(orderID)
                    setRerender(false)
                    toast.update(toastId, {
                        render: t("Application successfully deleted"),
                        type: toast.TYPE.SUCCESS,
                        isLoading: false
                    });
                    if (action === "sell"){
                        setHaveSellOrders(false)
                    }
                    else if (action === "buy"){
                        setHaveBuyOrders(false)
                    }
                }
                else{
                    toast.update(toastId, {
                        render: data.error ? data.error : t("Error when deleting an application"),
                        type: toast.TYPE.ERROR,
                        isLoading: false
                    });
                }
            }).catch((error) => {
                console.log(error)
                toast.update(toastId, {
                    render: t("Error when deleting an application"),
                    type: toast.TYPE.ERROR,
                    isLoading: false
                })
            })
        }
    }
    return (
        <section className={styles.section_wrap}>
            {haveBuyOrder ? <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>{t("My purchase requests")}</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={`${styles.card_item_wrap}`}>
                            <span className={styles.card_item_p}>{t("Price (for 1 pc):")}</span>
                            <div className={styles.card_item_total}>
                                <span>₽ {buyPrice}</span>
                            </div>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>{t("How many do you want to buy (pcs")}.):</span>
                            <div className={styles.card_item_total}>
                                <span>{countBuy}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => cancelOrder(buyOrderID, "buy")}>
                        <span>{t("Cancel")}</span>
                    </button>
                </div>
            </div> :
                <div className={styles.section_card_wrap}>
                    <h2 className={styles.card_top_header}>{t("My lots for purchase")}</h2>
                    <div className={styles.section_card_wrap_no_lots}>
                        <h2 className={styles.section_card_no_lots_h2}>{t("You have no active purchase requests")}.</h2>
                        <p className={styles.section_card_no_lots_p}>{t("To submit a purchase request")}<br/> {t("go to the top of the page")}</p>
                        <div className={styles.card_item_hr_no_lots}></div>
                        <button className={`${styles.card_item_button} ${styles.card_item_button_inactive}`}>
                            <span>{t("Cancel")}</span>
                        </button>
                    </div>
                </div>}
            {haveSellOrder ? <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>{t("My lots for sale")}</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={`${styles.card_item_wrap}`}>
                            <span className={styles.card_item_p}>{t("Price (for 1 pc):")}</span>
                            <div className={styles.card_item_total}>
                                <span>₽ {sellPrice}</span>
                            </div>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>{t("How much do you want to sell (pcs")}.):</span>
                            <div className={styles.card_item_total}>
                                <span>{countSell}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => cancelOrder(sellOrderID, "sell")}>
                        <span>{t("Cancel")}</span>
                    </button>
                </div>
            </div> :
                <div className={styles.section_card_wrap}>
                    <h2 className={styles.card_top_header}>{t("My lots for sale")}</h2>
                    <div className={styles.section_card_wrap_no_lots}>
                        <h2 className={styles.section_card_no_lots_h2}>{t("You have no active sales requests")}.</h2>
                        <p className={styles.section_card_no_lots_p}>{t("To submit a sales request")}<br/> {t("go to the top of the page")}</p>
                        <div className={styles.card_item_hr_no_lots}></div>
                        <button className={`${styles.card_item_button} ${styles.card_item_button_inactive}`}>
                            <span>{t("Cancel")}</span>
                        </button>
                    </div>
                </div>}
        </section>
    )
}