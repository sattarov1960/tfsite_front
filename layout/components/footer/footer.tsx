import {FC} from "react";
import styles from "@/styles/footer/footer.module.css"
import Image from "next/image";
import Navigate from "@/layout/components/footer/navigate";
import Privacy from "@/layout/components/footer/privace";
import SocialNetworks from "@/layout/components/footer/socialNetworks";

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.sub_footer}>
                <div className={styles.sub_footer_wrap_logo}>
                    <Image
                        src="/logo.svg"
                        width={218}
                        height={98}
                        alt="TF2KEY"
                        className={styles.sub_footer_logo}
                    />
                </div>
                <Navigate/>
                <SocialNetworks/>
            </div>
            <Privacy/>
        </footer>
    )
}

export default Footer