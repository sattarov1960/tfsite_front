import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";
import CabinetScreen from "@/layout/screens/cabinet/cabinet";

export const metadata: Metadata = {
    title: getTitle("Личный Кабинет"),
    description: 'Личный кабинет в котором вы можете привязать telegram, email, биржу',
}

function Page() {
    return (
        <CabinetScreen/>
    )
}
export default Page