import { FC } from "react";
import styles from "@/styles/main/crypto.module.css"
import Image from "next/image";


export const Crypto: FC = () => {
    return (
        <section>
            <div className={styles.crypto_part}>
                <ul className={styles.crypto_part_items}>
                    <li>
                        <Image
                            src="/cards.svg"
                            width={77}
                            height={70}
                            alt="Cards"
                            className={styles.crypto_part_item_iconCards}
                        />
                    </li>
                    <li className={styles.crypto_part_item}>
                        <Image
                            src="/qiwi.svg"
                            width={35}
                            height={34}
                            alt="Qiwi"
                            className={styles.crypto_part_item_iconQIWI}
                        />
                        <span className={styles.crypto_part_item_text}>QIWI</span>
                    </li>
                    <li className={styles.crypto_part_item}>
                        <Image
                            src="/etherium.svg"
                            width={35}
                            height={34}
                            alt="Etherium"
                            className={styles.crypto_part_item_iconETH}
                        />
                        <span className={styles.crypto_part_item_text}>Etherium</span>
                    </li>
                    <li className={styles.crypto_part_item}>
                        <Image
                            src="/usdt.svg"
                            width={35}
                            height={34}
                            alt="USDT"
                            className={styles.crypto_part_item_iconUSDT}
                        />
                        <span className={styles.crypto_part_item_text}>USDT</span>
                    </li>
                    <li className={styles.crypto_part_item}>
                        <Image
                            src="/bitcoin.svg"
                            width={35}
                            height={34}
                            alt="BTC"
                            className={styles.crypto_part_item_iconBTC}
                        />
                        <span className={styles.crypto_part_item_text}>BTC</span>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Crypto;
