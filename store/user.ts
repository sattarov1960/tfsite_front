import { create } from "zustand";
import {UserI, userStore} from "@/interface/user";
import {
    AccordionI,
    Currency,
    OfferI,
    Popup,
    ProductI,
    ProductsI,
    Trade,
    Transactions,
    UpBalance,
    UpBalanceUSD, useStoreAllOrdersInterface,
    useStoreBuyOrderInterface, useStoreMyOrdersInterface,
    useStoreRubPSInterface,
    Withdraw,
    WithdrawErrorBalance,
    WithdrawRub
} from "@/interface/auth";

export const useStoreUser = create<UserI & userStore>((set) => ({
    auth: false,
    telegramAvatar: "",
    steamApiKey: "",
    steamTradeUrl: "",
    telegramAddress: "",
    telegramCodeActivate: "",
    telegramEnable: false,
    telegramName: "",
    email: "",
    phone: "",
    countTrades: 0,
    steam: {
        steamid: "",
        avatarhash: "",
        personaname: "",
        profileurl: "",
        trade_link: "",
        visibility: false
    },
    balance_rub: 0,
    balance_usd: 0,
    registration: "",
    menu: false,
    is_banned: false,
    setlogOut: () => set({ auth: false }),
    OpenMenu: () => set({ menu: true }),
    CloseMenu: () => set({ menu: false }),
    setSteamTradeUrl: (data) => set({ steamTradeUrl: data }),
    setSteamApiKey: (data) => set({ steamApiKey: data }),
    setUserBalanceRUB: (data) => set({ balance_rub: data }),
    setUserBalanceUSD: (data) => set({ balance_usd: data }),
    setEmail: (data) => set({ email: data }),
    setPhone: (data) => set({ phone: data }),
    setTelegramEnable: (data) => set({ telegramEnable: data }),
    reset: () => set({
        auth: false,
        steam: {
            steamid: "",
            avatarhash: "",
            personaname: "",
            profileurl: "",
            trade_link: "",
            visibility: false
        },
        balance_rub: 0,
        balance_usd: 0,
        registration: "",
        menu: false,
        is_banned: false,
        countTrades: 0,
        email: "",
        phone: "",
        telegramEnable: false,
        telegramCodeActivate: "",
        telegramName: "",
        telegramAddress: "",
        steamTradeUrl: "",
        steamApiKey: "",
    }),
}))

export const useStoreAuth = create<Popup>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))

export const useStoreLogout = create<Popup>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))

export const useStoreUpBalanceRUB = create<UpBalance>((set) => ({
    isOpen: false,
    active: "CardAIFORY",
    balance: 300,
    email: "",
    errorEmail: false,
    isOpenMenu: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setActive: (data) => set({ active: data }),
    setBalance: (data) => set({ balance: data }),
    setEmail: (data) => set({ email: data }),
    setErrorEmail: (data) => set({ errorEmail: data }),
    setIsOpenBalance: (data) => set({ isOpenMenu: data }),
}))

export const useStoreUpBalanceUSD = create<UpBalanceUSD>((set) => ({
    isOpen: false,
    active: "CardAIFORY",
    balance: 1,
    email: "",
    errorEmail: false,
    openSuccess: false,
    openError: false,
    offerData: {
        invoice_id: "",
        binance_id: "",
        usdt: "",
        amount: 0,
    },
    isOpenMenu: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setActive: (data) => set({ active: data }),
    setBalance: (data) => set({ balance: data }),
    setEmail: (data) => set({ email: data }),
    setErrorEmail: (data) => set({ errorEmail: data }),
    setOpenSuccess: (data: boolean) => set({openSuccess: data}),
    setOpenError: (data: boolean) => set({openError: data}),
    setOfferData: (data: any) => set({offerData: data}),
    setIsOpenBalance: (isOpen) => set({ isOpenMenu: isOpen }),
}))


