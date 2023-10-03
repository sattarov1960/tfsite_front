import { FC } from "react";
import Top from "@/layout/components/main/top";
import Crypto from "@/layout/components/main/crypto";
import Statistics from "@/layout/components/main/statistic";


export const Main: FC = () => {
    return (
        <section>
            <Top/>
        <Crypto/>
        <Statistics/>
        </section>
    )
}

export default Main;
