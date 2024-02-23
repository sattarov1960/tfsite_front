"use client"

import {FC, useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/cabinet/cabinet.module.css"
import copy from "@/public/copy.svg"
import Image from 'next/image'
import {useStoreUser} from "@/store/user";
import axios from "axios";
import {toast} from "react-toastify";
import {validateTradeLink} from "@/utilities/trradeLink";
import {validateEmail} from "@/utilities/email";
import {validateTelegram} from "@/utilities/telegram";
import {validatePhone} from "@/utilities/phone";
import {validateApiKey} from "@/utilities/apiKey";

export const Cabinet: FC = () => {
    const user = useStoreUser()
    const [apikey, setApikey] = useState(user.steamApiKey)
    const [tradeUrl, setTradeUrl] = useState(user.steamTradeUrl)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [telegram, setTelegram] = useState(user.telegramAddress)
    const t = useTranslations()
    const delTelegram = async () => {
        const toastId = toast("Отвязываем аккаунт", {
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
        axios.get(`${process.env.api}/del_telegram`, {withCredentials: true}).then(res => {
            const data = res.data
            if (data.status){
                toast.update(toastId, {
                    render: "Аккаунт успешно отвязан",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false
                });
                user.setTelegramEnable(false)
            }
            else{
                toast.update(toastId, {
                    render: "Ошибка отвязки аккаунта",
                    type: toast.TYPE.ERROR,
                    isLoading: false
                })
            }
        }).catch(err => {
            toast.update(toastId, {
                render: `Ошибка отвязки аккаунта ${err}`,
                type: toast.TYPE.ERROR,
                isLoading: false
            })
        })
    }

    const copyCode = () => {
        try{
            navigator.clipboard.writeText(user.telegramCodeActivate)
            toast.success(
                "Код активации скопирован", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            )
        }
        catch (e) {
            toast.error(
                "Ошибка копирования кода активации", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            )
        }
    }

    const setData = async (argSave: string, value: string) => {
        const toastId = toast("Сохраняем данные", {
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
        let error: { [key: string]: [(value: string) => boolean, (value: string) => void] } = {
            "API KEY": [validateApiKey, user.setSteamApiKey],
            "trade link": [validateTradeLink, user.setSteamTradeUrl],
            "email": [validateEmail, user.setEmail],
            "phone": [validatePhone, user.setPhone]
        }
        if (!error[argSave][0](value)){
            toast.update(toastId, {
                render: t(`Invalid ${argSave}`),
                type: toast.TYPE.ERROR,
                isLoading: false
            })
            return
        }
        else{
            error[argSave][1](value)
        }
        axios.post(`${process.env.api}/set_user_data`, {updateValue: value, updateName: argSave}, {withCredentials: true}).then(res => {
            const data = res.data
            if (data.status){
                toast.update(toastId, {
                    render: "Данные успешно сохранены",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false
                });
                user.setSteamApiKey(apikey)
                user.setSteamTradeUrl(tradeUrl)
            }
            else{
                toast.update(toastId, {
                    render: "Ошибка сохранения данных",
                    type: toast.TYPE.ERROR,
                    isLoading: false
                })
            }
        }).catch(err => {
            toast.update(toastId, {
                render: `Ошибка сохранения данных ${err}`,
                type: toast.TYPE.ERROR,
                isLoading: false
            })
        })
    }
    return (
        <article className={styles.article_cabinet_wrap}>
            <section className={styles.left_section_wrap}>
                <div className={styles.left_section_top_two_wrap}>
                    <div className={styles.left_section_top_wrap}>
                        <p className={styles.left_section_top_left_p}>{user.steam.personaname}</p>
                        <div className={styles.left_section_top_btn_wrap}>
                            <img
                                src={`https://avatars.steamstatic.com/${user.steam.avatarhash}_full.jpg`}
                                alt="user" className={styles.left_section_top_left_img}/>
                            <div className={styles.left_section_top_left_btn_wrap}>
                                <div className={styles.left_section_top_left_right_item}>
                                    <span className={styles.left_section_top_left_right_span}>{t("Registration")}</span>
                                    <span className={styles.left_section_top_left_right_span_orange}>{user.registration}</span>
                                </div>
                                <div className={styles.left_section_top_left_hr}/>
                                <div className={styles.left_section_top_left_right_item}>
                                    <span className={styles.left_section_top_left_right_span}>{t("Exchange")}</span>
                                    <span className={styles.left_section_top_left_right_span_orange}>{user.countTrades}</span>
                                </div>
                                <div className={styles.left_section_top_left_hr}/>
                                <div className={styles.left_section_top_left_right_item}>
                                    <span className={styles.left_section_top_left_right_span}>User ID</span>
                                    <span className={styles.left_section_top_left_right_span_orange}>{user.userId}</span>
                                </div>
                                <div className={styles.left_section_top_left_hr}/>
                            </div>
                        </div>
                    </div>
                    <div>
                    <p className={styles.left_section_top_left_p}>{t("Contact Information")}</p>
                        <div className={styles.left_section_top_right_wrap}>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span className={styles.left_section_top_right_item_left_span}>E-mail:</span>
                                    <input placeholder="Email:" type="text" value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className={styles.left_section_btn_item_input_top}/>
                                    <span className={styles.left_section_top_right_item_right_span} style={{
                                        color: user.email !== email ? "white" : "#8C8D96"
                                    }} onClick={() => setData("email", email)}>{t("Apply")}</span>
                                </div>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg}>
                                <span className={styles.left_section_top_right_item_left_span}>E-mail:</span>
                                <input  style={{marginLeft: "14px"}} placeholder="Email:" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.left_section_btn_item_input_top}/>
                                <span className={styles.left_section_top_right_item_right_span} style={{
                                    color: user.email !== email ? "white" : "#8C8D96"
                                }} onClick={() => setData("email", email)}>{t("Apply")}</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span
                                        className={styles.left_section_top_right_item_left_span}>{t("Telephone")}</span>
                                    <input placeholder="Phone:" type="text" value={phone}
                                           onChange={(e) => setPhone(e.target.value)}
                                           className={styles.left_section_btn_item_input_top}/>
                                    <span className={styles.left_section_top_right_item_right_span} style={{
                                        color: user.phone !== phone ? "white" : "#8C8D96"
                                    }} onClick={() => setData("phone", phone)}>{t("Apply")}</span>
                                </div>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg}>
                                <span className={styles.left_section_top_right_item_left_span}>{t("Telephone")}</span>
                                <input placeholder="Phone:" type="text" value={phone}
                                       onChange={(e) => setPhone(e.target.value)}
                                       className={styles.left_section_btn_item_input_top}/>
                                <span className={styles.left_section_top_right_item_right_span} style={{
                                    color: user.phone !== phone ? "white" : "#8C8D96"
                                }} onClick={() => setData("phone", phone)}>{t("Apply")}</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span className={styles.left_section_top_right_item_left_span}>Telegram:</span>
                                </div>
                                <span className={styles.left_section_top_right_item_span_orange}>{user.telegramEnable ? `@${user.telegramAddress}` : ""}</span>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg_btn}>
                                <span className={styles.left_section_top_right_item_left_span}>Telegram:</span>
                                <span className={styles.left_section_top_right_item_span_orange}>{user.telegramEnable ? `@${user.telegramAddress}` : ""}</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                        </div>
                    </div>
                </div>
                <div className={styles.left_section_btn_wrap}>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>Trade link:</span>
                        <input value={tradeUrl} type="text" className={styles.left_section_btn_item_input}
                               placeholder="Trade link:" onChange={(e) => setTradeUrl(e.target.value)}/>
                        <a href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
                           target="_blank">
                            <span className={styles.left_section_btn_item_right_span}>{t("Get the link")}</span>
                        </a>
                        {user.steamTradeUrl !== tradeUrl  ?
                            <span className={styles.left_section_btn_item_right_span_grey} style={{
                                color: user.steamTradeUrl !== tradeUrl ? "white" : "#8C8D96"
                            }} onClick={() => setData("trade link", tradeUrl)}>{t("Apply")}</span> : null}
                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>API KEY:</span>
                        <input value={apikey} type="text" className={styles.left_section_btn_item_input_two} placeholder="API-KEY:" onChange={(e) => setApikey(e.target.value)}/>
                        <a href="https://steamcommunity.com/dev/apikey" target="_blank">
                            <span className={styles.left_section_btn_item_right_span}>{t("Get the key")}</span>
                        </a>
                        {user.steamApiKey !== apikey ?
                            <span className={styles.left_section_btn_item_right_two_span_grey} style={{
                                color: user.steamApiKey !== apikey ? "white" : "#8C8D96"}} onClick={() => setData("API KEY", apikey)}>{t("Apply")}</span>: null}

                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>Steam ID64:</span>
                        <span className={styles.left_section_btn_item_right_span_orange}>{user.steam.steamid}</span>
                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                </div>
            </section>
            {user.telegramEnable ?
                <section className={styles.right_section_wrap}>
                    <p className={styles.right_section_p}>{t("Alerts will be sent")}</p>
                    <div className={styles.right_section_no_auth_top_wrap}>
                        <img
                            src={user.telegramAvatar ? `data:image/jpeg;base64,${user.telegramAvatar}` : `https://avatars.steamstatic.com/${user.steam.avatarhash}_full.jpg`}
                            alt="user" className={styles.left_section_top_left_img}/>
                        <div className={styles.right_section_no_auth_top_right_wrap}>
                            <p>{user.telegramName}</p>
                            <p>@{user.telegramAddress}</p>
                        </div>
                    </div>
                    <div className={styles.right_section_no_auth_btn_untie_wrap_wrap}>
                        <button className={styles.right_section_no_auth_btn_untie_wrap} onClick={delTelegram}>
                            <span>{t("Unlink account")}</span>
                        </button>
                    </div>
                </section> :
                <section className={styles.right_section_wrap}>
                    <p className={styles.right_section_p}>{t("To enable alerts")}</p>
                    <a href={`https://t.me/tf2key_notification_bot?start=${user.telegramCodeActivate}`}
                       className={styles.right_section_span} target="_blank">
                        @tf2key_notification_bot
                    </a>
                    <span className={styles.right_section_btn_text_gray}>{t("Your authorization code")}</span>
                    <div className={styles.right_section_btn_wrap}>
                        <p className={styles.right_section_btn_text_orange}>{user.telegramCodeActivate}</p>
                        <Image
                            onClick={copyCode}
                            src={copy}
                            alt="Copy"
                            width={22}
                            height={22}
                            className={styles.right_section_btn_img}
                        />
                    </div>
                    <div className={styles.right_section_no_auth_btn_untie_wrap_wrap}>
                        <div className={styles.right_section_auth_btn_untie_wrap}>
                            <a href={`https://t.me/tf2key_notification_bot?start=${user.telegramCodeActivate}`} target="_blank">{t("Link account")}</a>
                        </div>
                    </div>
                </section>}
        </article>
    )
}

