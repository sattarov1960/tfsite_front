import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/apa/language.module.css"
import {useTranslations} from "next-intl";


export const Language: FC = () => {
    const t = useTranslations()
    return (
        <div className={styles.popUp_currency}>
            <div className={styles.popUp_currency_frstItem}>
                <span className={styles.popUp_currency_frstItem_textMark}>₽</span>
                <span className={styles.popUp_currency_frstItem_text}>RUB</span>
                <Image
                    src="/arrow.svg"
                    width={8}
                    height={4}
                    alt="Arrow"
                    className={styles.arrow}
                />
            </div>
            <div className={styles.popUp_currency_item}>
                <span className={styles.popUp_currency_frstItem_textGrayMark}>₽</span>
                <span className={styles.popUp_currency_frstItem_textGray}>RUB</span>
            </div>
            <div className={styles.popUp_currency_nextItem}>
                <span className={styles.popUp_currency_frstItem_textGrayMark}>$</span>
                <span className={`${styles.popUp_currency_frstItem_textGray} ${styles.popUp_currency_frstItem_textGrayUSD}`}>USD</span>
            </div>
        </div>
    )
}

export default Language;