import { FC } from "react";
import styles from "@/styles/mainNotFound/MainNotFound.module.css"
import Image from "next/image";
import {useTranslations} from "next-intl";
import Link from "next/link";


export const MainNotFound: FC = () => {
    const t = useTranslations()
    return (
        <section>
            <main>
                <section>
                    <div className={styles.error}>
                        <div>
                            <h1 className={styles.error_leftBlock_mainLargeText}>
                                {t("Oh")}<br/>
                                <h2 className={styles.error_leftBlock_mainText}>{t("Page not found")}</h2>
                            </h1>
                            <hr className={styles.error_leftBlock_line}/>
                                <span className={styles.error_leftBlock_subText}>{t("Try returning to the main page")}</span>
                                <Link href={`${process.env.current}/`}>
                                    <button className={styles.error_leftBlock_button}>
                                        {t("return to the main page")}
                                    </button>
                                </Link>
                        </div>
                        <div className={styles.error_rightBlock}>
                            <Image
                                src="/error.png"
                                width={682}
                                height={581}
                                alt="error"
                                className={styles.error_image}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </section>
    )
}

export default MainNotFound;
