import { FC } from "react";
import {useTranslations} from "next-intl";


export const SidebarCabinet: FC = () => {
    const t = useTranslations()
    return (
        <aside>
            <h1>Личный кабинет</h1>
            <div>
                <img src="" alt=""/>
                <h2>Личная информация</h2>
            </div>
            <div>
                <img src="" alt=""/>
                <h2>Транзакции</h2>
            </div>
        </aside>
    )
}

