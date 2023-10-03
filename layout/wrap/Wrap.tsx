import {FC, PropsWithChildren} from "react";
import Header from "@/layout/components/header/header";
import Footer from "@/layout/components/footer/Footer";

const Wrap: FC<PropsWithChildren<unknown>> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}

export default Wrap