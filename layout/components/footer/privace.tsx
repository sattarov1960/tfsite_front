import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/footer/privacy_policy.module.css"
import Image from "next/image";
import Link from "next/link";


const Privacy: FC = () => {
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