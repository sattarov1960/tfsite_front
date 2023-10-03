'use client';

import {FC} from "react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from 'next/link'
import styles from "@/styles/footer/privacy_policy.module.css"
import Image from "next/image";


const Privacy: FC = () => {
    const t = useTranslations()
    const pathname = usePathname()
    return (
        <div className={styles.sub_footer_privacy_policy}>
            <div className={styles.sub_footer_privacy_policy_frstBlock}>
                <span className={styles.sub_footer_privacy_policy_textGray}>Аккаунт поддержки пользователей:</span>
                <p className={styles.sub_footer_privacy_policy_textWhite}>@MannCoSupplyCrateKey</p>
            </div>
            <div className={styles.sub_footer_privacy_policy_scndBlock}>
                <span className={styles.sub_footer_privacy_policy_textGray}>Политики и соглашение:</span>
                <p className={styles.sub_footer_privacy_policy_textWhite}>tf2key.ru/politics</p>
            </div>
            <Image
                src="/btn_arrow_footer.svg"
                width={50}
                height={50}
                alt="Up"
                className={styles.sub_footer_privacy_policy_btn}
            />
        </div>
    )
}

export default Privacy