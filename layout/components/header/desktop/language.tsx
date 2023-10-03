'use client';

import {FC, useState} from "react";
import { Listbox } from '@headlessui/react'
import { useLocale } from "next-intl";
import styles from "@/styles/header/desktop/language.module.css"
import Image from 'next/image'
import {useStoreUser} from "@/store/user";
import Link from 'next/link'

const language:LanguageListI = [
    { id: 1, name: 'ru', imgPath: "/russian_flag.svg"},
    { id: 2, name: 'en', imgPath: "/english_flag.svg"},
    { id: 3, name: 'blr', imgPath: "/belarusian_flag.svg"},
    { id: 4, name: 'ua', imgPath: "/ukrainian_flag.svg"},
]


const Language: FC = () => {
    const store = useStoreUser()
    const locale = useLocale()
    const active = language.filter((value: { id: number, name: string }) => value.name === locale)
    const listCurrency = [active[0], ...language.filter((value: { id: number, name: string }) => value.name !== locale)]
    const [selectedCurrency, setSelectedCurrency] = useState(active[0])
    return (
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
            <div className={store.auth ? styles.menu_wrap_auth : styles.menu_wrap}>
                <Listbox.Button>
                    <div className={styles.menu_language}>
                        <Image
                            src={selectedCurrency.imgPath}
                            width={16}
                            height={16}
                            alt="Flag"
                            className={styles.menu_language_iconFlag}
                        />
                        <span className={styles.menu_language_text_active}>{selectedCurrency.name}</span>
                        <Image
                            src="/menu_bottom_arrow.svg"
                            width={8}
                            height={4}
                            alt="Arrow"
                            className={styles.menu_language_iconArrow}
                        />
                    </div>
                </Listbox.Button>
                <Listbox.Options className={styles.menu_options}>
                    <div className={styles.wrap_language}>
                    {listCurrency.map((item) => (
                            <Listbox.Option key={item.id} value={item}>
                                {({ active, selected }) => (
                                    <div className={styles.menu_language_item}>
                                        <Image
                                            src={item.imgPath}
                                            width={8}
                                            height={4}
                                            alt="Flag"
                                            className={styles.menu_language_iconFlag}
                                        />
                                        <Link href={`${process.env.current}/${item.name}`}>
                                            <span className={selected ? styles.menu_language_text_active : styles.menu_language_text}>{item.name}</span>
                                        </Link>
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default Language