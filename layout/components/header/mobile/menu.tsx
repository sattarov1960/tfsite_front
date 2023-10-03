"use client"

import { FC } from "react";
import styles from "@/styles/header/mobile/menu.module.css"
import Image from "next/image";
import {useStoreUser} from "@/store/user";


export const MenuM: FC = () => {
    const store = useStoreUser()
    return (
        <div onClick={() => store.OpenMenu()}>
            <Image
                src="/burger_menu.svg"
                width={22}
                height={15}
                alt="Menu"
                className={styles.sub_header_mobile_burgerMenu}

            />
        </div>
)
}

export default MenuM;
