"use client"

import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/apa/apa.module.css"
import {useTranslations} from "next-intl";
import Key from "@/layout/components/apa/key";
import Ticket from "@/layout/components/apa/ticket";
import {useStoreProducts} from "@/store/user";


export const Products: FC = () => {
    const t = useTranslations()
    const store = useStoreProducts()
    return (
        <section>
            <div className={styles.ticketsKeys_frstPart}>
                <Key keyRUB={store["Mann Co. Supply Crate Key RUB"]} keyUSD={store["Mann Co. Supply Crate Key USD"]}/>
            </div>
            <div className={styles.ticketsKeys_scndPart}>
                <Ticket ticketRUB={store["Tour of Duty Ticket RUB"]} ticketUSD={store["Tour of Duty Ticket USD"]}/>
            </div>
        </section>
    )
}

export default Products;