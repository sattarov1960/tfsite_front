"use client";

import {FC, useEffect} from "react";
import styles from "@/styles/transactions/main.module.css"
import {useTranslations} from "next-intl";
import Image from "next/image";
import {TransactionI, TransactionItemsI} from "@/interface/transactions";
import {useStoreTransactions, useStoreUser} from "@/store/user";
import axios from "axios";


export const DesktopItem: FC<TransactionI> = ({id, data, status, symbol, type, platform, amount}) => {
    let date = new Date(data * 1000);
    let dateString = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    const t = useTranslations()
    let style;
    if (status === "create"){
        style = styles.transactions_mainBlock_item_textGreen
    }
    else if (status === "rejected") {
        style = styles.transactions_mainBlock_item_textRed
    }
    else if (status === "processing") {
        style = styles.transactions_mainBlock_item_textGray
    }
    return (
        <div className={styles.transactions_mainBlock_item}>
            <span className={styles.transactions_mainBlock_item_text}>{"pay in" === type ? "Пополнение" : "Вывод"}</span>
            <span className={styles.transactions_mainBlock_item_text}>{id}</span>
            <span className={`${styles.transactions_mainBlock_item_text} ${style}`}>{t(status)}</span>
            <span className={`${styles.transactions_mainBlock_item_text} ${styles.transactions_mainBlock_item_textBold}`}>{amount} {symbol}</span>
            <span className={styles.transactions_mainBlock_item_text}>{dateString}</span>
        </div>
    )
}

export const DesktopItems: FC<TransactionItemsI> = ({items}) => {
    return (
        <div className={styles.transactions_mainBlock_items}>
            {items.map((el) =>
                <DesktopItem
                    status={el.status}
                    data={el.data}
                    type={el.type}
                    amount={el.amount}
                    id={el.id}
                    platform={el.platform}
                    symbol={el.symbol}
                    key={el.id}
                />)}
        </div>
    )
}
export const MobileItem: FC<TransactionI> = ({id, data, status, symbol, amount, type, platform}) => {
    let date = new Date(data * 1000);
    let dateString = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    const t = useTranslations()
    let style;
    if (status === "create"){
        style = styles.transactions_mainBlock_item_mobile_textGreen
    }
    else if (status === "rejected") {
        style = styles.transactions_mainBlock_item_mobile_textRed
    }
    else if (status === "processing") {
        style = styles.transactions_mainBlock_item_mobile_textGray
    }
    return (
        <div className={styles.transactions_mainBlock_item_mobile}>
            <div>
                <span className={styles.transactions_mainBlock_item_mobile_text}>{"pay in" === type ? "Пополнение" : "Вывод"}</span>
                <span
                    className={`${styles.transactions_mainBlock_item_mobile_text}  ${style} ${styles.transactions_mainBlock_item_mobile_scndText}`}>{t(status)}</span>
                <span className={`${styles.transactions_mainBlock_item_mobile_text} ${styles.transactions_mainBlock_item_mobile_thrdText}`}>{dateString}</span>
            </div>
            <div className={styles.transactions_mainBlock_item_mobile_rightBlock}>
                <span className={styles.transactions_mainBlock_item_mobile_text}>{id}</span>
                <span
                    className={`${styles.transactions_mainBlock_item_mobile_text} ${styles.transactions_mainBlock_item_mobile_textBold} ${styles.transactions_mainBlock_item_mobile_lastText}`}>{amount} {symbol}</span>
            </div>
        </div>
    )
}

export const MobileItems: FC<TransactionItemsI> = ({items}) => {
    return (
        <div className={styles.transactions_mainBlock_items_mobile}>
            {items.map((el) =>
                <MobileItem
                    status={el.status}
                    data={el.data}
                    type={el.type}
                    amount={el.amount}
                    id={el.id}
                    platform={el.platform}
                    symbol={el.symbol}
                    key={el.id}
                />
            )}

        </div>
    )
}

