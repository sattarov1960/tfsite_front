"use client"

import {FC} from "react";
import Login from "@/layout/components/header/mobile/login";
import styles from "@/styles/header/mobile/sidebar/sidebar.module.css";
import Image from "next/image";
import Navigate from "@/layout/components/header/desktop/navigate";
import User from "@/layout/components/header/desktop/user";
import Balance from "@/layout/components/header/desktop/balance";
import {useStoreUser} from "@/store/user";


const Sidebar: FC = () => {
    const store = useStoreUser()
    if (store.menu){
        if (store.auth){
            return (
                <section className={styles.sidebar}>
                    <Image
                        src="/cross_sidebar.svg"
                        width={30}
                        height={30}
                        alt="Cross"
                        className={styles.sidebar_cross}
                        onClick={() => store.CloseMenu()}
                    />
                    <User/>
                    <Balance/>
                    <Navigate/>
                </section>
            )
        }
        return (
            <section className={styles.sidebar}>
                <Image
                    src="/cross_sidebar.svg"
                    width={30}
                    height={30}
                    alt="Cross"
                    className={styles.sidebar_cross}
                    onClick={() => store.CloseMenu()}
                />
                <Login/>
                <Navigate/>
            </section>
        )
    }
}

export default Sidebar