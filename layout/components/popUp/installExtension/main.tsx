"use client"

import axios from 'axios';
import styles from "@/styles/popUp/installExtension/main.module.css";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {useStoreInstallExtension} from "@/store/user";
import Link from "next/link";

export const Main = () => {
    const t = useTranslations()
    const store = useStoreInstallExtension()

    const downloadFile = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await axios.get(process.env.api as string, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tf2key_p2p.rar'); // Используйте нужное расширение файла
        document.body.appendChild(link);
        link.click();
    }

    return (
        <form className={styles.popup_wrap} onSubmit={downloadFile}>
            <Image
                src="/popUp_cross.svg"
                width={40}
                height={40}
                alt="Cross"
                className={styles.cross}
                onClick={() => store.Close()}
            />
            <Image width={64} height={64} className={styles.popup_info_icon} src="/info.svg" alt="info"/>
            <h1 className={styles.popup_header}>{t("You do not have the extension installed")}</h1>
            <h2 className={styles.popup_desc_text}>{t("For the exchange to work correctly, you need to install the extension")}</h2>
            <input type="submit" className={styles.popup_desc_btn}>
                <span className={styles.popup_desc_btn_text}>{t("Download extension")}</span>
            </input>
            <p className={styles.popup_desc_text_gray}>{t("Installation instructions:")}</p>
            <div className={styles.popup_wrap_text}>
                <Link href="/" className={styles.popup_wrap_text_text}>{t("Text instructions")}</Link>
                <Link href="/" className={styles.popup_wrap_text_text}>{t("Video instruction")}</Link>
            </div>
        </form>
    )
}