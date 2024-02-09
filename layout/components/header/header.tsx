"use client"
import { FC } from "react";
import styles from "@/styles/header/header.module.css"

import Navigate from "@/layout/components/header/desktop/navigate";
import Language from "@/layout/components/header/desktop/language";
import HeaderLogo from "@/layout/components/header/desktop/logo";
import Balance from "@/layout/components/header/desktop/balance";
import User from "@/layout/components/header/desktop/user";
import Login from "@/layout/components/header/desktop/login";
import HeaderLogoM from "@/layout/components/header/mobile/logo";
import MenuM from "@/layout/components/header/mobile/menu";
import UserM from "@/layout/components/header/mobile/user";
import {useStoreUser} from "@/store/user";
import Sidebar from "@/layout/components/header/mobile/sidebar/sidebar";


export const Header: FC = () => {
    const user = useStoreUser()
    if (user.auth){
        return (
            <>
                <section className={styles.sub_header} id="header">
                    <div className={styles.sub_header_item}>
                        <HeaderLogo/>
                        <Navigate />
                        <Language/>
                    </div>
                    <div className={styles.sub_header_item}>
                        <Balance/>
                        <User/>
                    </div>
                </section>
                <section className={styles.sub_header_mobile}>
                    <div className={styles.sub_header_mobile_leftBlock}>
                        <MenuM/>
                        <HeaderLogoM width={73} height={47}/>
                        <Language/>
                    </div>
                    <div>
                        <UserM/>
                    </div>
                </section>
                <Sidebar/>
            </>
        )
    }
    else {
        return (
            <>
                <section className={styles.sub_header}>
                    <div className={styles.sub_header_item}>
                        <HeaderLogo/>
                        <Navigate />
                        <Language/>
                    </div>
                    <Login/>
                </section>
                <section className={styles.sub_header_mobile}>
                    <div className={styles.sub_header_mobile_leftBlock}>
                        <MenuM/>
                        <HeaderLogoM width={112} height={72}/>
                    </div>
                    <div>
                        <Language/>
                    </div>
                </section>
                <Sidebar/>
            </>
        )
    }
}
export default Header;
