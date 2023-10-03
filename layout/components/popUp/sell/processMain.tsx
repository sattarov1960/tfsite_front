"use client"

import {FC, useEffect} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/sell/processMain.module.css"
import Image from "next/image";
import {useStoreProducts, useStoreSELL, useStoreUser} from "@/store/user";
import axios from "axios";
import {getCookie, setCookie} from "@/utilities/Cookies";
import Link from "next/link";
import {OfferI} from "@/interface/auth";

export const Item: FC<OfferI> = ({steamOfferId, offerId, bot, status}) => {
    return (
        <div className={`${styles.popUp_sub_main_sub_rightBlock} ${styles.popUp_sub_main_sub_frstRightBlock}`}>
    <div className={styles.popUp_sub_main_rightBlock_frstPart}>
    <Link href={`${steamOfferId}`}>
    <p className={styles.popUp_sub_main_rightBlock_frstPart_textWhite}>
        ID #{offerId} BOT #{bot}
    </p>
    </Link>
    <Image
    src="/icon_loader.svg"
    width={30}
    height={30}
    alt="Loader"
    className={styles.popUp_sub_main_rightBlock_frstPart_icon}
    />
    </div>
    <div className={styles.popUp_sub_main_rightBlock_scndPart}>
    <p className={styles.popUp_sub_main_rightBlock_scndPart_subText}> State 1:</p>
    <span className={styles.popUp_sub_main_rightBlock_scndPart_violetText}>{status ? "Трейд создан" : "Трейд не удалось создать"}</span>
        <Image
    src="/icon_loader.svg"
    width={30}
    height={30}
    alt="Loader"
    className={styles.popUp_sub_main_rightBlock_frstPart_iconMobile}
    />
    </div>
    </div>
)
}

export const Process: FC = () => {
    const t = useTranslations()
    const store = useStoreSELL()
    const store_product = useStoreProducts()

    return (
        <div className={styles.popUp_replenishmentOfTheBalance_inDollars}>
        <div className={styles.popUp_header}>
        <h2 className={styles.popUp_header_text}/*
                    // @ts-ignore */>
            {t("Sell")} - {t(store_product[store.activeItem].translate)}
    </h2>
    <hr className={styles.popUp_header_line}/>
    </div>
    <div>
    <div className={styles.popUp_sub_main}>
    <div className={styles.popUp_sub_main_leftBlock}>
    <Image
        src={store.activeItem.includes("Key") ? "/key.png" : "/ticket_trade.png"}
    width={100}
    height={100}
    alt="key"
    className={styles.item}
    />
    <div className={styles.popUp_sub_main_sub_leftBlock}>
    <p className={styles.popUp_sub_main_sub_leftBlock_mainText}/*
                            // @ts-ignore */>
        {t(store_product[store.activeItem].translate)}
    </p>
    <span className={styles.popUp_sub_main_sub_leftBlock_subText}>
        Team Fortress 2
    </span>
    <div className={styles.popUp_sub_main_sub_leftBlock_footerPart}>
    <span className={styles.popUp_sub_main_sub_leftBlock_footerPart_grayText}>{t("In quantity:")}</span>
    <p className={styles.popUp_sub_main_sub_leftBlock_footerPart_whiteText}>
        {store.amount} {t("pcs")}
    </p>
    </div>
    </div>
    </div>
    <div className={styles.popUp_sub_main_rightBlock}>
        {store.offers.map((item, index) => <Item key={index} steamOfferId={item.steamOfferId} offerId={item.offerId} bot={item.bot} status={item.status}/>)}
    </div>
    </div>
    <div className={styles.popUp_sub_main_buttons}>
    <button className={`${styles.popUp_sub_main_buttonSteam} ${styles.text_off_steam}`}>
    {t("Accept via Steam")}
    </button>
    <button className={`${styles.popUp_sub_main_buttonBrowser} ${styles.text_off_browser}`}>
    {t("Accept in browser")}
    </button>
    </div>
    </div>
    </div>
)
}
