import { FC } from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/apa/apa.module.css"

export const Products: FC = () => {
    const t = useTranslations()
    return (
        <div className="popUp_authorizationRequest">
            <div className="popUp_header">
                <img src="img/popUp_cross.svg" className="cross" alt="крестик"/>
                <h2 className="popUp_header_text">Необходима авторизация</h2>
                <hr className="popUp_header_line"/>
            </div>
            <div className="popUp_main">
                <span className="popUp_main_textGray">Для того, чтобы продолжить,
                    <br/>Вам необходимо войти через
                    <span className="popUp_main_textWhite">Steam</span>.
                </span>
                <button className="popUp_main_buttonDesktop">
                    <img
                        src="img/icon_steam.svg"
                        className="popUp_main_buttonDesktop_icon"
                        alt="стим"
                    />
                    <span className="popUp_main_buttonDesktop_text">Войти через Steam</span>
                </button>
                <button className="popUp_main_buttonMobile">
                    <span className="popUp_main_buttonMobile_text">Войти через Steam</span>
                    <img
                        src="img/icon_steam.svg"
                        className="popUp_main_buttonMobile_icon"
                        alt="стим"
                    />
                </button>
            </div>
        </div>
    )
}

export default Products;