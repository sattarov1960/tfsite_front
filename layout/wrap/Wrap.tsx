import React, {FC, PropsWithChildren} from "react";
import Header from "@/layout/components/header/header";
import Footer from "@/layout/components/footer/footer";
import { cookies } from 'next/headers'
import axios from "axios";
import {useStoreUser, useStoreProducts, useStoreTransactions, useStoreAllOrders, useStoreEngineeringWorks} from "@/store/user";
import {
    StoreInitializerUser,
    StoreInitializerProducts,
    StoreInitializerTransactions,
    StoreInitializerAllOrders, StoreInitializerEngWork
} from "@/store/StoreInitializer";
import {Item, ProductI} from "@/interface/auth";
import Auth from "@/layout/components/popUp/auth/auth";
import Logout from "@/layout/components/popUp/logout/logout";
import UpBalanceRUB from "@/layout/components/popUp/upBalanceRUB/up_balance";
import UpBalanceUSD from "@/layout/components/popUp/upBalanceUSD/up_balance";
import ErrorUpBalanceUSD from "@/layout/components/popUp/upBalanceUSD/error";
import SuccessUpBalanceUSD from "@/layout/components/popUp/upBalanceUSD/success";
import Buy from "@/layout/components/popUp/buy/buy";
import Sell from "@/layout/components/popUp/sell/sell";
import Withdraw from "@/layout/components/popUp/withdraw/withdraw";
import Ban from "@/layout/components/popUp/ban/ban";
import BuyOrder from "@/layout/components/popUp/buyOrder/buyOrder";
import EngineeringWorks from "@/layout/components/popUp/engineeringWorks/engineeringWorks";
import InstallExtension from "@/layout/components/popUp/installExtension/installExtension";
//
// const Auth = dynamic(() => import("@/layout/components/popUp/auth/auth"), {loading: () => <p>Loading...</p>});
// const Logout = dynamic(() => import("@/layout/components/popUp/logout/logout"), {loading: () => <p>Loading...</p>});
// const UpBalanceRUB = dynamic(() => import("@/layout/components/popUp/upBalanceRUB/up_balance"), {loading: () => <p>Loading...</p>});
// const UpBalanceUSD = dynamic(() => import("@/layout/components/popUp/upBalanceUSD/up_balance"), {loading: () => <p>Loading...</p>});
// const ErrorUpBalanceUSD = dynamic(() => import("@/layout/components/popUp/upBalanceUSD/error"), {loading: () => <p>Loading...</p>});
// const SuccessUpBalanceUSD = dynamic(() => import("@/layout/components/popUp/upBalanceUSD/success"), {loading: () => <p>Loading...</p>});
// const Buy = dynamic(() => import("@/layout/components/popUp/buy/buy"), {loading: () => <p>Loading...</p>});
// const Sell = dynamic(() => import("@/layout/components/popUp/sell/sell"), {loading: () => <p>Loading...</p>});
// const Withdraw = dynamic(() => import("@/layout/components/popUp/withdraw/withdraw"), {loading: () => <p>Loading...</p>});

