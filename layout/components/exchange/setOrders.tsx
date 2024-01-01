"use client"
import styles from "@/styles/exchange/setOrders.module.css"
import {useEffect, useState} from "react";
import {tag} from "postcss-selector-parser";
import {type} from "node:os";
import {roundTo} from "@/utilities/Round";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import {useStoreAllOrders, useStoreAuth, useStoreMyOrders, useStoreProducts, useStoreUser} from "@/store/user";


export function SetOrders(){
    const store_auth = useStoreAuth()
    const store_user = useStoreUser()
    const setRerender = useStoreMyOrders(state => state.setRerender)
    const addOrder = useStoreAllOrders(state => state.addOrder)
    const buyOrders = useStoreAllOrders(state => state.buyOrders)
    const sellOrders = useStoreAllOrders(state => state.sellOrders)
    const [buyPrice, setBuyPrice] = useState(150)
    const [buyCount, setBuyCount] = useState(1)
    const [sellPrice, setSellPrice] = useState(150)
    const [sellCount, setSellCount] = useState(1)

    const getMaximumPriceBuyOrder = () => {
        let maximumPrice = 0
        for (let i = 0; i < buyOrders.length; i++){
            if (buyOrders[i].price > maximumPrice){
                maximumPrice = buyOrders[i].price
            }
        }
        return maximumPrice
    }
    const getMinimumPriceSellOrder = () => {
        let minimumPrice = 0
        for (let i = 0; i < sellOrders.length; i++){
            if (sellOrders[i].price > minimumPrice){
                minimumPrice = sellOrders[i].price
            }
        }
        return minimumPrice
    }
    useEffect(() => {
        let maximumPrice = getMaximumPriceBuyOrder()
        let minimumPrice = getMinimumPriceSellOrder()
        let currentPrice = useStoreProducts.getState()["Mann Co. Supply Crate Key RUB"]
        setBuyPrice(maximumPrice === 0 ? currentPrice.buy : maximumPrice)
        setSellPrice(minimumPrice === 0 ? currentPrice.sell : minimumPrice)
    }, []);

    const inputPrice = (value: string, action: string, replaceSymbol?: string) => {
        if (replaceSymbol){
            value = value.replace(replaceSymbol, "")
        }
        const number = Number(value)
        if (action === "sell"){
            setSellPrice(number)
        }
        else if (action === "buy"){
            setBuyPrice(number)
        }
    }
    const inputCount = (value: string, action: string) => {
        const number = Number(value)
        if (action === "sell"){
            setSellCount(number)
        }
        else if (action === "buy"){
            setBuyCount(number)
        }
    }
    const createOrder = (action: string) => {
        if (!store_user.auth){
            store_auth.Open()
            return
        }
        let data = {
            price: action === "sell" ? sellPrice : buyPrice,
            count: action === "sell" ? sellCount : buyCount,
            type: action,
            appId: "440",
            market_hash_name: "Mann Co. Supply Crate Key",
            symbol: "RUB"
        }
        const toastId = toast("Создаем заявку", {
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
        axios.post(`${process.env.api}/create_order`, data, {withCredentials: true}).then((response) => {
            const data =  response.data
            if (data.status){
                addOrder({
                    typeOrder: action,
                    orderId: data.orderId,
                    count: action === "sell" ? sellCount : buyCount,
                    symbol: "RUB",
                    price: action === "sell" ? sellPrice : buyPrice
                })
                setRerender(true)
                toast.update(toastId, {
                    render: "Заявка успешно создана",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false,
                    autoClose: 5000
                });
            }
            else{
                let answer = {
                    "symbol must be RUB or USD": "Валюта должна быть RUB или USD",
                    "type must be sell or buy": "Тип должен быть sell или buy",
                    "count must be greater than 0": "Количество должно быть больше 0",
                    "price must be greater than 0": "Цена должна быть больше 0",
                    "count must be integer": "Количество должно быть целым числом",
                    "you already have an active order": "У вас уже есть активная заявка",
                    "you need to set trade url": "Вам нужно установить ссылку на обмен в личном кабинете",
                    "insufficient funds": "Недостаточно средств",
                    "you need to set steam api key": "Вам нужно установить steam api key",
                    "you need to set telegram": "Вам нужно установить telegram в личном кабинете",
                    "Error getting inventory, may be profile hidden": "Ошибка получения инвентаря, возможно профиль скрыт",
                    "you don't have enough items": "У вас недостаточно предметов",
                    "profile is private": "Профиль скрыт",
                    "steam id does not match the registered one": "Steam id не совпадает с зарегистрированным",
                    "appId must be 440": "appId должен быть 440",
                    "market_hash_name must be Mann Co. Supply Crate Key": "market_hash_name должен быть Mann Co. Supply Crate Key",
                    "Seller need download extension and login in steam": "Вам необходимо скачать расширение и войти в Steam."
                }
                toast.update(toastId, {
                    render: data.error ? answer[data.error as keyof typeof answer] : "Ошибка при создании заявки",
                    type: toast.TYPE.ERROR,
                    isLoading: false,
                    autoClose: 5000
                });
            }
        }).catch((error) => {
            console.log(error)
            toast.update(toastId, {
                render: "Ошибка при создании заявки",
                type: toast.TYPE.ERROR,
                isLoading: false,
                autoClose: 5000
            });
        })
    }
    return (
        <section className={styles.section_wrap}>
            <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>Заявка на покупку</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={styles.card_item_wrap}>
                            <span className={styles.card_item_p}>Цена (за 1 шт.):</span>
                            <input className={styles.card_item_input_text} value={`₽ ${buyPrice}`} onChange={(event) =>  inputPrice(event.target.value, "buy", "₽ ")}/>
                        </div>
                        <div className={styles.card_item_wrap}>
                            <span className={styles.card_item_p}>Сколько вы хотите купить (шт.):</span>
                            <div className={styles.card_item_input}>
                            <input className={styles.card_item_input_text} value={buyCount} onChange={(event) =>  inputCount(event.target.value, "buy")}/>
                            </div>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>Общая сумма:</span>
                            <div className={styles.card_item_total}>
                                <span>₽{roundTo(buyCount * buyPrice, 2)}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => createOrder("buy")}>
                        <span>Создать</span>
                    </button>
                </div>
            </div>
            <div className={styles.section_card_wrap}>
                <h2 className={styles.card_top_header}>Заявка на продажу</h2>
                <div className={styles.card_wrap}>
                    <div className={styles.card_inner_wrap}>
                        <div className={styles.card_item_wrap}>
                            <span className={styles.card_item_p}>Цена (за 1 шт.):</span>
                            <input className={styles.card_item_input_text} value={`₽ ${sellPrice}`} onChange={(event) =>  inputPrice(event.target.value, "sell", "₽ ")}/>
                        </div>
                        <div className={styles.card_item_wrap}>
                            <span className={styles.card_item_p}>Сколько вы хотите продать (шт.):</span>
                            <input className={styles.card_item_input_text} value={sellCount} onChange={(event) =>  inputCount(event.target.value, "sell")}/>
                        </div>
                        <div className={`${styles.card_item_wrap} ${styles.card_item_wrap_bottom}`}>
                            <span className={styles.card_item_p}>Общая сумма:</span>
                            <div className={styles.card_item_total}>
                                <span>₽{roundTo(sellCount * sellPrice, 2)}</span>
                            </div>
                        </div>
                        <div className={styles.card_item_hr}></div>
                    </div>
                    <button className={styles.card_item_button} onClick={() => createOrder("sell")}>
                        <span>Создать</span>
                    </button>
                </div>
            </div>
        </section>
    )
}