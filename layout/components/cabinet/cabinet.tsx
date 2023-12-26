import { FC } from "react";
import {useTranslations} from "next-intl";


export const Cabinet: FC = () => {
    const t = useTranslations()
    return (
        <article>
            <section>
                <div>
                    <p>Вася Пупкин</p>
                    <div>
                        <img src="" alt=""/>
                        <div>
                            <span>Регистрация</span> <span>10.10.2022</span>
                            <div/>
                            <span>Обмен</span> <span>0</span>
                            <div/>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Контактная информация</p>
                    <div>
                        <span>E-mail:</span>
                        <span>sattarov.1960@inbox.ru</span>
                        <img src="" alt=""/>
                    </div>
                    <div/>
                    <div>
                        <span>Телеграм:</span>
                        <img src="" alt=""/>
                        <img src="" alt=""/>
                    </div>
                    <div/>
                </div>
                <div>
                    <div>
                        <span>Trade link:</span>
                        <input type="text"/>
                        <img src="" alt=""/>
                        <span>Получить ссылку</span>
                        <span>Применить</span>
                    </div>
                    <div/>
                    <div>
                        <span>API-ключ:</span>
                        <input type="text"/>
                        <img src="" alt=""/>
                        <span>Получить ключ</span>
                        <span>Применить</span>
                    </div>
                    <div/>
                    <div>
                        <span>Steam ID64:</span>
                        <span>1818918238123819</span>
                    </div>
                </div>
            </section>
            <section>
                <p>Для включения оповещений о продаже преметов пришлите нашему боту код для авторизации</p>
                <span>@tf2key_notification_bot</span>
                <div>
                    <span>Ваш код для авторизации:</span>
                    <span>231231231231231</span>
                    <img src="" alt=""/>
                </div>
            </section>
        </article>
    )
}

