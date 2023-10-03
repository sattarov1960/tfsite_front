'use client';

import {FC, useState} from "react";
import { Listbox } from '@headlessui/react'
import { useLocale } from "next-intl";
import {usePathname, useRouter} from 'next-intl/client';
import styles from "@/styles/header/language.module.css"
import Image from 'next/image'

const currency:LanguageListI = [
    { id: 1, name: 'ru', imgPath: "/russian_flag.svg"},
    { id: 2, name: 'en', imgPath: "/english_flag.svg"},
    { id: 3, name: 'blr', imgPath: "/belarusian_flag.svg"},
    { id: 4, name: 'ua', imgPath: "/ukrainian_flag.svg"},
]


const Language: FC = () => {
    const locale = useLocale()
    const active = currency.filter((value: { id: number, name: string }) => value.name === locale)
    const listCurrency = [active[0], ...currency.filter((value: { id: number, name: string }) => value.name !== locale)]
    const [selectedCurrency, setSelectedCurrency] = useState(active[0])
    const router = useRouter()
    const pathName = usePathname()
    return (
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
            <div className={styles.menu_wrap}>
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
                    {listCurrency.map((item) => (
                        <Listbox.Option key={item.id} value={item} onClick={() => router.replace(pathName, {locale: item.name})}>
                            {({ active, selected }) => (
                                <div className={styles.menu_language_item}>
                                    <Image
                                        src={item.imgPath}
                                        width={16}
                                        height={16}
                                        alt="Flag"
                                        className={styles.menu_language_iconFlag}
                                    />
                                    <span className={selected ? styles.menu_language_text_active : styles.menu_language_text}>{item.name}</span>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}

export default Language