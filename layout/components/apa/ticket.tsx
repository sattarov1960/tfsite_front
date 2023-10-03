import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/apa/key.module.css"
import {useTranslations} from "next-intl";


export const Key: FC = () => {
    const t = useTranslations()
    return (
        <div className={styles.ticketsKeys_sub_part}>
        <h2 className={styles.ticketsKeys_block_mainText}>{t("Mann Co Crate Key")}</h2>
    <p className={styles.ticketsKeys_block_subText}>(Mann Co Supply Crate Key)</p>
    <div className={styles.ticketsKeys_block_currency}>
    <span className={styles.ticketsKeys_block_currency_text}>{t("Choose currency:")}</span>
    <div className={styles.ticketsKeys_block_currency_change}>
    <span className={styles.ticketsKeys_block_currency_change_text}>₽ RUB</span>
    <Image
    src="/arrow_for_blockChange.svg"
    width={14}
    height={6}
    alt="Arrow"
    className={styles.ticketsKeys_block_currency_change_icon}
    />
    </div>
    </div>
    <div className={styles.ticketsKeys_part_swap}>
    <div>
        <div className={styles.ticketsKeys_part_swap_sub_block}>
    <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>150 ₽</p>
    <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
    </div>
    <button id="buy-sell" className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`}>{t("BUY")}</button>
    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
    <span className={styles.ticketsKeys_part_swap_sub_block_subText}>
        {t("We can sell:")}
    <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>2999</span>
        </span>
        </div>
        </div>
        <Image
    src="/key.png"
    width={260}
    height={260}
    alt="Keys"
    className="key"
    />
    <div className={styles.ticketsKeys_part_swap_block}>
    <div className={styles.ticketsKeys_part_swap_sub_block}>
    <p className={styles.ticketsKeys_part_swap_sub_block_mainText}>150 ₽</p>
    <span className={styles.ticketsKeys_part_swap_sub_block_subText}>{t("(pcs)")}</span>
    </div>
    <button className={`${styles.ticketsKeys_part_swap_button} ${styles.ticketsKeys_part_swap_button_active}`}>{t("SELL")}</button>
    <div className={styles.ticketsKeys_part_swap_sub_blockBottom}>
    <span className={styles.ticketsKeys_part_swap_sub_block_subText_underButton}>
        {t("We can sell:")}
    <span className={styles.ticketsKeys_part_swap_sub_block_subTextWhite}>2999</span>
        </span>
        </div>
        </div>
        </div>
        <hr className={styles.line_between_blocks}/>
    </div>
)
}

export default Key;