const Wrap: FC<PropsWithChildren<unknown>> = async ({children}) => {
    const cookieStore = cookies()
    const access = cookieStore.get("access_token_cookie")?.value
    const refresh = cookieStore.get("refresh_token_cookie")?.value
    const cookie = `access_token_cookie=${access};refresh_token_cookie=${refresh};`
    const axiosClient = axios.create({headers: {Cookie: cookie}});
    let startTime = Date.now();
    try{
        const response = await axiosClient.get(`${process.env.localhost_api}/commissions`, {timeout: 2 * 1000})
        useStoreEngineeringWorks.setState({
            isOpen: false
        })
    }
    catch (e){
        console.log(`Ошибка загрузки комиссий: ${e}`)
        useStoreEngineeringWorks.setState({
            isOpen: true
        })
    }
    try {
        const response = await axiosClient.get(`${process.env.localhost_api}/user`, {timeout: 2 * 1000});
        const data = response.data
        useStoreUser.setState({
            auth: data.auth,
            balance_usd: data.balance_usd,
            balance_rub: data.balance_rub,
            steam: {
                steamid: data.steam.steamid,
                avatarhash: data.steam.avatarhash,
                personaname: data.steam.personaname,
                profileurl: data.steam.profileurl,
                trade_link: data.steam.trade_link,
                visibility: data.steam.visibility,
            },
            registration: data.registration,
            is_banned: data.is_banned,
            countTrades: data.countTrades,
            steamTradeUrl: data.steamTradeUrl,
            steamApiKey: data.steamApiKey,
            telegramAddress: data.telegramAddress,
            telegramCodeActivate: data.telegramCodeActivate,
            telegramEnable: data.telegramEnable,
            telegramName: data.telegramName,
            phone: data.phone,
            email: data.email,
            telegramAvatar: data.telegramAvatar,
            userId: data.userId
        })
    }
    catch (e) {
        useStoreUser.getState().reset()
    }

    try{
        for (const item of ["Mann Co. Supply Crate Key RUB", "Mann Co. Supply Crate Key USD", "Tour of Duty Ticket RUB", "Tour of Duty Ticket USD"]) {
            const product = await axiosClient.get(`${process.env.localhost_api}/price`, { params: { search_item: item }, timeout: 2 * 1000 })
            const data: ProductI = product.data
            data.can_buy = data.can_buy < 0 ? 0 : data.can_buy
            data.can_sell = data.can_sell < 0 ? 0 : data.can_sell
            switch (item) {
                case "Mann Co. Supply Crate Key RUB":
                    useStoreProducts.setState({"Mann Co. Supply Crate Key RUB": data})
                    break
                case "Mann Co. Supply Crate Key USD":
                    useStoreProducts.setState({"Mann Co. Supply Crate Key USD": data})
                    break
                case "Tour of Duty Ticket RUB":
                    useStoreProducts.setState({"Tour of Duty Ticket RUB": data})
                    break
                case "Tour of Duty Ticket USD":
                    useStoreProducts.setState({"Tour of Duty Ticket USD": data})
                    break
            }

        }
    }
    catch (e){}
    try {
        const response = await axiosClient.get(`${process.env.localhost_api}/transactions?start=${useStoreTransactions.getState().start}&offset=15`, {timeout: 2 * 1000});
        const data = response.data
        useStoreTransactions.setState({
            transactions: data.transactions,
            viewTransactions: data.transactions,
            amount: data.amount
        })
    }
    catch (e) {
        useStoreTransactions.getState().reset()
    }
    try{
        const response = await axios.get(`${process.env.localhost_api}/get_all_orders`)
        const data: {status: boolean, orders: Item[]} = response.data
        if (data.status){
            useStoreAllOrders.setState({
                sellOrders: data.orders.filter(({typeOrder}) => typeOrder === "sell"),
                buyOrders: data.orders.filter(({typeOrder}) => typeOrder === "buy"),
            })
        }
        else{
            console.log("error loading orders buy/sell")
        }}
    catch (e){
        useStoreAllOrders.getState().reset()
    }
    let elapsedTime = Date.now() - startTime;
    console.log(`Elapsed time in milliseconds is ${elapsedTime}`);
    return (
        <>
            <StoreInitializerUser auth={useStoreUser.getState().auth}
                                  registration={useStoreUser.getState().registration}
                                  steam={useStoreUser.getState().steam}
                                  balance_usd={useStoreUser.getState().balance_usd}
                                  balance_rub={useStoreUser.getState().balance_rub}
                                    is_banned={useStoreUser.getState().is_banned}
                                  countTrades={useStoreUser.getState().countTrades}
                                  email={useStoreUser.getState().email}
                                  phone={useStoreUser.getState().phone}
                                  telegramAddress={useStoreUser.getState().telegramAddress}
                                  telegramCodeActivate={useStoreUser.getState().telegramCodeActivate}
                                  telegramEnable={useStoreUser.getState().telegramEnable}
                                  telegramName={useStoreUser.getState().telegramName}
                                  steamApiKey={useStoreUser.getState().steamApiKey}
                                  steamTradeUrl={useStoreUser.getState().steamTradeUrl}
                                  telegramAvatar={useStoreUser.getState().telegramAvatar}
                                  userId={useStoreUser.getState().userId}

            />
            <StoreInitializerProducts
                ticketUSD={useStoreProducts.getState()["Tour of Duty Ticket USD"]}
                ticketRUB={useStoreProducts.getState()["Tour of Duty Ticket RUB"]}
                keyUSD={useStoreProducts.getState()["Mann Co. Supply Crate Key USD"]}
                keyRUB={useStoreProducts.getState()["Mann Co. Supply Crate Key RUB"]}
            />
            <StoreInitializerTransactions
                transactions={useStoreTransactions.getState().transactions}
                viewTransactions={useStoreTransactions.getState().viewTransactions}
                amount={useStoreTransactions.getState().amount}
            />
            <StoreInitializerAllOrders
                buyOrders={useStoreAllOrders.getState().buyOrders}
                sellOrders={useStoreAllOrders.getState().sellOrders}
            />
            <StoreInitializerEngWork
                isOpen={useStoreEngineeringWorks.getState().isOpen}
            />
            <UpBalanceRUB/>
            <UpBalanceUSD/>
            <ErrorUpBalanceUSD/>
            <SuccessUpBalanceUSD/>
            <Withdraw/>
            <Sell/>
            <InstallExtension/>
            <EngineeringWorks/>
            <Buy/>
            <Auth/>
            <Logout/>
            <BuyOrder/>
            <Ban/>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}

export default Wrap