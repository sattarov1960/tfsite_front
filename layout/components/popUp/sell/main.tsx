"use client"

import {FC, useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/sell/main.module.css"
import Image from "next/image";
import {useStoreProducts, useStoreSELL, useStoreUser} from "@/store/user";
import axios from "axios";
import {getCookie, setCookie} from "@/utilities/Cookies";
import Link from "next/link";

export const Main: FC = () => {
    const t = useTranslations()
    const store = useStoreSELL()
    const store_product = useStoreProducts()
    const store_user = useStoreUser()
    const start = false
    const [countItems, setCountItems] = useState(undefined)
    useEffect(() => {
        store.setTradeLink(getCookie("tradeLink"))
    }, [start])

    useEffect(() => {
        // @ts-ignore
        let searchItem = store_product[store.activeItem].item.replace("RUB", "").replace("USD", "").trimEnd()
        if (isValidTradeLink(store.tradeLink)) {
            loadCountItems(searchItem, store.tradeLink, "440").then((data) => {
                if (!data.status){
                    console.log("Ошибка получения инвентаря пользователя")
                }
                else{
                    setCountItems(data.count_search_items)
                    if (store.amount === 1){
                        store.setNumber(Number(data.count_search_items))
                    }
                }
            })
        }


    }, [store.tradeLink])

    const loadCountItems = async (search: string, tradeLink: string, appId: string) => {
        const response = await axios.post(`${process.env.api}/get_inventory`, {
            app_id: appId,
            search: search,
            tradeLink: tradeLink
        }, {withCredentials: true});
        return response.data
    }

    const isValidTradeLink = (tradeLink: string): boolean => {
        try{
            const url = new URL(tradeLink);
            const params = new URLSearchParams(url.search);

            if (params.get("token") === null || params.get("partner") === null){
                return false
            }
        }
        catch (e) {
            return false
        }
        return true
    }

    const createTrade = async () => {
        if (!store.checkBox){
            alert("Примите условие трейда")
            return
        }
        if (!store.amount){
            alert("Ошибка кол-ва")
            return
        }
        if (!isValidTradeLink(store.tradeLink)){
            alert("Ошибка, некорректная трейд ссылка")
            return
        }
        store.Close()
        store.setIsOpenTradeOffer(true)
    }
    return (
        <div className={styles.popUp_replenishmentOfTheBalance_inDollars} onKeyPress={(e) => e.key === 'Enter' ? createTrade() : null}>
            <div className={styles.popUp_header}>
                <h2 className={styles.popUp_header_textDesktop}/*
                    // @ts-ignore */>
                    {t("Sell")} - {t(store_product[store.activeItem].translate)}
                </h2>
                <h2 className={styles.popUp_header_textMobile}/*
                    // @ts-ignore */>
                    {t("Sell")} - {t(store_product[store.activeItem].translate)}
                </h2>
                <Image
                    src="/icon_cross.svg"
                    width={40}
                    height={40}
                    alt="cross"
                    className={styles.cross}
                    onClick={() => store.Close()}
                />
                <hr className={styles.popUp_header_line}/>
            </div>
            <div className={styles.popUp_main}>
                <div className={styles.popUp_sub_main}>
                    <div className={styles.popUp_sub_main_leftBlock}>
                        <Image
                            src={store.activeItem.includes("Key") ? "/key.png" : "/ticket_trade.png"}
                            width={100}
                            height={100}
                            alt="key"
                            className={styles.key}
                        />
                        <div className={styles.popUp_sub_main_sub_leftBlock}>
                            <p className={styles.popUp_sub_main_sub_leftBlock_mainText}/*
                            // @ts-ignore */>
                                {t(store_product[store.activeItem].translate)}
                            </p>
                            <span className={styles.popUp_sub_main_sub_leftBlock_subText}>Team Fortress 2</span>
                            <div className={styles.popUp_sub_main_sub_leftBlock_footerPart}>
                                <span className={styles.popUp_sub_main_sub_leftBlock_footerPart_grayText}>{t("Price for 1 pc:")}</span>
                                <p className={styles.popUp_sub_main_sub_leftBlock_footerPart_whiteText}/*
                                // @ts-ignore */
                                >{store_product[store.activeItem].symbol} {store_product[store.activeItem].sell}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.popUp_sub_main_rightBlock_frstPart}>
                            <span className={styles.popUp_sub_main_rightBlock_frstPart_text}>{t("Enter quantity:")}</span>
                            <input
                                className={styles.popUp_sub_main_rightBlock_frstPart_numberBlock}
                                type="text"
                                value={store.amount}/*
                                // @ts-ignore */
                                onChange={(e) => !isNaN(Number(e.target.value)) && store_product[store.activeItem].can_buy >= Number(e.target.value) ? store.setNumber(Number(e.target.value)) : null}
                            />
                        </div>
                        <div className={styles.popUp_sub_main_rightBlock_scndPart}>
                            <p className={styles.popUp_sub_main_rightBlock_scndPart_mainText}>{t("Total you will receive")}:</p>
                            <span
                                /*
                                // @ts-ignore */
                                className={styles.popUp_sub_main_rightBlock_scndPart_orangeText}>{store_product[store.activeItem].symbol} {(store_product[store.activeItem].sell * store.amount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.popUp_sub_mainBlock}>
                    <p className={styles.popUp_sub_mainBlock_topText}>{t("Insert your trade link")}</p>
                    <input
                        type="text"
                        className={styles.popUp_sub_mainBlock_input}
                        placeholder={t("Your trade link")}
                        value={store.tradeLink}
                        onChange={(event) => store.setTradeLink(event.target.value)}
                    />
                    <div className={styles.popUp_sub_mainBlock_bottomPart}>
                        <div className={styles.popUp_sub_mainBlock_bottomPart_leftBlock}>
                            <div className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_frstTextGray_wrap}>
                                <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_frstTextGray}>{t("Steam account:")}</span>
                                {countItems ? <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textGrayDesktop}>{t("in inventory")}:</span> : null}
                                <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textGrayDesktop}>{t("Funds will go to")}:</span>
                                <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textGray_mobile}>{t("Payment method:")}</span>
                            </div>
                            <div className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock}>
                                <p className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_frstTextWhite}>{store_user.steam.personaname}</p>
                                {countItems ?
                                <p className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textViolet_start}>
                                    <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_frstTextWhite}>{countItems}</span>
                                    <span className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textAddGray}>{t("(pcs)")}</span>
                                </p> : null}
                                <p className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textViolet}>
                                    {t("Site balance")}
                                    <span /*
                                        // @ts-ignore */
                                        className={styles.popUp_sub_mainBlock_bottomPart_sub_leftBlock_textAddGray}>({store_product[store.activeItem].symbol} {(store_product[store.activeItem].symbol === "$" ? store_user.balance_usd : store_user.balance_rub).toFixed(2)} )</span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.popUp_sub_mainBlock_bottomPart_rightBlock}>
                            <div className={styles.popUp_sub_mainBlock_bottomPart_sub_rightBlock}>
                                {store.checkBox ?
                                    <div onClick={() => store.setCheckBox(false)} className={styles.checkbox_open}>
                                        <Image src="/check.svg" alt="checkbox" className={styles.checkbox_svg} width={25} height={25}/>
                                    </div>
                                    :
                                    <div
                                        onClick={() => store.setCheckBox(true)}
                                        className={styles.checkbox_close}
                                    />}
                                <span className={styles.popUp_sub_mainBlock_bottomPart_rightBlock_text}>{t("I accept the")}<br/>
                                    <Link href={`${process.env.current}/privacy`}>
                                        <span className={styles.popUp_sub_mainBlock_bottomPart_rightBlock_textWhite}>{t("user agreement")}</span>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className={styles.popUp_sub_main_button} onClick={() => createTrade()}>{t("SELL")}</button>
            </div>
        </div>
    )
}
