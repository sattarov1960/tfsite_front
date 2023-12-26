import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";
import {P2PPage} from "@/layout/screens/P2P/P2P"
export const metadata: Metadata = {
    title: getTitle("P2P расширение"),
    description: 'P2P расширение',
}
function Page() {
    return (
        <P2PPage/>
    )
}
export default Page