"use client"

import {FC, useEffect} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/upBalanceUSD/main.module.css"
import Image from "next/image";
import { useStoreUpBalanceUSD } from "@/store/user";
import axios from "axios";
import {getCookie, setCookie} from "@/utilities/Cookies";
import Link from "next/link";

export const Main: FC = () => {
    const store = useStoreUpBalanceUSD()
    const t = useTranslations()
    // const start = false
    //
    // useEffect(() => {
    //     const defEmail = getCookie("upEmailUSD")
    //     if (defEmail){
    //         store.setEmail(defEmail)
    //     }
    // }, [start])

    // const checkEmail = () => {
    //     const pattern = /^[a-z0-9][a-z0-9\._-]*[a-z0-9]*@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)*\.)+[a-z]+/i;
    //     const isError = store.email.search(pattern) != 0
    //     store.setErrorEmail(isError)
    //     return isError
    // }
    const createUp = async () => {
        // const errorEmail = checkEmail()
        // if (!errorEmail && store.balance >= 1){
        if (store.balance >= 1){
            // setCookie("upEmailUSD", store.email, 360)
            const response = await axios.post(`${process.env.api}/create_invoice_usdt`, {amount: store.balance}, {withCredentials: true});
            store.Close()
            if (response.data.status){
                store.setOfferData({
                    invoice_id: response.data.invoice_id,
                    binance_id: response.data.binance_id,
                    usdt: response.data.usdt,
                    amount: response.data.amount
                })
                store.setOpenSuccess(true)
            }
            else{
                store.setOpenError(true)
            }
        }
    }
    return (
        <div className={styles.popUp_replenishmentOfTheBalance_inDollars}>
            <div className={styles.popUp_header}>
                <h2 className={styles.popUp_header_text}>{t("Top up in $")}</h2>
                <Image
                    src="/popUp_cross.svg"
                    width={40}
                    height={40}
                    alt="Cross"
                    className={styles.cross}
                    onClick={() => store.Close()}
                />
                <hr className={styles.popUp_header_line}/>
            </div>
            <div onKeyPress={(e) => e.key === 'Enter' ? createUp() : null} className={styles.popUp_main}>
                <div>
                    <span className={styles.popUp_main_subText}>{t("Enter top-up amount")}</span>
                    <input
                        tabIndex={1}
                        type="text"
                        className={styles.popUp_main_input}
                        value={store.balance}
                        onChange={(e) => !isNaN(Number(e.target.value)) ? store.setBalance(Number(e.target.value)) : null}
                        placeholder={t("Enter amount")}
                    />
                    {store.balance < 1 ?
                        <span className={styles.popUp_main_warningText}>{t("Minimum top-up amount - ")}1 $</span>
                        : null}
                </div>
                {/*<div className={styles.popUp_main_inputBlock}>*/}
                {/*    <span className={styles.popUp_main_subText}>{t("Enter contact details")}</span>*/}
                {/*    <input*/}
                {/*        tabIndex={2}*/}
                {/*        type="text"*/}
                {/*        className={styles.popUp_main_input}*/}
                {/*        placeholder={t("Enter email address")}*/}
                {/*        value={store.email}*/}
                {/*        onChange={(e) => store.setEmail(e.target.value)}*/}
                {/*        onBlur={() => checkEmail()}*/}
                {/*    />*/}
                {/*    {store.errorEmail ?*/}
                {/*        <span className={styles.popUp_main_warningText}>{t("Email mail is incorrect")}</span>*/}
                {/*        : null}*/}
                {/*</div>*/}
                <div className={styles.popUp_main_footer}>
                    <div className={styles.popUp_main_footer_frstItem}>
                        <span className={styles.popUp_main_footer_item_textLeft}>{t("Payment method:")}</span>
                        <p className={styles.popUp_main_footer_item_rightText}>USDT</p>
                    </div>
                    <div className={styles.popUp_main_footer_nextItem}>
                        <span className={styles.popUp_main_footer_item_textLeft}>{t("Commission:")}</span>
                        <p className={styles.popUp_main_footer_item_rightText}>0%</p>
                    </div>
                    <div className={styles.popUp_main_footer_nextItem}>
                        <span className={styles.popUp_main_footer_item_textLeft}>{t("Your payment:")}</span>
                        <p className={`${styles.popUp_main_footer_item_rightText} ${styles.popUp_main_footer_item_rightTextOrange}`}>$ {store.balance}</p>
                    </div>
                    <button className={styles.popUp_main_footer_button} tabIndex={3} onClick={() => createUp()}>{t("Top up")}</button>
                </div>
                <div className={styles.popUp_main_privacyPolicy}>
                    <span className={styles.popUp_main_privacyPolicy_textGray}>{t("By clicking \"Top up\", I agree to the")}
                        <Link href={`${process.env.current}/privacy`}>
                            <span className={styles.popUp_main_privacyPolicy_textWhite}>{t("refund policy")}</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