export const useStoreProducts = create<ProductsI>((set) => ({
    "Mann Co. Supply Crate Key RUB": {
        can_sell: 0,
        can_buy: 0,
        sell: 0,
        buy: 0,
        item: "Mann Co. Supply Crate Key",
        status: true,
        symbol: "₽",
        translate: ""
    },
    "Mann Co. Supply Crate Key USD": {
        can_sell: 0,
        can_buy: 0,
        sell: 0,
        buy: 0,
        item: "Mann Co. Supply Crate Key",
        status: true,
        symbol: "$",
        translate: ""
    },
    "Tour of Duty Ticket RUB": {
        can_sell: 0,
        can_buy: 0,
        sell: 0,
        buy: 0,
        item: "Ticket",
        status: true,
        symbol: "₽",
        translate: ""
    },
    "Tour of Duty Ticket USD": {
        can_sell: 0,
        can_buy: 0,
        sell: 0,
        buy: 0,
        item: "Ticket",
        status: true,
        symbol: "$",
        translate: ""
    },
    setProductKeyRUB: (product) => set({ "Mann Co. Supply Crate Key RUB": product }),
    setProductKeyUSD: (product) => set({ "Mann Co. Supply Crate Key USD": product }),
    setProductTicketRUB: (product) => set({ "Tour of Duty Ticket RUB": product }),
    setProductTicketUSD: (product) => set({ "Tour of Duty Ticket USD": product }),
}))

export const useStoreAccordion = create<AccordionI>((set) => ({
    active: null,
    setActive: (data) => set({active: data})
}))


export const useStoreBUY = create<Trade>((set) => ({
    isOpen: false,
    tradeLink: "",
    amount: 1,
    checkBox: true,
    activeItem: "",
    isOpenTradeOffer: false,
    offers: [],
    tradeId: "",
    finish: false,
    isLoad: true,
    errMsg: "",
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setTradeLink: (data) => set({ tradeLink: data }),
    setNumber: (data) => set({ amount: data }),
    setCheckBox: (data) => set({ checkBox: data }),
    setActiveItem: (data) => set({ activeItem: data }),
    setIsOpenTradeOffer: (data) => set({ isOpenTradeOffer: data }),
    setOffers: (offers: OfferI[]) => set({ offers: offers }),
    setTradeId: (tradeId) => set({tradeId: tradeId}),
    setFinish: (finish) => set({finish: finish}),
    setIsLoad: (isLoad) => set({isLoad: isLoad}),
    setErrMsg: (err) => set({errMsg: err}),
    reset: () => set({
        isOpen: false,
        tradeLink: "",
        amount: 1,
        checkBox: true,
        activeItem: "",
        isOpenTradeOffer: false,
        offers: [],
        tradeId: "",
        finish: false,
        isLoad: true,
        errMsg: ""
    })
}))


export const useStoreSELL = create<Trade>((set) => ({
    isOpen: false,
    tradeLink: "",
    amount: 1,
    checkBox: true,
    activeItem: "",
    isOpenTradeOffer: false,
    offers: [],
    tradeId: "",
    finish: false,
    isLoad: true,
    errMsg: "",
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setTradeLink: (data) => set({ tradeLink: data }),
    setNumber: (data) => set({ amount: data }),
    setCheckBox: (data) => set({ checkBox: data }),
    setActiveItem: (data) => set({ activeItem: data }),
    setIsOpenTradeOffer: (data) => set({ isOpenTradeOffer: data }),
    setOffers: (offers: OfferI[]) => set({ offers: offers }),
    setTradeId: (tradeId) => set({tradeId: tradeId}),
    setFinish: (finish) => set({finish: finish}),
    setIsLoad: (isLoad) => set({isLoad: isLoad}),
    setErrMsg: (err) => set({errMsg: err}),
    reset: () => set({
        isOpen: false,
        tradeLink: "",
        amount: 1,
        checkBox: true,
        isOpenTradeOffer: false,
        offers: [],
        tradeId: "",
        finish: false,
        isLoad: true,
        errMsg: ""
    })
}))

export const useStoreCurrency = create<Currency>((set) => ({
    currency: "",
    setCurrency: (data) => set({ currency: data })
}))

export const useStoreTransactions = create<Transactions>((set) => ({
    start: 0,
    amount: 0,
    viewTransactions: [],
    transactions: [],
    filter: "",
    setStart: (start) => set({start: start}),
    setViewTransactions: (items) => set({viewTransactions: items}),
    setTransactions: (items) => set({transactions: items}),
    setFilter: (filter) => set({filter: filter}),
    setAmount: (amount) => set({amount: amount}),
    reset: () => set({
        start: 0,
        amount: 0,
        viewTransactions: [],
        transactions: [],
        filter: "",
    })
}))

