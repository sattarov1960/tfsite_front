"use client"

import {FC, useEffect} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/sell/processMain.module.css"
import Image from "next/image";
import {useStoreProducts, useStoreBUY, useStoreUser} from "@/store/user";
import Link from "next/link";
import {OfferI} from "@/interface/auth";
import axios from "axios";
import {sleep} from "@/utilities/sleep";
import {setCookie} from "@/utilities/Cookies";

export const Item: FC<OfferI> = ({steamOfferId, offerId, bot, status, statusCode}) => {
    let statusTrade
    let stylesTrade
    if (status && [6, 7, 8, 10].includes(statusCode)) {
        statusTrade = "Обмен отменен!"
        stylesTrade = styles.redText
    }
    else if (status && [3].includes(statusCode)){
        statusTrade = "Обмен успешно завершен!"
        stylesTrade = styles.greenText
    }
    else if (status){
        statusTrade = "Обмен создан"
        stylesTrade = styles.violetText
    }
    else {
        statusTrade = "Обмен не удалось создать"
        stylesTrade = styles.redText
    }
    return (
        <div className={`${styles.popUp_sub_main_sub_rightBlock} ${styles.popUp_sub_main_sub_frstRightBlock}`}>
            <div className={styles.popUp_sub_main_rightBlock_frstPart}>
                <Link href={`https://steamcommunity.com/tradeoffer/${steamOfferId}`} target="_blank">
                    <p className={styles.popUp_sub_main_rightBlock_frstPart_textWhite}>
                        ID #{offerId.slice(0, 24)}
                    </p>
                </Link>
                { statusTrade === "Обмен создан" ?
                    <Image
                        src="/icon_loader.svg"
                        width={30}
                        height={30}
                        alt="Loader"
                        className={styles.popUp_sub_main_rightBlock_frstPart_icon}
                    /> : null
                }
            </div>
            <div className={styles.popUp_sub_main_rightBlock_scndPart}>
                <p className={styles.popUp_sub_main_rightBlock_scndPart_subText}> State 1:</p>
                <span className={`${styles.popUp_sub_main_rightBlock_scndPart_violetText} ${stylesTrade}`}>{statusTrade}</span>
                <Image
                    src="/icon_loader.svg"
                    width={30}
                    height={30}
                    alt="Loader"
                    className={styles.popUp_sub_main_rightBlock_frstPart_iconMobile}
                />
            </div>
        </div>
    )
}

