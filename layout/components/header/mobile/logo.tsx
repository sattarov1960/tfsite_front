import { FC } from "react";
import styles from "@/styles/header/mobile/logo.module.css"
import Image from "next/image";
import {HeaderLogoMI} from "@/interface/logo";
import {useStoreUser} from "@/store/user";
import Link from "next/link";



export const HeaderLogoM: FC<HeaderLogoMI> = ({width, height}) => {
    return (
        <div>
            <Link href={`${process.env.current}/`}>
                <Image
                    src="/logo.svg"
                    width={width}
                    height={height}
                    alt="Home"
                    className={useStoreUser.getState().auth ? styles.logo_auth : styles.logo}
                />
            </Link>
        </div>
    )
}

export default HeaderLogoM;
