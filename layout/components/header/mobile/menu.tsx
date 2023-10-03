import { FC } from "react";
import styles from "@/styles/header/mobile/logo.module.css"
import Image from "next/image";


export const HeaderLogoM: FC = () => {
    return (
        <div className={styles.logo}>
        <Image
            src="/logo.svg"
    width={218}
    height={98}
    alt="Home"
    className={styles.logo}
    />
    </div>
)
}

export default HeaderLogoM;
