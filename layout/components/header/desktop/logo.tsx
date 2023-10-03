import { FC } from "react";
import styles from "@/styles/header/desktop/logo.module.css"
import Image from "next/image";
import Link from "next/link";


export const HeaderLogo: FC = () => {
    return (
        <div className={styles.logo}>
            <Link href={`${process.env.current}/`}>
                <Image
                    src="/logo.svg"
                    width={218}
                    height={98}
                    alt="Home"
                    className={styles.menu_item_icon}
                />
            </Link>
        </div>
    )
}

export default HeaderLogo;