export const Process: FC = () => {
    const t = useTranslations()
    const store = useStoreBUY()
    const store_user = useStoreUser()
    const store_product = useStoreProducts()
    const start = false
    let tradeId = ""
    let isCreateTrade = false
    let offers: OfferI[] = []
    useEffect(() => {
        createTrade().then(() => PendingTrade())
    }, [start])

    const createTrade = async () => {
        // @ts-ignore
        const item = store_product[store.activeItem]
        if (item.symbol === "$"){
            store_user.setUserBalanceUSD(store_user.balance_usd - (item.buy * store.amount))
        }
        else{
            store_user.setUserBalanceUSD(store_user.balance_rub - (item.buy * store.amount))
        }
        const trade_data = {
            hashName: store.activeItem,
            tradeLink: store.tradeLink,
            amount: store.amount,
            price: item.buy,
            totalPrice: item.buy * store.amount,
            confirm: store.checkBox,
            origin: item.symbol === "$" ? "USD" : "RUB",
            type: "buy"
        }
        const response = await axios.post(`${process.env.api}/create_trade`, trade_data,{ withCredentials: true, validateStatus: () => true });
        if (!response.data.status){
            store.setFinish(true)
            store.setIsLoad(false)
            isCreateTrade = false
            store.setErrMsg(response.data.err)
            throw new Error('Error created trade');
        }
        setCookie("tradeLink", store.tradeLink, 360)
        const formatList = response.data.offers.map((item: any) => {
            if (!item["status"]){
                store.setFinish(true)
            }
            return {
                bot: item["bot"],
                offerId: item["offer id"],
                status: item["status"],
                steamOfferId: item["steam offer id"],
                statusCode: 0
            }
        })
        store.setOffers(formatList)
        tradeId = response.data["trade id"]
        offers = formatList
        store.setTradeId(response.data["trade id"])
        isCreateTrade = true
        store.setIsLoad(false)
    }
    // @ts-ignore
    const PendingTrade = async () => {
        if (isCreateTrade){
            await sleep(10 * 1000)
            let finish = false
            while (!finish){
                const response = await axios.post(`${process.env.api}/status_trade`,
                    {tradeId: tradeId},
                    { withCredentials: true});
                if (!response.data.status && response.data.err === "This trade has already ended"){
                    finish = true
                    store.setFinish(true)
                    // @ts-ignore
                    const item = store_product[store.activeItem]
                    const newItem = Object.assign({}, item)
                    newItem.can_sell -= store.amount
                    newItem.can_buy += store.amount

                    switch (store.activeItem) {
                        case "Mann Co. Supply Crate Key RUB":
                            store_product.setProductKeyRUB(newItem)
                            break
                        case "Mann Co. Supply Crate Key USD":
                            store_product.setProductKeyUSD(newItem)
                            break
                        case "Tour of Duty Ticket RUB":
                            store_product.setProductTicketRUB(newItem)
                            break
                        case "Tour of Duty Ticket USD":
                            store_product.setProductTicketUSD(newItem)
                            break
                    }
                }
                else if (!response.data.status){
                    console.log(response.data.err)
                    continue
                }
                let haveSuccess
                for (let el of offers){
                    if (el){
                        el.statusCode = response.data.offers[el.offerId]
                        if (3 === el.statusCode) {
                            haveSuccess = true
                        }
                        if ([6, 7, 8, 10].includes(el.statusCode)){
                            store.setOffers(offers)
                            store.setFinish(true)
                        }
                    }
                }
                if (haveSuccess) {
                    store.setOffers(offers)
                }
                else {
                    await sleep(5 * 1000)
                }
            }
        }
    }
    return (
        <section>
            <div className={styles.popUp_replenishmentOfTheBalance_inDollars}>
                <div className={styles.popUp_header}>
                    <h2 className={styles.popUp_header_text}/*
                    // @ts-ignore */>
                        {t("Buy")} - {t(store_product[store.activeItem].translate)}
                    </h2>
                    {store.finish ? <Image
                        src="/icon_cross.svg"
                        width={40}
                        height={40}
                        alt="cross"
                        className={styles.cross}
                        onClick={() => {store.reset()}}
                    /> : null}
                    <hr className={styles.popUp_header_line}/>
                </div>
                <div>
                    <div className={styles.popUp_sub_main_more}>
                        <div className={styles.popUp_sub_main_leftBlock}>
                            <Image
                                src={store.activeItem.includes("Key") ? "/key.png" : "/ticket_trade.png"}
                                width={100}
                                height={100}
                                alt="key"
                                className={styles.item}
                            />
                            <div className={styles.popUp_sub_main_sub_leftBlock}>
                                <p className={styles.popUp_sub_main_sub_leftBlock_mainText}/*
                            // @ts-ignore */>
                                    {t(store_product[store.activeItem].translate)}
                                </p>
                                <span className={styles.popUp_sub_main_sub_leftBlock_subText}>
                                Team Fortress 2
                            </span>
                                <div className={styles.popUp_sub_main_sub_leftBlock_footerPart}>
                                    <span className={styles.popUp_sub_main_sub_leftBlock_footerPart_grayText}>{t("In quantity:")}</span>
                                    <p className={styles.popUp_sub_main_sub_leftBlock_footerPart_whiteText}>
                                        {store.amount} {t("pcs")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.popUp_sub_main_rightBlock}>
                            {store.isLoad ?
                                <div className={styles.popUp_sub_main_rightBlock_loader_wrap}>
                                    <div className={styles.lds_ring}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <span className={styles.popUp_sub_main_rightBlock_loader_span}>{t("Create a trade")}...</span>
                                </div> : null
                            }
                            {store.finish && !store.isLoad && store.errMsg ? <div className={styles.popUp_sub_main_rightBlock_loader_wrap}>
                                <Image
                                    src="/trist_smile.png"
                                    width={40}
                                    height={40}
                                    alt="trust smile"
                                />
                                <span className={styles.popUp_sub_main_rightBlock_error_span}>{t("Error creating exchange")}!</span>
                                <span className={styles.popUp_sub_main_rightBlock_loader_span_description}>{store.errMsg}</span>
                            </div> :
                               null
                            }
                            {store.offers.map((item, index) => <Item key={index} statusCode={item.statusCode} steamOfferId={item.steamOfferId} offerId={item.offerId} bot={item.bot} status={item.status}/>)}
                        </div>
                    </div>
                    <div className={styles.popUp_sub_main_buttons}>
                        <button className={`${styles.popUp_sub_main_buttonSteam} ${store.offers.length ? null : styles.text_off_steam}`} onClick={() => store.offers.map((item) => window.open(`steam://url/ShowTradeOffer/${item.steamOfferId}`, '_blank'))}>
                            {t("Accept via Steam")}
                        </button>
                        <button className={`${styles.popUp_sub_main_buttonBrowser} ${store.offers.length ? null : styles.text_off_browser}`} onClick={() => store.offers.map((item) => window.open(`https://steamcommunity.com/tradeoffer/${item.steamOfferId}`, '_blank'))}>
                            {t("Accept in browser")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
