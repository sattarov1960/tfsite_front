"use client"

import {FC, useEffect} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/upBalanceRUB/main.module.css"
import Image from "next/image";
import { useStoreUpBalanceRUB } from "@/store/user";
import {PaymentDataI} from "@/interface/paymentData";
import axios from "axios";
import {getCookie, setCookie} from "@/utilities/Cookies";
import Link from "next/link";

const paymentData: PaymentDataI = {
    "CardAIFORY": {coms: 1.035, comsView: 3.5, min: 300, name: "Card"},
    "CardGM": {coms: 1.045, comsView: 4.5, min: 25, name: "Card"},
    "QiwiGM": {coms: 1.075, comsView: 7.5, name: "Qiwi"},
    "BtcGM": {coms: 1.02, comsView: 2, name: "BTC"},
    "EthGM": {coms: 1.02, comsView: 2, name: "ETH"}
}
export const Main: FC = () => {
    const t = useTranslations()
    const store = useStoreUpBalanceRUB()
    // const start = false

    // useEffect(() => {
    //     const defEmail = getCookie("upEmailRUB")
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
        // if (!errorEmail && store.balance >= 100){
        if (store.balance >= 100){
            // setCookie("upEmailRUB", store.email, 360)
            if (store.active === "CardGM" || store.active === "QiwiGM" || store.active === "BtcGM" || store.active === "EthGM"){
                window.location.href = `${process.env.api}/create_invoice_gm`;
                return
            }
            const response = await axios.get(`${process.env.api}/create_invoice_aifory?amount=${store.balance}`, { withCredentials: true });
            if (response.data.status){
                window.location.href = response.data.paymentURL;
            }
            else{
                alert("Ошибка при создании invoice")
            }
        }
    }
    return (
        <div className={styles.popUp_replenishmentOfTheBalance}>
            <div className={styles.popUp_header}>
                <h2 className={styles.popUp_header_text}>
                    {t("Top up in")}
                    <span className={styles.popUp_header_text_curr}>₽</span>
                </h2>
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
                    {store.active === "CardAIFORY" ?
                        <div>
                            <span className={styles.popUp_sub_main_subText}>{t("Enter top-up amount")}</span>
                            <input
                                value={store.balance}
                                onChange={(e) => !isNaN(Number(e.target.value)) ? store.setBalance(Number(e.target.value)) : null}
                                type="text"
                                className={styles.popUp_main_input}
                                placeholder="Введите сумму:"
                                tabIndex={1}
                            />
                            {store.balance < 100 ?
                                <span className={styles.popUp_sub_main_warningText}>{t("Minimum top-up amount - ")}{paymentData[store.active].min} р</span>
                                : null}

                        </div>
                        : null}
                    <div className={styles.popUp_sub_main}>
                        <span className={styles.popUp_sub_main_subText}>{t("Choose payment method")}</span>
                        <div className={styles.popUp_sub_main_cardsDesktop}>
                            <div
                                tabIndex={2} onKeyPress={(e) => e.key === 'Enter' ? store.setActive("CardAIFORY") : null} onClick={() => store.setActive("CardAIFORY")} className={`${styles.popUp_sub_main_card} ${store.active === "CardAIFORY" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_card.svg"
                                    width={48}
                                    height={48}
                                    alt="Card"
                                    className={styles.popUp_sub_main_card_icon}
                                />
                                <div className={styles.popUp_sub_main_sub_card}>
                                    <p className={styles.popUp_sub_main_card_mainText}>Cards</p>
                                    <span className={styles.popUp_sub_main_card_subText}>MasterCard, VISA, etc.</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2.5%</span>
                            </div>
                            <div tabIndex={3} onKeyPress={(e) => e.key === 'Enter' ? store.setActive("CardGM") : null} onClick={() => store.setActive("CardGM")} className={`${styles.popUp_sub_main_card} ${store.active === "CardGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_card.svg"
                                    width={48}
                                    height={48}
                                    alt="Card"
                                    className={styles.popUp_sub_main_card_icon}
                                />
                                <div className={styles.popUp_sub_main_sub_card}>
                                    <p className={styles.popUp_sub_main_card_mainText}>Cards</p>
                                    <span className={styles.popUp_sub_main_card_subText}>MasterCard, VISA, etc.</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>4.5%</span>
                            </div>
                            <div tabIndex={4} onKeyPress={(e) => e.key === 'Enter' ? store.setActive("QiwiGM") : null} onClick={() => store.setActive("QiwiGM")} className={`${styles.popUp_sub_main_card} ${store.active === "QiwiGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_qiwi.svg"
                                    width={32}
                                    height={32}
                                    alt="Qiwi"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>QIWI</p>
                                    <span className={styles.popUp_sub_main_card_subText}>
                                    Payment system
                                </span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>7.5%</span>
                            </div>
                            <div tabIndex={5} onKeyPress={(e) => e.key === 'Enter' ? store.setActive("BtcGM") : null} onClick={() => store.setActive("BtcGM")} className={`${styles.popUp_sub_main_card} ${store.active === "BtcGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_btc.svg"
                                    width={32}
                                    height={32}
                                    alt="Btc"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>BTC</p>
                                    <span
                                        className={`${styles.popUp_sub_main_card_subText} ${styles.popUp_sub_main_card_subTextBTC}`}>Cryptocurrency</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2%</span>
                            </div>
                            <div tabIndex={6} onKeyPress={(e) => e.key === 'Enter' ? store.setActive("EthGM") : null} onClick={() => store.setActive("EthGM")} className={`${styles.popUp_sub_main_card} ${store.active === "EthGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_eth.svg"
                                    width={32}
                                    height={32}
                                    alt="ETH"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>ETH</p>
                                    <span
                                        className={`${styles.popUp_sub_main_card_subText} ${styles.popUp_sub_main_card_subTextETH}`}>ERC-20</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2%</span>
                            </div>
                        </div>
                        <div className={styles.popUp_sub_main_cardsMobile}>
                            <div onClick={() => store.setActive("CardAIFORY")} className={`${styles.popUp_sub_main_card} ${store.active === "CardAIFORY" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_card.svg"
                                    width={48}
                                    height={48}
                                    alt="Cross"
                                    className={styles.popUp_sub_main_card_icon}
                                />
                                <div className={styles.popUp_sub_main_sub_card}>
                                    <p className={styles.popUp_sub_main_card_mainText}>Cards</p>
                                    <span className={styles.popUp_sub_main_card_subText}>MasterCard, VISA, etc.</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2.5%</span>
                            </div>
                            <div onClick={() => store.setActive("CardGM")} className={`${styles.popUp_sub_main_card} ${store.active === "CardGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_card.svg"
                                    width={48}
                                    height={48}
                                    alt="Card"
                                    className={styles.popUp_sub_main_card_icon}
                                />
                                <div className={styles.popUp_sub_main_sub_card}>
                                    <p className={styles.popUp_sub_main_card_mainText}>Cards</p>
                                    <span className={styles.popUp_sub_main_card_subText}>MasterCard, VISA, etc.</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>4.5%</span>
                            </div>
                            <div onClick={() => store.setActive("QiwiGM")} className={`${styles.popUp_sub_main_card} ${store.active === "QiwiGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_btc.svg"
                                    width={32}
                                    height={32}
                                    alt="Qiwi"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>BTC</p>
                                    <span
                                        className={`${styles.popUp_sub_main_card_subText} ${styles.popUp_sub_main_card_subTextBTC}`}>Cryptocurrency</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2%</span>
                            </div>
                            <div onClick={() => store.setActive("BtcGM")} className={`${styles.popUp_sub_main_card} ${store.active === "BtcGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_qiwi.svg"
                                    width={32}
                                    height={32}
                                    alt="Qiwi"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>QIWI</p>
                                    <span className={styles.popUp_sub_main_card_subText}>Payment system</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>7.5%</span>
                            </div>
                            <div onClick={() => store.setActive("EthGM")} className={`${styles.popUp_sub_main_card} ${store.active === "EthGM" ? styles.popUp_sub_main_card_active : null}`}>
                                <Image
                                    src="/icon_eth.svg"
                                    width={32}
                                    height={32}
                                    alt="ETH"
                                    className={styles.popUp_sub_main_card_nextIcon}
                                />
                                <div className={`${styles.popUp_sub_main_sub_card} ${styles.popUp_sub_main_sub_nextCard}`}>
                                    <p className={styles.popUp_sub_main_card_mainText}>ETH</p>
                                    <span
                                        className={`${styles.popUp_sub_main_card_subText} ${styles.popUp_sub_main_card_subTextETH}`}>ERC-20</span>
                                </div>
                                <span className={styles.popUp_sub_main_card_percent}>2%</span>
                            </div>
                        </div>
                        {/*<div className={styles.popUp_sub_main_inputBlock}>*/}
                        {/*    <span className={styles.popUp_sub_main_subText}>{t("Enter contact details")}</span>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        className={styles.popUp_main_input}*/}
                        {/*        placeholder={t("Enter data")}*/}
                        {/*        value={store.email}*/}
                        {/*        onChange={(e) => store.setEmail(e.target.value)}*/}
                        {/*        onBlur={() => checkEmail()}*/}
                        {/*        tabIndex={7}*/}
                        {/*    />*/}
                        {/*    {store.errorEmail ? <span className={styles.popUp_sub_main_warningText}>{t("Email mail is incorrect")}</span> : null}*/}
                        {/*</div>*/}
                        <div className={`${styles.popUp_sub_main_footer} ${["CardGM", "QiwiGM", "BtcGM", "EthGM"].includes(store.active) ? styles.popUp_sub_main_footer_mini : null}`}>
                            <div className={styles.popUp_sub_main_footer_frstItem}>
                                <span className={styles.popUp_sub_main_footer_item_text}>{t("Payment method:")}</span>
                                <p className={styles.popUp_sub_main_footer_item_textBold}>{paymentData[store.active].name}</p>
                            </div>
                            <div className={styles.popUp_sub_main_footer_item}>
                                <span className={styles.popUp_sub_main_footer_item_text}>{t("Commission")}</span>
                                <p className={styles.popUp_sub_main_footer_item_textBold}>{paymentData[store.active].comsView}%</p>
                            </div>
                            {["CardGM", "QiwiGM", "BtcGM", "EthGM"].includes(store.active) ? null :
                                <div className={styles.popUp_sub_main_footer_item}>
                                    <span className={styles.popUp_sub_main_footer_item_text}>{t("Your payment:")}</span>
                                    <p className={styles.popUp_sub_main_footer_item_textBoldOrange}>
                                        ₽
                                        <span className={`${styles.popUp_sub_main_footer_item_textBoldOrange} ${styles.popUp_sub_main_footer_item_textBoldOrangeCurr}`}>{Math.ceil(store.balance * paymentData[store.active].coms)}</span>
                                    </p>
                                </div>
                            }
                            <button tabIndex={8} className={styles.popUp_sub_main_footer_button} onClick={() => createUp()}>{t("Top up")}</button>

                        </div>
                        <div className={styles.popUp_sub_main_privacyPolicy}>
                        <span className={styles.popUp_sub_main_privacyPolicy_textGray}>{t("By clicking \"Top up\", I agree to the")}<br/>
                            <Link href={`${process.env.current}/privacy`}>
                                <span className={styles.popUp_sub_main_privacyPolicy_textWhite}>{t("refund policy")}</span>
                            </Link>
                        </span>
                        </div>
                    </div>
                </div>
        </div>
    )
}