export const useStoreWithdrawRUB = create<WithdrawRub>((set) => ({
    isOpen: false,
    activePlatform: "qiwi",
    amount: 0,
    amountView: "0",
    email: "",
    wallet: "",
    amountError: false,
    walletError: false,
    emailError: false,
    commissionError: false,
    bankName: "UNDEFINED",
    isOpenCards: false,
    cards: [],
    linkAddCard: "",
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setActivePlatform: (platform) => set({ activePlatform: platform }),
    setAmount: (amount) => set({ amount: amount }),
    setEmail: (email) => set({ email: email }),
    setWallet: (wallet) => set({ wallet: wallet }),
    setAmountError: (error) => set({ amountError: error }),
    setEmailError: (error) => set({ emailError: error }),
    setWalletError: (error) => set({ walletError: error }),
    setCommissionError: (error) => set({ commissionError: error }),
    setAmountView: (amount) => set({ amountView: amount }),
    setBankName: (name) => set({ bankName: name }),
    setIsOpenCards: (isOpen) => set({ isOpenCards: isOpen }),
    setCards: (cards) => set({ cards: cards }),
    setLinkAddCard: (link) => set({ linkAddCard: link }),
    reset: () => set({
        isOpen: false,
        activePlatform: "card",
        amount: 0,
        email: "",
        wallet: "",
        amountError: false,
        walletError: false,
        emailError: false
    })
}))
export const useStoreWithdrawUSDT = create<Withdraw>((set) => ({
    isOpen: false,
    activePlatform: "binance",
    amount: 0,
    amountView: "0",
    email: "",
    wallet: "",
    amountError: false,
    walletError: false,
    emailError: false,
    commissionError: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
    setActivePlatform: (platform) => set({ activePlatform: platform }),
    setAmount: (amount) => set({ amount: amount }),
    setEmail: (email) => set({ email: email }),
    setWallet: (wallet) => set({ wallet: wallet }),
    setAmountError: (error) => set({ amountError: error }),
    setEmailError: (error) => set({ emailError: error }),
    setWalletError: (error) => set({ walletError: error }),
    setCommissionError: (error) => set({ commissionError: error }),
    setAmountView: (amount) => set({ amountView: amount }),
    reset: () => set({
        isOpen: false,
        activePlatform: "binance",
        amount: 0,
        email: "",
        wallet: "",
        amountError: false,
        walletError: false,
        emailError: false
    })
}))

export const useStoreErrorWithdraw = create<Popup>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))

export const useStoreSuccessWithdraw = create<Popup>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))
export const useStoreErrorBalanceWithdraw = create<WithdrawErrorBalance>((set) => ({
    isOpen: false,
    wallet: "",
    balance: 0,
    currency: "",
    setCurrency: (currency) => set({ currency: currency }),
    setBalance: (balance) => set({ balance: balance }),
    setWallet: (wallet) => set({ wallet: wallet }),
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))

export const useStoreRubPS = create<useStoreRubPSInterface>((set) => ({
    balanceGM: 0,
    balanceAIFORY: 0,
    setBalanceGM: (balance) => set({ balanceGM: balance }),
    setBalanceAIFORY: (balance) => set({ balanceAIFORY: balance }),
}))


export const useStoreBuyOrder = create<useStoreBuyOrderInterface>((set) => ({
    orderId: "",
    orderCount: 0,
    orderPrice: 0,
    isOpen: false,
    maxOrderCount: 0,
    Close: () => set({isOpen: false}),
    Open: () => set({isOpen: true}),
    setOrderId: (orderId) => set({orderId: orderId}),
    setOrderCount: (orderCount) => set({orderCount: orderCount}),
    setOrderPrice: (orderPrice) => set({orderPrice: orderPrice}),
    setMaxOrderCount: (maxOrderCount) => set({maxOrderCount: maxOrderCount}),
}))


export const useStoreAllOrders = create<useStoreAllOrdersInterface>((set) => ({
    buyOrders: [],
    sellOrders: [],
    setBuyOrders: (orders) => set({buyOrders: orders}),
    setSellOrders: (orders) => set({sellOrders: orders}),
    reset: () => set({
        buyOrders: [],
        sellOrders: [],
    }),
    deleteOrder: (orderId) => set((state) => {
        const buyOrders = state.buyOrders.filter((item) => item.orderId !== orderId)
        const sellOrders = state.sellOrders.filter((item) => item.orderId !== orderId)
        return {buyOrders, sellOrders}
    }),
    addOrder: (order) => set((state) => {
        if (order.typeOrder === "buy"){
            const buyOrders = [...state.buyOrders, order]
            return {buyOrders}
        }
        else if (order.typeOrder === "sell"){
            const sellOrders = [...state.sellOrders, order]
            return {sellOrders}
        }
        else {
            return state
        }
    })
}))

export const useStoreMyOrders = create<useStoreMyOrdersInterface>((set) => ({
    rerender: false,
    setRerender: (rerender) => set({rerender: rerender}),
}))