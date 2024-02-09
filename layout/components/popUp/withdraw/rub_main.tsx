"use client"

import {FC, useEffect, useState} from "react";
import styles from "@/styles/popUp/withdraw/withdraw.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";
import {
    useStoreErrorBalanceWithdraw,
    useStoreErrorWithdraw, useStoreRubPS,
    useStoreSuccessWithdraw,
    useStoreUser,
    useStoreWithdrawRUB
} from "@/store/user";
import {validateCardNumber, validatePhoneNumber} from "@/utilities/rub";
import axios from "axios";
import Link from "next/link";
import {CommissionResult} from "@/interface/commission";

export const RUBMain: FC = () => {
    const t = useTranslations()
    const store_user = useStoreUser()
    const store_withdraw = useStoreWithdrawRUB()
    const store_error = useStoreErrorWithdraw()
    const store_success = useStoreSuccessWithdraw()
    let start = false
    let activePlatformView = ""
    const store_error_balance = useStoreErrorBalanceWithdraw()
    const store_rub_PS = useStoreRubPS()

    useEffect(() => {
        store_withdraw.setAmount(store_user.balance_rub)
        // const defEmail = getCookie("withdrawEmail")
        // if (defEmail){
        //     store_withdraw.setEmail(defEmail)
        // }
        loadLastWalletQiwi()
        getBalancePaymentSystem()
    }, [start])

    const getBalancePaymentSystem = async () => {
        for (const i of ["balance_aifory", "balance_gm"]) {
            const usdt_response = await axios.get(`${process.env.api}/${i}`, {withCredentials: true});
            if (!usdt_response.data.status){
                console.log("Ошибка при получении баланса платежной системы")
            }
            else{
                if (i.includes("aifory")){
                    store_rub_PS.setBalanceAIFORY(usdt_response.data.balance)
                }
                else if (i.includes("gm")){
                    store_rub_PS.setBalanceGM(usdt_response.data.balance)
                }
            }
        }
    }

    useEffect(() => {
        checkAmount()
    }, [store_withdraw.amount, store_withdraw.activePlatform])

    switch (store_withdraw.activePlatform) {
        case "qiwi":
            activePlatformView = "Qiwi"
            break
        case "card":
            activePlatformView = "Card 2"
            break
        case "aifory":
            activePlatformView = "Card"
            break
        case "yoo money":
            activePlatformView = "Yoo Money"
            break
    }

    const createWithdraw = async () => {
        // const emailError = !checkEmail()
        const walletError = !checkWallet()
        const amountError = !checkAmount()
        // @ts-ignore
        let balance_ps = 0
        if (store_withdraw.activePlatform === "qiwi" ||store_withdraw.activePlatform === "card"){
            balance_ps = store_rub_PS.balanceGM
        }
        else if (store_withdraw.activePlatform === "aifory"){
            balance_ps = store_rub_PS.balanceAIFORY
        }
        if (balance_ps < store_withdraw.amount){
            store_error_balance.setBalance(balance_ps)
            store_error_balance.setCurrency("₽")
            switch (store_withdraw.activePlatform) {
                case "qiwi":
                    store_error_balance.setWallet("Qiwi")
                    break
                case "aifory":
                    store_error_balance.setWallet("Card")
                    break
                case "card":
                    store_error_balance.setWallet("Card 2")
            }
            store_error_balance.Open()
            return
        }
        try {
            // if (emailError && walletError && amountError){
            if (walletError && amountError){
                const newBalance = Number((store_user.balance_rub - store_withdraw.amount).toFixed(2))
                store_user.setUserBalanceRUB(newBalance)
                let urlEnd;
                if (store_withdraw.activePlatform === "qiwi" || store_withdraw.activePlatform === "card"){
                    urlEnd = "withdraw_gm"
                }
                else if (store_withdraw.activePlatform === "aifory"){
                    urlEnd = "withdraw_aifory"
                }
                else {return}
                // setCookie("withdrawEmail", store_withdraw.email, 360)
                const response = await axios.post(`${process.env.api}/${urlEnd}`,
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

    const loadCardsGM = async () => {
        const response = await axios.get(`${process.env.api}/gm_get_cards`, { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог загрузить карты пользователя")
        }
        else{
            store_withdraw.setCards(response.data.cards)
            store_withdraw.setWallet(response.data.lastWallet ? response.data.lastWallet : response.data.cards.at(-1))
            store_withdraw.setWalletError(false)
        }
    }
    const getLinkAddCardGM = async () => {
        const response = await axios.get(`${process.env.api}/gm_add_card`, { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог загрузить ссылку для добавления карты")
        }
        else{
            store_withdraw.setLinkAddCard(response.data.url)
        }
    }

    const delCardGM = async (pan: string) => {
        const response = await axios.post(`${process.env.api}/gm_del_card`,
                                         {pan: pan},
                                        { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог удалить карту")
        }
        else{
            let newCards = store_withdraw.cards.filter((card) => card !== pan)
            store_withdraw.setCards(newCards)
            if (!newCards.length){
                store_withdraw.setIsOpenCards(false)
                store_withdraw.setWallet("")
            }
            else{
                store_withdraw.setWallet(newCards[0])
            }
        }
    }

    const delCardAIFORY = async (pan: string) => {
        const response = await axios.post(`${process.env.api}/aifory_del_card`,
                                         {pan: pan},
                                        { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог удалить карту")
        }
        else{
            let newCards = store_withdraw.cards.filter((card) => card !== pan)
            store_withdraw.setCards(newCards)
            if (!newCards.length){
                store_withdraw.setIsOpenCards(false)
                store_withdraw.setWallet("")
            }
            else{
                store_withdraw.setWallet(newCards[0])
            }
        }
    }

    const checkAmount = () => {
        if (store_withdraw.amount > store_user.balance_rub){
            store_withdraw.setAmountError(true)
            return true
        }
        else {
            store_withdraw.setAmountError(false)
        }
        if (store_withdraw.activePlatform === "card" && store_withdraw.amount < 1000 ||
            store_withdraw.activePlatform === "qiwi" && store_withdraw.amount < 10 ||
            store_withdraw.activePlatform === "aifory" && store_withdraw.amount < 1050) {
            store_withdraw.setCommissionError(true)
            return true
        }
        else{
            store_withdraw.setCommissionError(false)
        }
        return false
    }

    const checkWallet = () => {
        let error = false
        if (store_withdraw.activePlatform === "qiwi") {
            error = validatePhoneNumber(store_withdraw.wallet)
        }
        else if (store_withdraw.activePlatform === "aifory") {
            const card = store_withdraw.wallet.replaceAll(" ", "")
            error = validateCardNumber(card)
        }
        else if (store_withdraw.activePlatform === "card") {
            error = true
        }
        else{
            return false
        }
        store_withdraw.setWalletError(!error)
        return !error
    }

    const loadCardsAIFORY = async () => {
        const response = await axios.get(`${process.env.api}/aifory_get_card`, { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог загрузить карты пользователя")
        }
        else{
            store_withdraw.setWallet(response.data.lastWallet)
            store_withdraw.setCards(response.data.cards)
            store_withdraw.setWalletError(false)
        }
    }
    const loadLastWalletQiwi = async () => {
        const response = await axios.get(`${process.env.api}/gm_get_qiwi`, { withCredentials: true });
        const data = response.data
        if (!data.status){
            alert("Не смог загрузить карты пользователя")
        }
        else{
            store_withdraw.setWallet(response.data.lastWallet)
            store_withdraw.setWalletError(false)
        }
    }

    // const checkEmail = () => {
    //     const pattern = /^[a-z0-9][a-z0-9\._-]*[a-z0-9]*@([a-z0-9]+([a-z0-9-]*[a-z0-9]+)*\.)+[a-z]+/i;
    //     const isError = store_withdraw.email.search(pattern) != 0
    //     store_withdraw.setEmailError(isError)
    //     return isError
    // }

    function getAmountCommission(): CommissionResult {
        let commission = "";
        let commissionDescription = "";
        switch (store_withdraw.activePlatform){
            case "qiwi":
                commission = (store_withdraw.amount * 0.97).toFixed(2)
                commissionDescription = "3%"
                break
            case "card":
                commission = ((store_withdraw.amount - 50) / 1.035).toFixed(2)
                commissionDescription = "3.5% + 50₽"
                break
            case "aifory":
                commission = (store_withdraw.amount * 0.98).toFixed(2)
                commissionDescription = "2%"
                break
            case "yoo money":
                break
        }
        return {
            commission: commission,
            commissionDescription: commissionDescription,
        };
    }

    function getWalletPrompt(
        activePlatform: string,
        cards: string[],
        t: (text: string) => string
    ): string {
        if (activePlatform.includes("aifory")) {
            return "Введите номер карты"
        }
        else if (activePlatform.includes("card")) {
            if (cards.length) {
                return t("Enter your wallet number");
            } else {
                return "";
            }
        } else {
            return t("Enter your wallet number");
        }
    }
    return (
        <section className={styles.withdraw_wrap}>
            <div className={styles.withdraw_wrap_left}>
                <Image
                    src={"/close.svg"}
                    alt={"close"}
                    className={`${styles.withdraw_wrap_right_closeIcon} ${styles.withdraw_wrap_right_closeIcon_hidden_desktop}`}
                    width={22}
                    height={22}
                    onClick={() => store_withdraw.reset()}
                />
                <h1 className={styles.withdraw_wrap_left_h1}>{t("Withdrawing funds to")} ₽</h1>
                <hr className={styles.withdraw_wrap_left_hr}/>
                <p className={styles.withdraw_wrap_left_p}>{t("Select a withdrawal method")}</p>
                <div className={`${styles.withdraw_wrap_left_item} ${styles.withdraw_wrap_left_item_first}  ${store_withdraw.activePlatform === "qiwi" ?  styles.withdraw_wrap_left_item_active : null}`}
                     onClick={() => {store_withdraw.setActivePlatform("qiwi"); loadLastWalletQiwi(); store_withdraw.setIsOpenCards(false)}}
                     onKeyPress={(e) => {if (e.key === 'Enter') store_withdraw.setActivePlatform("qiwi"); loadLastWalletQiwi(); store_withdraw.setIsOpenCards(false)}}
                     tabIndex={1}
                >
                    <div className={styles.withdraw_wrap_left_item_img_wrap}>
                        <div>
                            <Image src="/withdraw_qiwi.svg" alt="qiwi" className={styles.withdraw_wrap_left_item_qiwi} width={50} height={50}/>
                        </div>
                        <div className={styles.withdraw_wrap_left_item_desc_wrap}>
                            <p className={styles.withdraw_wrap_left_item_ps}>QIWI</p>
                            <span className={styles.withdraw_wrap_left_item_desc}>(Payment system)</span>
                        </div>
                    </div>
                    <div className={styles.withdraw_wrap_left_item_right_wrap}>
                        <span className={styles.withdraw_wrap_left_item_percent}>3%</span>
                    </div>
                </div>
                <div className={`${styles.withdraw_wrap_left_item} ${store_withdraw.activePlatform === "aifory" ?  styles.withdraw_wrap_left_item_active : null}`}
                     onClick={() => {store_withdraw.setActivePlatform("aifory"); loadCardsAIFORY(); store_withdraw.setIsOpenCards(false)}}
                     onKeyPress={(e) => {if (e.key === 'Enter') store_withdraw.setActivePlatform("aifory"); loadCardsAIFORY(); store_withdraw.setIsOpenCards(false)}}
                     tabIndex={2}
                >
                    <div className={styles.withdraw_wrap_left_item_img_wrap}>
                        <div>
                            <Image src="/withdraw_card.svg" alt="card" className={styles.withdraw_wrap_left_item_card} width={50} height={50}/>
                        </div>
                        <div className={styles.withdraw_wrap_left_item_desc_wrap}>
                            <p className={styles.withdraw_wrap_left_item_ps}>Cards</p>
                            <span className={styles.withdraw_wrap_left_item_desc}>(MasterCard, VISA, etc.)</span>
                        </div>
                    </div>
                    <div className={styles.withdraw_wrap_left_item_right_wrap}>
                        <span className={styles.withdraw_wrap_left_item_percent}>2%</span>
                    </div>
                </div>
                <div className={`${styles.withdraw_wrap_left_item}  ${store_withdraw.activePlatform === "card" ?  styles.withdraw_wrap_left_item_active : null}`}
                     onClick={() => {store_withdraw.setActivePlatform("card"); getLinkAddCardGM(); loadCardsGM(); store_withdraw.setWallet("")}}
                     onKeyPress={(e) => {if (e.key === 'Enter') store_withdraw.setActivePlatform("card"); getLinkAddCardGM(); loadCardsGM(); store_withdraw.setWallet("")}}
                     tabIndex={3}
                >
                    <div className={styles.withdraw_wrap_left_item_img_wrap}>
                        <div>
                            <Image src="/withdraw_card_2.svg" alt="card" className={styles.withdraw_wrap_left_item_card} width={50} height={50}/>
                        </div>
                        <div className={styles.withdraw_wrap_left_item_desc_wrap}>
                            <p className={styles.withdraw_wrap_left_item_ps}>Cards 2</p>
                            <span className={styles.withdraw_wrap_left_item_desc}>(MasterCard, VISA, etc.)</span>
                        </div>
                    </div>
                    <div className={styles.withdraw_wrap_left_item_right_wrap}>
                        <span className={styles.withdraw_wrap_left_item_percent}>3.5% + 50₽</span>
                    </div>
                </div>
                <div className={`${styles.withdraw_wrap_left_item} ${store_withdraw.activePlatform === "yoo money" ?  styles.withdraw_wrap_left_item_active : null}`}
                     // onClick={() => {store_withdraw.setActivePlatform("yoo money")}}
                     // onKeyPress={(e) => e.key === 'Enter' ? store_withdraw.setActivePlatform("yoo money") : null}
                     // tabIndex={4}
                >
                    <div className={styles.withdraw_wrap_left_item_img_wrap}>
                        <div>
                            <Image src="/you_money.svg" alt="you_money" className={styles.withdraw_wrap_left_item_you_money} width={45} height={35}/>
                        </div>
                        <div className={styles.withdraw_wrap_left_item_desc_wrap}>
                            <p className={styles.withdraw_wrap_left_item_ps}>YooMoney</p>
                            <span className={styles.withdraw_wrap_left_item_desc}>(Payment system)</span>
                        </div>
                    </div>
                    <div className={styles.withdraw_wrap_left_item_right_wrap}>
                        <span className={styles.withdraw_wrap_left_item_percent}>2.5%</span>
                    </div>
                </div>
            </div>
            <div className={styles.withdraw_wrap_right}>
                <Image
                    src="/close.svg"
                    alt="close"
                    className={`${styles.withdraw_wrap_right_closeIcon} ${styles.withdraw_wrap_right_closeIcon_hidden_mobile}`}
                    width={22}
                    height={22}
                    onClick={() => store_withdraw.reset()}
                />
                <div className={styles.withdraw_wrap_right_withdrawBalance}>
                    <span className={styles.withdraw_wrap_right_withdrawBalance_grey}>{t("Your balance")}</span>
                    <span className={styles.withdraw_wrap_right_withdrawBalance_bal}>₽ {store_user.balance_rub.toFixed(2)}</span>
                </div>
                <div className={styles.withdraw_wrap_right_amount_wrap}>
                    <div>
                        <p className={styles.withdraw_wrap_right_amount_wrap_desc}>{t("Enter withdrawal amount")}</p>
                        <input type="text"
                               value={store_withdraw.amount}
                               onChange={(e) => !isNaN(Number(e.target.value)) ? store_withdraw.setAmount(Number(e.target.value)) : null}
                               placeholder={t("Withdrawal amount")}
                               className={`${styles.withdraw_wrap_right_input} ${styles.withdraw_wrap_right_input_frst}`}
                               tabIndex={4}/>
                        { store_withdraw.amountError ?
                            <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Maximum withdrawal amount")} {store_user.balance_rub.toFixed(2)} ₽</p> : null}
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
                        {/*        tabIndex={5}/>*/}
                        {/*    { store_withdraw.emailError ?*/}
                        {/*        <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Email mail is incorrect")}</p> : null}*/}
                        {/*</div>*/}
                        <div className={styles.withdraw_input_wrap}>
                            <input
                                type="text"
                                placeholder={getWalletPrompt(store_withdraw.activePlatform,
                                                             store_withdraw.cards,
                                                             t)}
                                onBlur={() => checkWallet()}
                                tabIndex={6}
                                value={store_withdraw.wallet}
                                onChange={(e) => store_withdraw.setWallet(e.target.value)}
                                readOnly={store_withdraw.activePlatform === "card"}
                                className={`${styles.withdraw_wrap_right_input_active} ${styles.withdraw_wrap_right_input} ${styles.withdraw_wrap_right_input_frst}`}/>
                            {store_withdraw.activePlatform.includes("card") || store_withdraw.activePlatform.includes("aifory") ?
                            <div>
                                {(store_withdraw.activePlatform.includes("card") || store_withdraw.activePlatform.includes("aifory")) && store_withdraw.cards.length ?
                                    <>
                                        <Image
                                            className={`${styles.withdraw_input_wrap_up} ${store_withdraw.isOpenCards ? styles.withdraw_input_wrap_open : null}`}
                                            src="/scroll.svg" alt="up"
                                            width={24}
                                            height={24}
                                            onClick={() => store_withdraw.setIsOpenCards(!store_withdraw.isOpenCards)}/>
                                        {store_withdraw.wallet[0] === "2" ? <Image className={styles.withdraw_input_wrap_card} src="/mir_card.svg" alt="mir card" width={32} height={22}/> : null}
                                        {store_withdraw.wallet[0] === "4" ? <Image className={styles.withdraw_input_wrap_card} src="/visa_card.svg" alt="visa" width={32} height={22}/> : null}
                                        {store_withdraw.wallet[0] === "5" ? <Image className={styles.withdraw_input_wrap_card} src="/mastercard.svg" alt="master card" width={32} height={22}/> : null}
                                    </>
                                     : null }

                                {store_withdraw.activePlatform.includes("card") && !store_withdraw.cards.length ?
                                    <Link href={store_withdraw.linkAddCard ? store_withdraw.linkAddCard : ""}>
                                        <div className={styles.withdraw_input_wrap_up_abs}>
                                            <span className={styles.withdraw_input_wrap_up_text}>{t("Add a new card")}</span>
                                                <Image src="/add_card.svg" alt="add card" className={`${styles.withdraw_card_menu_item_add_img} ${styles.withdraw_card_menu_item_add_img_mt}`} width={12} height={12}/>
                                        </div>
                                    </Link>: null }
                            </div> : null}
                            {store_withdraw.isOpenCards ?
                                <div className={styles.withdraw_card_menu}>
                                    {store_withdraw.cards.map((card) =>
                                        <div key={card} className={styles.withdraw_card_menu_item}>
                                            <span className={styles.withdraw_card_menu_item_text} onClick={() => {store_withdraw.setWallet(card); store_withdraw.setIsOpenCards(false)}}>{card.slice(0, 6) + "******" + card.slice(-4)}</span>
                                            <div className={styles.withdraw_card_menu_item_img_wrap}>
                                                {card[0] === "2" ? <Image className={styles.withdraw_card_menu_item_cardIcon} src="/mir_card.svg" alt="mir card" width={32} height={22}/> : null}
                                                {card[0] === "4" ? <Image className={styles.withdraw_card_menu_item_cardIcon} src="/visa_card.svg" alt="visa" width={32} height={22}/> : null}
                                                {card[0] === "5" ? <Image className={styles.withdraw_card_menu_item_cardIcon} src="/mastercard.svg" alt="master card" width={32} height={22}/> : null}
                                                <Image className={styles.withdraw_card_menu_item_delIcon} src="/del_card.svg" alt="del_card" width={13} height={13} onClick={() => store_withdraw.activePlatform.includes("card") ? delCardGM(card) : delCardAIFORY(card)}/>
                                            </div>
                                        </div>
                                    )}
                                    {store_withdraw.activePlatform.includes("card") ?
                                        <Link className={styles.withdraw_card_menu_item_wrap} href={store_withdraw.linkAddCard ? store_withdraw.linkAddCard : ""}>
                                            <span className={styles.withdraw_card_menu_item_add_text}>{t("Add a new card")}</span>
                                            <Image src="/add_card.svg" alt="add card" className={styles.withdraw_card_menu_item_add_img} width={12} height={12}/>
                                        </Link> : null}
                                </div> : null
                            }
                            {store_withdraw.walletError ? <p className={styles.withdraw_wrap_right_amount_wrap_err}>{t("Wallet is incorrect")}</p> : null}
                        </div>
                    </div>
                </div>
                <div className={styles.withdraw_wrap_right_bottom_wrap}>
                    <div className={styles.withdraw_wrap_right_wrap_text}>
                        <div className={styles.withdraw_wrap_right_wrap_text_col}>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("Withdrawal method")}</span>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("Commission:")}</span>
                            <span
                                className={styles.withdraw_wrap_right_bottom_wrap_text_left}>{t("The amount you receive")}</span>
                        </div>
                        <div className={styles.withdraw_wrap_right_wrap_text_col}>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_right}>{activePlatformView}</span>
                            <span className={styles.withdraw_wrap_right_bottom_wrap_text_right}>{getAmountCommission().commissionDescription}</span>
                            <span className={store_withdraw.amountError || store_withdraw.commissionError ? styles.withdraw_wrap_right_bottom_wrap_text_right_error : styles.withdraw_wrap_right_bottom_wrap_text_right_orange}>₽ {getAmountCommission().commission}</span>
                        </div>
                    </div>
                    <div className={styles.withdraw_wrap_right_bottom_wrap_btn}
                         style={{opacity: store_withdraw.amountError || store_withdraw.commissionError ? 0.5 : 1}}
                         tabIndex={7}
                         onClick={() => createWithdraw()}
                         onKeyPress={(e) => e.key === 'Enter' ? createWithdraw() : null}>
                        <p className={styles.withdraw_wrap_right_bottom_wrap_btn_text}>{t("Get")}</p>
                    </div>
                </div>
                <div className={styles.withdraw_wrap_right_btm_wrap}>
                    <span className={styles.withdraw_wrap_right_politics_grey}>{t("pressing get i agree")}</span>
                    <span className={styles.withdraw_wrap_right_politics_white}>{t("refund policy")}</span>
                </div>
            </div>
        </section>
    )
}