import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import Main from "@/layout/components/main/main";
import Products from "@/layout/components/apa/apa";
import FAQ from "@/layout/components/faq/faq";


const HomeScreen: FC = () => {
    return (
        <Wrap>
            <Main/>
            <Products/>
            <FAQ/>
        </Wrap>
    )
}

export default HomeScreen