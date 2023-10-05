import PrivacyPolicy from "@/layout/screens/privacyPolicy/privacyPolicy";
import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";

export const metadata: Metadata = {
    title: getTitle("Правила"),
    description: 'Политика возврата/конфиденциальности, а также пользовательское соглашение.',
}
function Page() {
    return (
        <PrivacyPolicy/>
    )
}
export default Page