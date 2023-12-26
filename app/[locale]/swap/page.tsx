import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";
import ExchangeScreen from "@/layout/screens/exchange/Exchange";

export const metadata: Metadata = {
    title: getTitle("Биржа"),
    description: 'Написать описание для биржи.',
}
function Page() {
    return (
        <ExchangeScreen/>
    )
}
export default Page