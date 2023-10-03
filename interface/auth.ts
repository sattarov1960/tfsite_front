import {TransactionI, TransactionItemsI} from "@/interface/transactions";

export interface Popup{
    isOpen: boolean
    Open: () => void
    Close: () => void
}

export interface UpBalance extends Popup{
    balance: number
    active: string
    email: string
    errorEmail: boolean
    isOpenMenu: boolean
    setActive: (data: string) => void
    setBalance: (data: number) => void
    setEmail: (data: string) => void
    setErrorEmail: (data: boolean) => void
    setIsOpenBalance: (isOpen: boolean) => void
}


export interface UpBalanceUSD extends UpBalance{
    openSuccess: boolean
    openError: boolean

    offerData: {
        invoice_id: string,
        binance_id: string,
        usdt: string,
        amount: number,
    }
    setOpenSuccess: (data: boolean) => void
    setOpenError: (data: boolean) => void
    setOfferData: (data: any) => void
}


export interface ProductI{
    status: boolean,
    item: string,
    buy: number,
    sell: number,
    can_sell: number,
    can_buy: number,
    symbol: string
    translate: string
}

export interface ProductsI{
    "Mann Co. Supply Crate Key RUB": ProductI,
    "Mann Co. Supply Crate Key USD": ProductI,
    "Tour of Duty Ticket RUB": ProductI
    "Tour of Duty Ticket USD": ProductI
    setProductKeyRUB: (product: ProductI) => void
    setProductKeyUSD: (product: ProductI) => void
    setProductTicketRUB: (product: ProductI) => void
    setProductTicketUSD: (product: ProductI) => void
}

export interface AccordionI{
    active: number | null
    setActive: (point: number | null) => void
}

export interface Trade extends Popup{
    tradeLink: string
    amount: number,
    checkBox: boolean,
    activeItem: string,
    isOpenTradeOffer: boolean,
    offers: OfferI[];
    tradeId: string,
    finish: boolean,
    isLoad: boolean,
    errMsg: string,
    setTradeLink: (data: string) => void
    setNumber: (data: number) => void
    setCheckBox: (data: boolean) => void
    setActiveItem: (data: string) => void
    setIsOpenTradeOffer: (data: boolean) => void
    setOffers: (offers: OfferI[]) => void
    setTradeId: (tradeId: string) => void
    setFinish: (finish: boolean) => void
    setIsLoad: (isLoad: boolean) => void
    setErrMsg: (err: string) => void
    reset: () => void
}

export interface Currency{
    currency: string
    setCurrency: (currency: string) => void
}

export interface OfferI {
    bot: number;
    offerId: string;
    status: boolean;
    steamOfferId: string;
    statusCode: number
}

export interface Transactions{
    start: number
    amount: number
    viewTransactions: TransactionI[]
    transactions: TransactionI[],
    filter: string,
    setStart: (start: number) => void
    setFilter: (filter: string) => void
    setTransactions: (transactions: TransactionI[]) => void
    setViewTransactions: (transactions: TransactionI[]) => void
    setAmount: (transactions: number) => void
    reset: () => void
}

export interface Popup{
    isOpen: boolean
    Open: () => void
    Close: () => void
}


export interface Withdraw extends Popup {
    activePlatform: string
    amount: number
    amountView: string
    email: string
    wallet: string
    amountError: boolean
    emailError: boolean
    walletError: boolean
    commissionError: boolean
    setActivePlatform: (platform: string) => void
    setAmount: (amount: number) => void
    setEmail: (email: string) => void
    setWallet: (wallet: string) => void
    setAmountError: (error: boolean) => void
    setEmailError: (error: boolean) => void
    setWalletError: (error: boolean) => void
    setCommissionError: (error: boolean) => void
    setAmountView: (amount: string) => void
    reset: () => void
}

export interface WithdrawRub extends Withdraw{
    bankName: string
    isOpenCards: boolean
    cards: string[]
    linkAddCard: string
    setBankName: (name: string) => void
    setIsOpenCards: (isOpen: boolean) => void
    setCards: (cards: string[]) => void
    setLinkAddCard: (link: string) => void
}