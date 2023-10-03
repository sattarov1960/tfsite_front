interface LanguageListI extends Array<LanguageItemI> {}
interface CurrencyListI extends Array<CurrencyItemI> {}


interface LanguageItemI {
    id: number
    name: string
    imgPath: string
}

interface CurrencyItemI {
    id: number
    name: string
    code: string
}

