"use client"

import {roundTo} from "@/utilities/Round";
import styles from "@/styles/exchange/myOrders.module.css"
import buy from "@/layout/components/popUp/buy/buy";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useStoreAllOrders, useStoreAuth, useStoreMyOrders, useStoreUser} from "@/store/user";

export function MyOrders(){
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
                toast.error(data.error ? data.error : "Ошибка при получении заявок пользователя")
            }
        }).catch((error) => {
            console.log(error)
            toast.error("Ошибка при получении заявок пользователя")
        })
    }, [rerender]);
    function cancelOrder(orderID: string, action: string){
        if (!store_user.auth){
            store_auth.Open()
            return
        }
        if (orderID){
            const toastId = toast("Удаляем заявку", {
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
                        render: "Заявка успешно удалена",
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
                        render: data.error ? data.error : "Ошибка при удалении заявки",
                        type: toast.TYPE.ERROR,
                        isLoading: false
                    });
                }
            }).catch((error) => {
                console.log(error)
                toast.update(toastId, {
                    render: "Ошибка при удалении заявки",
                    type: toast.TYPE.ERROR,
                    isLoading: false
                })
            })
        }
    }
    return (
        <section className={styles.section_wrap}>
            {haveBuyOrder ? <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>Мои лоты на покупку</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={`${styles.card_item_wrap}`}>
                            <span className={styles.card_item_p}>Цена (за 1 шт):</span>
                            <div className={styles.card_item_total}>
                                <span>₽ {buyPrice}</span>
                            </div>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>Сколько вы хотите хотите купить (шт.):</span>
                            <div className={styles.card_item_total}>
                                <span>{countBuy}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => cancelOrder(buyOrderID, "buy")}>
                        <span>Отменить</span>
                    </button>
                </div>
            </div> :
                <div className={styles.section_card_wrap}>
                    <h2 className={styles.card_top_header}>Мои лоты на покупку</h2>
                    <div className={styles.section_card_wrap_no_lots}>
                        <h2 className={styles.section_card_no_lots_h2}>У вас нету активных запросов на покупку.</h2>
                        <p className={styles.section_card_no_lots_p}>Для того, чтобы выставить запрос на покупку<br/> перейдите в верх страницы</p>
                        <div className={styles.card_item_hr_no_lots}></div>
                        <button className={`${styles.card_item_button} ${styles.card_item_button_inactive}`}>
                            <span>Отменить</span>
                        </button>
                    </div>
                </div>}
            {haveSellOrder ? <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>Мои лоты на продажу</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={`${styles.card_item_wrap}`}>
                            <span className={styles.card_item_p}>Цена (за 1 шт):</span>
                            <div className={styles.card_item_total}>
                                <span>₽ {sellPrice}</span>
                            </div>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>Сколько вы хотите хотите продать (шт.):</span>
                            <div className={styles.card_item_total}>
                                <span>{countSell}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => cancelOrder(sellOrderID, "sell")}>
                        <span>Отменить</span>
                    </button>
                </div>
            </div> :
                <div className={styles.section_card_wrap}>
                    <h2 className={styles.card_top_header}>Мои лоты на продажу</h2>
                    <div className={styles.section_card_wrap_no_lots}>
                        <h2 className={styles.section_card_no_lots_h2}>У вас нету активных запросов на продажу.</h2>
                        <p className={styles.section_card_no_lots_p}>Для того, чтобы выставить запрос на продажу<br/> перейдите в верх страницы</p>
                        <div className={styles.card_item_hr_no_lots}></div>
                        <button className={`${styles.card_item_button} ${styles.card_item_button_inactive}`}>
                            <span>Отменить</span>
                        </button>
                    </div>
                </div>}
        </section>
    )
}