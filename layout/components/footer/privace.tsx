"use client"
import {FC, useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/footer/privacy_policy.module.css"
import Image from "next/image";
import Link from "next/link";


const Privacy: FC = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const ws_url = process.env.ws as string;
        const ws = new WebSocket(ws_url);


        ws.addEventListener("open", () => {
            console.log("WebSocket connection opened");
        });

        ws.addEventListener("message", (event) => {
            let message = event.data
            if (message === "ping"){
                ws.send("pong")
                return
            }
            try{
                let full_data = JSON.parse(message) as { command: string, data: { count?: number } };
                if (full_data.command === "count active users" && full_data.data) {
                    setCount(full_data.data.count);
                }
            }
            catch (e) {
                console.log(`Error Accept WS Message: ${e}`);
            }
        });
        return () => {
            ws.close();
        };
    }, []);

    const t = useTranslations()
    return (
        <div className={styles.sub_footer_privacy_policy}>
            <div className={styles.sub_footer_privacy_policy_frstBlock}>
                <span className={styles.sub_footer_privacy_policy_textGray}>{t("User support account:")}</span>
                <Link className={styles.sub_footer_privacy_policy_textWhite} href="https://t.me/MannCoSupplyCrateKey">@MannCoSupplyCrateKey</Link>
            </div>
            <div className={styles.sub_footer_privacy_policy_scndBlock}>
                <span className={styles.sub_footer_privacy_policy_textGray}>{t("Policies and Agreement:")}</span>
                <Link className={styles.sub_footer_privacy_policy_textWhite} href="/privacy">tf2key.ru/privacy</Link>
            </div>
            {count !== 0 ? <div className={styles.sub_footer_privacy_policy_scndBlock}>
                    <span className={styles.sub_footer_privacy_policy_textGray}>Количество пользователей на сайте: </span>
                    <span className={styles.sub_footer_privacy_policy_textWhite}>{count}</span>
                </div> : null}
            <Link href="/#header">
                <Image
                    src="/btn_arrow_footer.svg"
                    width={50}
                    height={50}
                    alt="Up"
                    className={styles.sub_footer_privacy_policy_btn}
                />
            </Link>
        </div>
    )
}

export default Privacy