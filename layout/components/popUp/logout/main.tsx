import {FC} from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/popUp/logout/main.module.css"
import Image from "next/image";
import { useStoreLogout } from "@/store/user";
import Link from "next/link";

export const Main: FC = () => {
    const t = useTranslations()
    const store = useStoreLogout()
    return (
        <div className={styles.popUp_logoutConfirmation}>
            <Image
                src="/popUp_cross.svg"
                width={40}
                height={40}
                alt="Cross"
                className={styles.popUp_logoutConfirmation_cross}
                onClick={() => store.Close()}
            />
            <h1 className={styles.popUp_logoutConfirmation_mainText}>{t("Are you sure you want to log out?")}</h1>
            <Link href={`${process.env.api}/logout`}>
                <button className={styles.popUp_logoutConfirmation_button}>
                    <span>{t("Logout")}</span>
                </button>
            </Link>
        </div>
    )
}