"use client"

import {FC, useEffect, useState} from "react";
import styles from "@/styles/popUp/withdraw/withdraw.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";
import {
    useStoreErrorBalanceWithdraw,
    useStoreErrorWithdraw,
    useStoreSuccessWithdraw,
    useStoreUser,
    useStoreWithdrawUSDT
} from "@/store/user";
import {validateBinanceId, validateTronAddress} from "@/utilities/usdt";
import axios from "axios";

export const USDTMain: FC = () => {
    const t = useTranslations()
    const store_user = useStoreUser()
    const store_withdraw = useStoreWithdrawUSDT()
    const store_error = useStoreErrorWithdraw()
    const store_success = useStoreSuccessWithdraw()
    const store_error_balance = useStoreErrorBalanceWithdraw()
    let start = false
    const [usdtBalance, setUsdtBalance] = useState(undefined)

    const getBalancePaymentSystem = async () => {
        const usdt_response = await axios.get(`${process.env.api}/balance_usdt`, {withCredentials: true});
        if (!usdt_response.data.status){
            console.log("Ошибка при получении баланса платежной системы")
        }
        else{
            setUsdtBalance(usdt_response.data.balance)
            if (store_withdraw.amount > usdt_response.data.balance
                || store_withdraw.amountView > usdt_response.data.balance
                || store_user.balance_usd > usdt_response.data.balance){
                store_withdraw.setAmount(Number(usdt_response.data.balance))
                store_withdraw.setAmountView(String(usdt_response.data.balance))
                store_error_balance.setBalance(usdt_response.data.balance)
            }
        }
    }

    const createWithdraw = async () => {
        // const emailError = !checkEmail()
        const walletError = !checkWallet()
        const amountError = !checkAmount()
        if (usdtBalance){
            if (store_withdraw.amount > usdtBalance){
                store_error_balance.setWallet("USDT")
                store_error_balance.setCurrency("$")
                store_error_balance.Open()
                store_withdraw.setAmountError(true)
                return true
            }
        }
        try{
            if (walletError && amountError){
                const newBalance = Number((store_user.balance_usd - store_withdraw.amount).toFixed(2))
                store_user.setUserBalanceUSD(newBalance)
                // setCookie("withdrawEmail", store_withdraw.email, 360)
                const response = await axios.post(`${process.env.api}/withdraw_usdt`,
                    {pan: store_withdraw.wallet, network: store_withdraw.activePlatform, amount: store_withdraw.amount},
                    { withCredentials: true });
                if (response.data.status){
                    store_success.Open()
                    store_withdraw.Close()
                }
                else {
                    store_error.Open()
                    store_withdraw.Close()
                }
            }
        }
        catch (e) {
            store_error.Open()
            store_withdraw.Close()
        }

    }

    // const checkEmail = () => {
    //     const pattern = /^[a-z0-9][a-z0-9\._-]*[a-z0-9]*@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)*\.)+[a-z]+/i;
    //     const isError = store_withdraw.email.search(pattern) != 0
    //     store_withdraw.setEmailError(isError)
    //     return isError
    // }
    const checkWallet = () => {
        let error = false
        if (store_withdraw.activePlatform === "binance") {
            error = validateBinanceId(store_withdraw.wallet)
        }
        else if (store_withdraw.activePlatform === "tether") {
            error = validateTronAddress(store_withdraw.wallet)
        }
        store_withdraw.setWalletError(error)
        return error
    }

    const checkAmount = () => {
        if (store_withdraw.amount > store_user.balance_usd){
            store_withdraw.setAmountError(true)
            return true
        }
        else {
            store_withdraw.setAmountError(false)
        }
        if (store_withdraw.activePlatform === "binance" && store_withdraw.amount < 1) {
            store_withdraw.setCommissionError(true)
            return true
        }
        else if (store_withdraw.activePlatform === "tether" && store_withdraw.amount < 10 ) {
            store_withdraw.setCommissionError(true)
            return true
        }
        else {
            store_withdraw.setCommissionError(false)
            return false
        }
    }
    useEffect(() => {
        store_withdraw.setAmount(store_user.balance_usd)
        store_withdraw.setAmountView(`${store_user.balance_usd}`)
        getBalancePaymentSystem()
        // const defEmail = getCookie("withdrawEmail")
        // if (defEmail){
        //     store_withdraw.setEmail(defEmail)
        // }
    }, [start])

    useEffect(() => {
        checkAmount()
    }, [store_withdraw.amount])

    return (
        <section>
            <div className={`${styles.withdraw_wrap_right} ${styles.withdraw_wrap_dl}`}>
                <Image src="/close.svg"
                       alt="close"
                       className={styles.withdraw_wrap_right_closeIcon}
                       width={22}
                       height={22}
                       onClick={() => store_withdraw.reset()}
                       tabIndex={7}/>
                <h1 className={styles.withdraw_wrap_dl_head}>{t("Withdrawing funds to")} $</h1>
                <div className={`${styles.withdraw_wrap_right_withdrawBalance} ${styles.withdraw_wrap_dl_balance}`}>
                    <span className={styles.withdraw_wrap_right_withdrawBalance_grey}>{t("Your balance")}</span>
                    <span className={styles.withdraw_wrap_right_withdrawBalance_bal}>$ {store_user.balance_usd.toFixed(2)}</span>
                </div>
                <h2 className={styles.withdraw_wrap_dl_wallet}>{t("Select wallet")}</h2>
                <div className={styles.withdraw_wrap_dl_wrap_items}>
                    <div className={`${styles.withdraw_wrap_dl_wrap_item} ${store_withdraw.activePlatform === "binance" ? styles.withdraw_wrap_dl_wrap_item_active : ""}`}
                         onClick={() => store_withdraw.setActivePlatform("binance")}
                         onKeyPress={(e) => e.key === 'Enter' ? store_withdraw.setActivePlatform("binance") : null}
                         tabIndex={1}>
                        <Image src="/binance.svg" alt="binance" className={styles.wrap_item_icon} width={32} height={32}/>
                        <div className={styles.withdraw_wrap_dl_wrap_item_desc}>
                            <span className={styles.withdraw_wrap_dl_wrap_item_desc_top}>Binance</span>
                            <span className={styles.withdraw_wrap_dl_wrap_item_desc_btm}>Cryptocurrency</span>
                        </div>
                    </div>
                    <div className={`${styles.withdraw_wrap_dl_wrap_item} ${store_withdraw.activePlatform === "tether" ? styles.withdraw_wrap_dl_wrap_item_active : ""}`}
                         onClick={() => store_withdraw.setActivePlatform("tether")}
                         onKeyPress={(e) => e.key === 'Enter' ? store_withdraw.setActivePlatform("tether") : null}
                         tabIndex={2}>
                        <Image src="/tether.svg" alt="tether" className={styles.wrap_item_icon} width={32} height={32}/>
                        <div className={styles.withdraw_wrap_dl_wrap_item_desc}>
                            <span className={styles.withdraw_wrap_dl_wrap_item_desc_top}>USDT</span>
                            <span className={styles.withdraw_wrap_dl_wrap_item_desc_btm}>TRC-20</span>
                        </div>
                    </div>
                </div>
                <div className={styles.withdraw_wrap_right_amount_wrap}>
                    <div>
                        <p className={styles.withdraw_wrap_right_amount_wrap_desc}>{t("Enter withdrawal amount")}</p>
                        <input type="text"
                               value={store_withdraw.amountView}
                               onChange={(e) => {
                                   !isNaN(Number(e.target.value)) ? store_withdraw.setAmountView(e.target.value) : null
                                   !isNaN(parseFloat(e.target.value)) ? store_withdraw.setAmount(parseFloat(e.target.value)) : null
                                   !e.target.value ? store_withdraw.setAmount(0) : null
                               }}
                               placeholder={t("Withdrawal amount")}
                               className={`${styles.withdraw_wrap_right_input} ${styles.withdraw_wrap_right_input_frst}`}
                               tabIndex={3}/>
                        { store_withdraw.amountError ?
                            <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Maximum withdrawal amount")} {usdtBalance && usdtBalance > store_user.balance_usd ? store_user.balance_usd.toFixed(2) : usdtBalance} $</p> : null}
                    </div>
                    <div className={styles.withdraw_wrap_right_data_wrap}>
                        <p className={styles.withdraw_wrap_right_data_wrap_text}>{t("Enter your contact information")}</p>
                        {/*<div>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        value={store_withdraw.email}*/}
                        {/*        onChange={(e) => store_withdraw.setEmail(e.target.value)}*/}
                        {/*        placeholder="e-mail"*/}
                        {/*        onBlur={() => checkEmail()}*/}
                        {/*        className={`${styles.withdraw_wrap_right_input} ${styles.withdraw_wrap_right_input_frst}`}*/}
                        {/*        tabIndex={4}/>*/}
                        {/*    { store_withdraw.emailError ?*/}
                        {/*    <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Email mail is incorrect")}</p> : null}*/}
                        {/*</div>*/}
                        <div className={styles.withdraw_input_wrap}>
                            <input
                                type="text"
                                value={store_withdraw.wallet}
                                onBlur={() => checkWallet()}
                                onChange={(e) => store_withdraw.setWallet(e.target.value)}
                                placeholder={t("Enter your wallet number")}
                                className={`${styles.withdraw_wrap_right_input} ${styles.withdraw_wrap_right_input_frst}`}
                                tabIndex={5}
                            />
                            {store_withdraw.walletError ?
                                <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Wallet is incorrect")}</p> : null}
                        </div>
                    </div>
                </div>
                <div className={styles.withdraw_wrap_right_bottom_wrap}>
                    <div className={styles.withdraw_wrap_right_wrap_text}>
                        <div className={styles.withdraw_wrap_right_wrap_text_col}>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("Withdrawal method")}</span>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("Commission:")}</span>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("The amount you receive")}</span>
                        </div>
                        <div className={styles.withdraw_wrap_right_wrap_text_col}>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_right}>{store_withdraw.activePlatform === "binance" ? "Binance" : "USDT TRC20"}</span>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_right}>{store_withdraw.activePlatform === "binance" ? 0 : 1} $</span>
                            <span className={store_withdraw.amountError || store_withdraw.commissionError ? styles.withdraw_wrap_right_bottom_wrap_text_right_error : styles.withdraw_wrap_right_bottom_wrap_text_right_orange}>{store_withdraw.activePlatform === "binance" ? store_withdraw.amount : store_withdraw.amount - 1} $</span>
                        </div>
                    </div>
                    <button className={styles.withdraw_wrap_right_bottom_wrap_btn}
                            tabIndex={6}
                            onClick={() => createWithdraw()}
                            onKeyPress={(e) => e.key === 'Enter' ? createWithdraw() : null}>
                        <p className={styles.withdraw_wrap_right_bottom_wrap_btn_text}>{t("Get")}</p>
                    </button>
                </div>
                <div className={styles.withdraw_wrap_right_btm_wrap}>
                    <span className={styles.withdraw_wrap_right_politics_grey}>{t("pressing get i agree")}</span>
                    <span className={styles.withdraw_wrap_right_politics_white}>{t("refund policy")}</span>
                </div>
            </div>
        </section>
    )
}