import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import {SetOrders} from "@/layout/components/exchange/setOrders";
import {ActiveLots} from "@/layout/components/exchange/activeLots";
import {MyOrders} from "@/layout/components/exchange/myOrders";
import {Video} from "@/layout/components/exchange/video";
import Faq from "@/layout/components/faq/faq";
import {ExchangeTop} from "@/layout/components/exchange/exchangeTop";
import styles from "@/styles/exchange/exchangeScreen.module.css"

const ExchangeScreen: FC = () => {

    return (
        <Wrap>
            <main className={styles.main}>
                <ExchangeTop/>
                <SetOrders/>
                <ActiveLots/>
                <MyOrders/>
                <div className={styles.faq_wrap}>
                    <Faq/>
                </div>
                <Video/>
            </main>
        </Wrap>
    )
}

export default ExchangeScreen
