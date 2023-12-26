import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import {SidebarCabinet} from "@/layout/components/sidebarCabinet/sidebarCabinet"
import {Cabinet} from "@/layout/components/cabinet/cabinet";
import styles from "@/styles/cabinet/cabinet.module.css"

const CabinetScreen: FC = () => {
    return (
        <Wrap>
            <main className={styles.cabinet_main_wrap}>
                <SidebarCabinet/>
                <Cabinet/>
            </main>
        </Wrap>
    )
}

export default CabinetScreen