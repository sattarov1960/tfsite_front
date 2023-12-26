import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import {Transactions} from "@/layout/components/transactions/main";
import {SidebarCabinet} from "@/layout/components/sidebarCabinet/sidebarCabinet";
import styles from "@/styles/cabinet/cabinet.module.css"

const TransactionsScreen: FC = () => {
    return (
        <Wrap>
            <main className={styles.cabinet_main_wrap}>
                <SidebarCabinet/>
                <Transactions/>
            </main>
        </Wrap>
    )
}

export default TransactionsScreen