export const Transactions: FC = () => {
    const t = useTranslations()
    const transactions_store = useStoreTransactions()
    const user_store = useStoreUser()
    if (!user_store.auth){
        return
    }
    const updateStart = async () => {
        const response = await axios.get(`${process.env.api}/transactions?start=${transactions_store.start}&offset=20`, { withCredentials: true });
        const data = response.data
        if (data.status) {
            transactions_store.setTransactions(data.transactions)
            transactions_store.setViewTransactions(data.transactions)
            transactions_store.setAmount(data.amount)
        }
        else {
            alert("Ошибка загрузки данных")
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        updateStart()
    }, [transactions_store.start])


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (transactions_store.filter !== ""){
            let viewTransactions = []
            for (let el of transactions_store.transactions){
                if (el.id.includes(transactions_store.filter)){
                    viewTransactions.push(el)
                }
            }
            transactions_store.setViewTransactions(viewTransactions)
        }
        else{
            transactions_store.setViewTransactions(transactions_store.transactions)
        }
    }, [transactions_store.filter])
    return (
        <main>
            <section>
                <div className={styles.transactions}>
                    <div className={styles.transactions_mainBlock}>
                        <div className={styles.transactions_mainBlock_inputBlock}>
                            <Image
                                src="/icon_search.svg"
                                width={30}
                                height={30}
                                alt="magnifying glass"
                                className={styles.search}
                            />
                            <input
                                type="text"
                                className={styles.transactions_mainBlock_input}
                                placeholder={t("Search by ID")}
                                value={transactions_store.filter}
                                onChange={(e) => transactions_store.setFilter(e.target.value)}
                            />
                        </div>
                        <ul className={styles.transactions_mainBlock_header}>
                            <li className={styles.transactions_mainBlock_header_item}>{t("TYPE")}</li>
                            <li className={`${styles.transactions_mainBlock_header_item} ${styles.transactions_mainBlock_header_scndItem}`}>{t("Transaction ID")}</li>
                            <li className={styles.transactions_mainBlock_header_item}>{t("Status")}</li>
                            <li className={styles.transactions_mainBlock_header_item}>{t("Amount")}</li>
                            <li className={styles.transactions_mainBlock_header_item}>{t("Time and Date")}</li>
                        </ul>
                        <div className={styles.transactions_mainBlock_header_mobile}>
                            <div>
                                <span
                                    className={styles.transactions_mainBlock_header_item_mobile}>{t("TYPE")}</span>
                                <span
                                    className={styles.transactions_mainBlock_header_item_mobile}>{t("Status")}</span>
                                <span
                                    className={styles.transactions_mainBlock_header_item_mobile}>{t("Time and Date")}</span>
                            </div>
                            <div className={styles.transactions_mainBlock_header_mobile_rightBlock}>
                                <span
                                    className={`${styles.transactions_mainBlock_header_item_mobile} ${styles.transactions_mainBlock_header_frthItem_mobile}`}>{t("Transaction ID")}</span>
                                <span
                                    className={`${styles.transactions_mainBlock_header_item_mobile} ${styles.transactions_mainBlock_header_lastItem_mobile}`}>{t("Amount")}</span>
                            </div>
                        </div>
                        <DesktopItems items={transactions_store.viewTransactions}/>
                        <MobileItems items={transactions_store.viewTransactions}/>
                        {transactions_store.viewTransactions.length ? null : <div className={styles.transactions_mainBlock_smile}>
                            <Image
                                src="/smile.png"
                                width={112}
                                height={87}
                                alt="smile"
                                className={styles.smile}
                            />
                            <span className={styles.transactions_mainBlock_smile_text}>{t("Nothing found!")}<br/>{t("Please try again")}</span>
                        </div>}
                        {transactions_store.viewTransactions.length && transactions_store.amount > 20 ? <div className={styles.transactions_mainBlock_pagination}>
                            <ul className={styles.transactions_mainBlock_pagination_items}>
                                <li className={`${styles.transactions_mainBlock_pagination_item} ${styles.transactions_mainBlock_pagination_frstItemIcon}`}>
                                    {transactions_store.start - 20 >= 0 ?
                                        <Image
                                            src="/icon_arrowWhite.svg"
                                            width={28}
                                            height={28}
                                            alt="arrow"
                                            className={styles.arrrowGray_left}
                                            onClick={() => transactions_store.setStart(transactions_store.start - 20)}
                                        /> :
                                       <Image
                                            src="/icon_arrowGray.svg"
                                            width={28}
                                            height={28}
                                            alt="arrow"
                                            className={styles.arrrowGray}
                                        />
                                    }
                                </li>
                                <li className={`${styles.transactions_mainBlock_pagination_item} ${styles.transactions_mainBlock_pagination_frstItem}`} onClick={() => transactions_store.setStart(0)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 0 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>1</span>
                                </li>
                                <li className={styles.transactions_mainBlock_pagination_item} onClick={() => transactions_store.setStart(20)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 20 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>2</span>
                                </li>
                                <li className={styles.transactions_mainBlock_pagination_item} onClick={() => transactions_store.setStart(40)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 40 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>3</span>
                                </li>
                                <li className={styles.transactions_mainBlock_pagination_item} onClick={() => transactions_store.setStart(60)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 60 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>4</span>
                                </li>
                                <li className={styles.transactions_mainBlock_pagination_item} onClick={() => transactions_store.setStart(80)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 80 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>5</span>
                                </li>
                                <li className={styles.transactions_mainBlock_pagination_item} onClick={() => transactions_store.setStart(100)}>
                                    <span className={`${styles.transactions_mainBlock_pagination_item_text} ${transactions_store.start === 100 ? styles.transactions_mainBlock_pagination_item_textWhite : null}`}>6</span>
                                </li>
                                <li className={`${styles.transactions_mainBlock_pagination_item} ${styles.transactions_mainBlock_pagination_lastItemIcon}`}>
                                    {transactions_store.start + 20 <= 100 ?
                                        <Image
                                            src="/icon_arrowWhite.svg"
                                            width={28}
                                            height={28}
                                            alt="arrow"
                                            className={styles.arrrowWhite}
                                            onClick={() => transactions_store.setStart(transactions_store.start + 20)}
                                        /> :
                                        <Image
                                            src="/icon_arrowGray.svg"
                                            width={28}
                                            height={28}
                                            alt="arrow"
                                            className={styles.arrrowGray_right}
                                        />
                                    }
                                </li>
                            </ul>
                        </div> : null}
                    </div>
                </div>
            </section>
        </main>
    )
}