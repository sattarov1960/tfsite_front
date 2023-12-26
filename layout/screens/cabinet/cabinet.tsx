import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import {SidebarCabinet} from "@/layout/components/sidebarCabinet/sidebarCabinet"
import {Cabinet} from "@/layout/components/cabinet/cabinet";


const CabinetScreen: FC = () => {
    return (
        <Wrap>
            <main>
                <SidebarCabinet/>
                <Cabinet/>
            </main>
        </Wrap>
    )
}

export default CabinetScreen