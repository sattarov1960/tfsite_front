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

    const byuOrder = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
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
        axios.post(`${process.env.api}/buy_order`, {orderId: store_buy_order.orderId, count: store_buy_order.orderCount}, {withCredentials: true}).then((response) => {
            const data: {status: boolean, operationId: string, orderId: string, error: string | undefined} = response.data
            if (data.status){
                toast.success("Заявка на покупку успешно создана", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                store_buy_order.setPending(true)
                store_buy_order.setOperationId(data.operationId)
                pending(data.operationId, data.orderId)
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
                    "You need to set trade url": "Установите трейд ссылку в личном кабинете",
                    "Count items must be greater than 0": "Количество должно быть больше 0",
                    "Incorrect order": "Некорректная заявка",
                    "You already reserved this order": "Вы уже зарезервировали эту заявку",
                    "Seller need download extension and login in steam": "Продавцу необходимо скачать расширение и войти в Steam."
                }
                toast.error(data.error ? answer[data.error as keyof typeof answer] : "Ошибка при создании заявки", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })
    }

    const pending = async (operationId: string, orderId: string) => {
        const states = {
            "checking buyer trade link": {
                "name": "Проверяем ссылку на обмен покупателя",
                "desc": "Обычно это занимает не более 1 минуты",
                "icon": "rotate",
                "timeWait": 5000
            },
            "buyer trade link not valid": {
                "name": "Ссылка на обмен покупателя не работает",
                "desc": "Обновите ссылку на обмен в личном кабинете",
                "icon": "error",
                "timeWait": 0
            },
            "checking seller inventory": {
                "name": "Смотрим инвентарь продавца",
                "desc": "Обычно это занимает не более 5 минут",
                "icon": "rotate",
                "timeWait": 5000
            },
            "Not enough items in seller inventory": {
                "name": "Недостаточно предметов в инвентаре продавца",
                "desc": "Мы написали об этом продавцу, попробуйте купить другой ордер",
                "icon": "error",
                "timeWait": 0
            },
            "checking steam api key": {
                "name": "Проверяем steam api key продавца",
                "desc": "Обычно это занимает не более 1 минуты",
                "icon": "rotate",
                "timeWait": 5000
            },
            "seller profile is private": {
                "name": "Профиль продавца скрыт",
                "desc": "Мы написали об этом продавцу, попробуйте купить другой ордер",
                "icon": "error",
                "timeWait": 0
            },
            "steam id does not match the registered one": {
                "name": "Steam id продавца не совпадает с зарегистрированным",
                "desc": "Мы написали об этом продавцу, попробуйте купить другой ордер",
                "icon": "error",
                "timeWait": 0
            },
            "checking seller cookie": {
                "name": "Проверяем расширение у продавца",
                "desc": "Обычно это занимает не более 1 минуты",
                "icon": "rotate",
                "timeWait": 5000
            },
            "seller cookies is dead": {
                "name": "Расширение продавца не работает",
                "desc": "Мы написали об этом продавцу, попробуйте купить другой ордер",
                "icon": "error",
                "timeWait": 0
            },
            "creating trade": {
                "name": "Создаем трейд",
                "desc": "Обычно это занимает не более 5 минут",
                "icon": "rotate",
                "timeWait": 5000
            },
            "trade offer was not confirmed by seller": {
                "name": "Продавец отменил трейд",
                "desc": "Продавец отменил трейд, попробуйте купить другой ордер",
                "icon": "error",
            },
            "trade offer not created": {
                "name": "Ошибка при создании трейда",
                "desc": "Попробуйте купить другой ордер",
                "icon": "error",
                "timeWait": 0
            },
            "waiting for the seller to accept the trade offer in the mobile authenticator": {
                "name": "Ждем пока продавец примет трейд в аутентификаторе",
                "desc": "Обычно это занимает не более 30 минут",
                "icon": "rotate",
                "timeWait": 10000
            },
            "seller accepted trade offer in mobile auth": {
                "name": "Принимайте трейд",
                "desc": "Принимайте трейд, он уже ждет вас в Steam",
                "icon": "",
                "timeWait": 10000
            },
            "buyer accepted trade offer": {
                "name": "Покупатель принял трейд",
                "desc": "Трейд завершен, спасибо за обмен",
                "icon": "success",
                "timeWait": 0
            },
            "trade offer has unknown status": {
                "name": "Статус трейда неизвестен",
                "desc": "",
                "icon": "error",
                "timeWait": 0
            },
            "Buyer not accepted trade offer for 24 hours": {
                "name": "Покупатель не принял трейд",
                "desc": "Вы не приняли трейд в течении 24 часов и он был отменен",
                "icon": "error",
                "timeWait": 0
            },
            "Seller not accepted trade offer in mobile auth for 24 hours": {
                "name": "Продавец не подтвердил трейд",
                "desc": "Продавец не подтвердил трейд в течении 24 часов и он был отменен",
                "icon": "error",
                "timeWait": 0
            },
        }
        let steamTradeOffer, statusOffer, status, resp;
        let isFinished = false;
        while (!isFinished){
            try{
                resp = await axios.post(`${process.env.api}/status_order`, {orderId: orderId, operationId: operationId}, {withCredentials: true});
                ({isFinished, steamTradeOffer, statusOffer, status} = resp.data)
                if (isFinished === undefined || steamTradeOffer === undefined || statusOffer === undefined || status === undefined){
                    throw new Error("Ошибка при получении статуса заявки")
                }
            }
            catch (e){
                toast.error(`Ошибка при получении статуса заявки ${e}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                continue
            }
            let state: {name: string; desc: string; icon: string; timeWait: number;};
            if (statusOffer in states) {
                state = states[statusOffer as keyof typeof states];
            }
            else {
                toast.error(`Ошибка при получении статуса заявки: status не найден в states, statusOffer = ${statusOffer}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                continue
            }
            if (state.name === "buyer accepted trade offer"){
                store_buy_order.setFinish(true)
                store_buy_order.setSteamOfferId("")
            }
            store_buy_order.setName(state.name)
            store_buy_order.setDesc(state.desc)
            store_buy_order.setIcon(state.icon)
            store_buy_order.setTimeWait(state.timeWait)
            if (steamTradeOffer) {
                store_buy_order.setSteamOfferId(steamTradeOffer)
                window.open(`https://steamcommunity.com/tradeoffer/${store_buy_order.steamOfferId}/`, '_blank')
            }

            if (state.timeWait > 0){
                await new Promise(resolve => setTimeout(resolve, state.timeWait));
            }
            else{
                isFinished = true
            }
        }
    }

    const setCount = (count: string) => {
        store_buy_order.setOrderCount(Number(count))
    }
    const getIcon = () => {
        switch (store_buy_order.icon) {
            case "rotate":
                return <Image
                    src="/loader_order.svg"
                    width={64}
                    height={64}
                    alt="Rotate"
                    className={styles.popup_icon_rotate_pending}
                />
            case "error":
                return <Image
                    src="/close_order.svg"
                    width={62}
                    height={62}
                    alt="Error"
                    className={styles.popup_icon_close_pending}
                />
            case "success":
                return <Image
                    src="/success_order.svg"
                    width={64}
                    height={64}
                    alt="Success"
                    className={styles.popup_icon_success_pending}
                />
            default:
                return <></>
        }
    }
    const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/^\d+$/.test(e.target.value) && e.target.value !== ""){
            e.stopPropagation()
            return
        }
        setCount(e.target.value)
    }
    return (
        store_buy_order.pending ? <section className={`${styles.popup_wrap_pending} ${store_buy_order.steamOfferId && styles.popup_wrap_accept_btn_pending}`}>
            {getIcon()}
            <h1 className={`${styles.popup_header_text_pending}`}>{store_buy_order.name}</h1>
            <p className={styles.popup_desc_text_pending}>{store_buy_order.desc}</p>
            {(store_buy_order.steamOfferId)  && <button className={styles.popup_button_pending}>
                <a href={`https://steamcommunity.com/tradeoffer/${store_buy_order.steamOfferId}/`} className={styles.popup_button_text_pending} target="_blank">
                    Принять обмен
                </a>
            </button>}
            <Image
                src="/popUp_cross.svg"
                width={40}
                height={40}
                alt="Cross"
                className={styles.popup_close}
                onClick={() => store_buy_order.Close()}
            />
        </section> : <form className={styles.popup_wrap} onSubmit={byuOrder}>
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
                        <input className={styles.popup_item_select} value={store_buy_order.orderCount} type="text"
                               onChange={(e) => changeCount(e)}/>
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
            </form>
    )
}