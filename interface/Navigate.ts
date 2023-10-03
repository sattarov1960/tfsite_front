import axios from "axios";

export interface axiosClientI {
    axiosClient: typeof axios;
}

export interface BalanceI {
    balance_rub: number
    balance_usd: number
}

export interface UserI {
    personName: string
    hashIMG: string
}
