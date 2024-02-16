"use client"

import { FC } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/popUp/upBalanceUSD/success_main.module.css"
import Image from "next/image";
import {useStoreUpBalanceUSD, useStoreUser} from "@/store/user";
import axios from "axios";
import {toast} from "react-toastify";

export const Success: FC = () => {
    const store = useStoreUpBalanceUSD()
    const store_user = useStoreUser()
    const t = useTranslations()
    const checkOffer = async () => {
        const response = await axios.post(`${process.env.api}/check_invoice_usdt`, {invoice_id: store.offerData.invoice_id}, {withCredentials: true});
        if (response.data.status){
            const balance = store_user.balance_usd + response.data.amount
            store_user.setUserBalanceUSD(balance)
            store.setOpenSuccess(false)
        }
        else {
            alert(response.data.msg)
        }
    }
    const cancelOrder = async () => {
        await axios.post(`${process.env.api}/error_invoice_usdt`, {invoice_id: store.offerData.invoice_id}, {withCredentials: true});
        store.setOpenSuccess(false)
    }
    function copyToClipboard(text: string) {
        if (navigator.clipboard) {
            // Use Clipboard API if it's available
            navigator.clipboard.writeText(text).then(function() {
                console.log('Copying to clipboard was successful!');
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        } else {
            let textarea = document.createElement('textarea');
            textarea.textContent = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                console.log('Copying to clipboard was successful!');
            } catch (err) {
                console.error('Could not copy text: ', err);
            } finally {
                document.body.removeChild(textarea);
            }
        }
        toast.success("Скопировал в буффер обмена", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            isLoading: false,
        });
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
                    onClick={() => store.setOpenSuccess(false)}
                />
                <hr className={styles.popUp_header_line}/>
            </div>
            <div className={styles.popUp_main}>
                <p className={styles.popUp_main_subTextWhite}>
                    {t("You can top up your balance in ")}
                    <span className={styles.popUp_main_subTextViolet}>{store.balance} USDT</span>
                    <span className={styles.popUp_main_subTextViolet_two}> 2 {t("ways:")}</span>
                </p>

                <ol className={styles.popUp_main_items}>
                    <li className={styles.popUp_main_frstItem}>
                        <div className={`${styles.popUp_main_sub_frstItem} ${styles.popUp_main_sub_frstItemSpecial}`}>
                            <span className={styles.popUp_main_item_text}>{t("Translation into our")}</span>
                            <div className={`${styles.popUp_main_sub_frstItem} ${styles.popUp_main_sub_frstItemSpecial}`}>
                                <span className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_textWhite} ${styles.popUp_main_item_textWhiteSpecial}`}>Binance ID: {store.offerData.binance_id}</span>
                                <div className={styles.popUp_main_subItem_copy} onClick={async () => copyToClipboard(store.offerData.binance_id)}>
                                    <span className={styles.popUp_main_subItem_copy_text}>{t("Copy")}</span>
                                    <Image
                                        src="/icon_copy.svg"
                                        width={18}
                                        height={18}
                                        alt="copy"
                                        className={styles.copy}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className={styles.popUp_main_nextItem}>
                        <div className={styles.popUp_main_wrap}>
                            <div className={styles.popUp_main_sub_nextItem}>
                                <div className={`${styles.popUp_main_subItem_copy} ${styles.popUp_main_subItem_copySpecial}`}>
                                    <span className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_textWhite} ${styles.popUp_main_item_textWhiteSpecial_two}`}>{store.offerData.usdt}</span>
                                    <span className={styles.popUp_main_subItem_copy_text} onClick={async () => copyToClipboard(store.offerData.usdt)}>{t("Copy")}</span>
                                    <Image
                                        src="/icon_copy.svg"
                                        width={18}
                                        height={18}
                                        alt="copy"
                                        className={styles.copy}
                                        onClick={async () => copyToClipboard(store.offerData.usdt)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.popUp_main_sub_nextItem_subTitle}>
                            <p className={styles.popUp_main_item_text}>
                                <span className={styles.popUp_main_item_text_two}>2.1. </span>
                                <span className={styles.popUp_main_item_text_one}>{t("21 You will have")}</span>
                                <span className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_textWhite} ${styles.popUp_main_item_text_three}`}>{t("15 minutes")}</span>
                                <span>{t("to send USDT")}</span>
                            </p>
                            <p className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_wrap}`}>
                                <div className={styles.popUp_main_item_wrap_text}>
                                    <span className={styles.popUp_main_item_text_two_two}>2.2.</span>
                                    <div>
                                        <span className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_textWhite} ${styles.popUp_main_item_text_three} ${styles.popUp_main_item_text_four}`}>{t("Consider COMMISSION")}</span>
                                        <span>{t("when sending cryptocurrency, the amount specified above must be credited to our wallet")}</span>
                                        <span className={`${styles.popUp_main_item_text} ${styles.popUp_main_item_textWhite} ${styles.popUp_main_item_text_three}`}>{t("exactly the same amount")}</span>
                                        <span>{t("which is mentioned above")}</span>
                                    </div>
                                </div>




                            </p>
                        </div>
                    </li>
                </ol>

                <div className={styles.popUp_main_buttons}>
                    <button className={styles.popUp_main_frstButton} onClick={async () => checkOffer()}>
                        <span className={styles.popUp_main_buttons_text}>{t("Check")}</span>
                        <Image
                            src="/checkMark_icon.svg"
                            width={18}
                            height={18}
                            alt="check mark"
                            className={styles.popUp_main_frstButton_icon}
                        />
                    </button>
                    <button className={styles.popUp_main_scndButton} onClick={async () => cancelOrder()}>
                        <span className={styles.popUp_main_buttons_text}>{t("Cancel")}</span>
                        <Image
                            src="/crossButton_icon.svg"
                            width={14}
                            height={14}
                            alt="check mark"
                            className={styles.popUp_main_scndButton_icon}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
