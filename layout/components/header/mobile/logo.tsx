import { FC } from "react";
import styles from "@/styles/header/desktop/logo.module.css"
import Image from "next/image";


export const HeaderLogo: FC = () => {
    return (
        <div className={styles.logo}>
            <Image
                src="/logo.svg"
                width={218}
                height={98}
                alt="Home"
                className={styles.menu_item_icon}
            />
        </div>
    )
}

export default HeaderLogo;
