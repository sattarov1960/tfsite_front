"use client"

import {FC} from "react";
import styles from "@/styles/popUp/buyOrder/buyOrder.module.css"
import Image from "next/image";
import {useStoreBuyOrder, useStoreUser} from "@/store/user";
import {toast} from "react-toastify";
import {roundTo} from "@/utilities/Round";
import axios from "axios";

export const Main: FC = () => {
    const store_buy_order = useStoreBuyOrder()
    const store_user = useStoreUser()
    const byuOrder = () => {
        let haveError = false
        if (store_buy_order.orderCount > store_buy_order.maxOrderCount){
            toast.error(`Максимальное количество для покупки ${store_buy_order.maxOrderCount} шт.`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            haveError = true
        }
        if (store_buy_order.orderPrice * store_buy_order.orderCount > store_user.balance_rub){
            toast.error(`Недостаточно средств для покупки`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            haveError = true
        }
        if (haveError){
            return
        }
        store_user.setUserBalanceRUB(roundTo(store_user.balance_rub - store_buy_order.orderPrice * store_buy_order.orderCount, 2))
        axios.post(`${process.env.api}/buy_order`, {orderID: store_buy_order.orderId, count: store_buy_order.orderCount}, {withCredentials: true}).then((response) => {
            const data: {status: boolean, error: string | undefined} = response.data
            if (data.status){
                toast.success("Заявка на покупку успешно создана", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                store_buy_order.Close()
            }
            else{
                const answer = {
                    "Buyer not found": "Покупатель не найден, ошибка бд",
                    "Seller not found": "Продавец не найден, ошибка бд",
                    "Order not found": "Заявка не найдена, ошибка бд",
                    "You can't buy your own order": "Вы не можете купить свою же заявку",
                    "You requested more than what is in the order": "Вы запросили больше чем есть в заявке",
                    "Items count can't be 0": "Количество предметов не может быть 0",
                    "Not enough money": "Недостаточно средств для покупки",
                    "Order is not active": "Заявка не активна",
                    "You need to set trade url": "Вы должны установить трейд ссылку",
                    "Incorrect order": "Некорректная заявка",
                    "You already reserved this order": "Вы уже зарезервировали эту заявку"
                }
                toast.error(data.error ? answer[data.error as keyof typeof answer] : "Ошибка при создании заявки", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })
    }
    const setCount = (count: string) => {
        store_buy_order.setOrderCount(Number(count))
    }
    return (
        <div className={styles.popup_wrap}>
            <Image
                src="/popUp_cross.svg"
                width={40}
                height={40}
                alt="Cross"
                className={styles.popup_close}
                onClick={() => store_buy_order.Close()}
            />
            <div>
                <div className={styles.popup_item}>
                    <p className={styles.popup_item_left_text}>Сколько вы хотите купить (шт.):</p>
                    <input className={styles.popup_item_select} value={store_buy_order.orderCount} type="text" onChange={(e) => setCount(e.target.value)}/>
                </div>
                <div className={`${styles.popup_item} ${styles.popup_item_scnd}`}>
                    <p className={styles.popup_item_left_text}>Цена (за 1 шт.):</p>
                    <span>₽ {store_buy_order.orderPrice}</span>
                </div>
                <div className={`${styles.popup_item} ${styles.popup_item_scnd}`}>
                    <p className={styles.popup_item_left_text}>Общая сумма:</p>
                    <span>₽ {store_buy_order.orderPrice * store_buy_order.orderCount}</span>
                </div>
            </div>
            <div className={styles.popup_hr}></div>
            <button className={styles.popup_btn_wrap} onClick={byuOrder}>
                <span>Купить</span>
            </button>
        </div>
    )
}