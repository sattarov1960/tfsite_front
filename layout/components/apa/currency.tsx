"use client"

import {FC, useEffect, useState} from "react";
import { Listbox } from '@headlessui/react'
import styles from "@/styles/apa/currency.module.css"
import Image from 'next/image'
import {CurrencyI} from "@/interface/currency";
import {useStoreCurrency} from "@/store/user";

const currency: CurrencyListI = [
    { id: 1, name: 'RUB', code: "₽"},
    { id: 2, name: 'USD', code: "$"},
]
export const Currency:FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0])
    const store_currency = useStoreCurrency()

    useEffect(() => {
        store_currency.setCurrency(selectedCurrency.name)
    }, [selectedCurrency])

    return (
        <Listbox value={store_currency.currency} // @ts-ignore
         onChange={setSelectedCurrency}>
            <div className={styles.popUp_currency_wrap}>
                <Listbox.Button>
                    <div className={styles.popUp_currency}>
                        <div className={styles.popUp_currency_frstItem}>
                            <span className={styles.popUp_currency_frstItem_textMark}>{selectedCurrency.code}</span>
                            <span className={styles.popUp_currency_frstItem_text}>{selectedCurrency.name}</span>
                            <Image
                                src="/arrow.svg"
                                width={8}
                                height={4}
                                alt="Arrow"
                                className={styles.arrow}
                            />
                        </div>
                    </div>
                </Listbox.Button>
                <Listbox.Options>
                    <div className={styles.popUp_currency_items}>
                        {currency.map((item) => (
                            <Listbox.Option
                                key={item.id}
                                value={item}>
                                <div className={`${styles.popUp_currency_item} ${styles.group}`}>
                                    <span className={styles.popUp_currency_frstItem_textGray}>{item.code}</span>
                                    <span className={`${styles.popUp_currency_frstItem_textGray} ${styles.popUp_currency_frstItem_textGray_block_left}`}>{item.name}</span>
                                </div>
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default Currency;
