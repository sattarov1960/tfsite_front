import { FC } from "react";
import {useTranslations} from "next-intl";
import styles from "@/styles/cabinet/cabinet.module.css"
import copy from "@/public/copy.svg"
import Image from 'next/image'

export const Cabinet: FC = () => {
    const t = useTranslations()
    return (
        <article className={styles.article_cabinet_wrap}>
            <section className={styles.left_section_wrap}>
                <div className={styles.left_section_top_two_wrap}>
                    <div className={styles.left_section_top_wrap}>
                        <p className={styles.left_section_top_left_p}>Вася Пупкин</p>
                        <div className={styles.left_section_top_btn_wrap}>
                            <img
                                src="https://avatars.steamstatic.com/f2ae4544e940ea8943d088507c57db5868461855_medium.jpg"
                                alt="user" className={styles.left_section_top_left_img}/>
                            <div className={styles.left_section_top_left_btn_wrap}>
                                <div className={styles.left_section_top_left_right_item}>
                                    <span className={styles.left_section_top_left_right_span}>Регистрация</span>
                                    <span className={styles.left_section_top_left_right_span_orange}>10.10.2022</span>
                                </div>
                                <div className={styles.left_section_top_left_hr}/>
                                <div className={styles.left_section_top_left_right_item}>
                                    <span className={styles.left_section_top_left_right_span}>Обмен</span>
                                    <span className={styles.left_section_top_left_right_span_orange}>0</span>
                                </div>
                                <div className={styles.left_section_top_left_hr}/>
                            </div>
                        </div>
                    </div>
                    <div>
                    <p className={styles.left_section_top_left_p}>Контактная информация</p>
                        <div className={styles.left_section_top_right_wrap}>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span className={styles.left_section_top_right_item_left_span}>E-mail:</span>
                                    <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                                </div>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>sattarov.1960@inbox.ru</span>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg}>
                                <span className={styles.left_section_top_right_item_left_span}>E-mail:</span>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>sattarov.1960@inbox.ru</span>
                                <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span className={styles.left_section_top_right_item_left_span}>Телефон:</span>
                                    <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                                </div>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>+79237289963</span>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg}>
                                <span className={styles.left_section_top_right_item_left_span}>Телефон:</span>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>+79237289963</span>
                                <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                            <div className={styles.left_section_top_right_item_wrap}>
                                <div className={styles.left_section_top_right_item_wrap_top}>
                                    <span className={styles.left_section_top_right_item_left_span}>Telegram:</span>
                                    <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                                </div>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>@good_ak777</span>
                            </div>
                            <div className={styles.left_section_top_right_item_wrap_lg}>
                                <span className={styles.left_section_top_right_item_left_span}>Telegram:</span>
                                <span
                                    className={styles.left_section_top_right_item_span_orange}>@good_ak777</span>
                                <span className={styles.left_section_top_right_item_right_span}>Применить</span>
                            </div>
                            <div className={styles.left_section_top_right_item_hr}/>
                        </div>
                    </div>
                </div>
                <div className={styles.left_section_btn_wrap}>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>Trade link:</span>
                        <input type="text" className={styles.left_section_btn_item_input} placeholder="Trade link:"/>
                        <a href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
                           target="_blank">
                            <span className={styles.left_section_btn_item_right_span}>Получить ссылку</span>
                        </a>
                        <span className={styles.left_section_btn_item_right_span_grey}>Применить</span>
                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>Trade link:</span>
                        <input type="text" className={styles.left_section_btn_item_input} placeholder="API-ключ:"/>
                        <a href="https://steamcommunity.com/dev/apikey" target="_blank">
                            <span className={styles.left_section_btn_item_right_span}>Получить ссылку</span>
                        </a>
                        <span className={styles.left_section_btn_item_right_span_grey}>Применить</span>
                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                    <div className={styles.left_section_btn_item}>
                        <span className={styles.left_section_top_left_right_span}>Steam ID64:</span>
                        <span className={styles.left_section_btn_item_right_span_orange}>1818918238123819</span>
                    </div>
                    <div className={styles.left_section_btn_item_hr}/>
                </div>
            </section>
            {true ?
                <section className={styles.right_section_wrap}>
                    <p className={styles.right_section_p}>Оповещения будут поступать:</p>
                    <div className={styles.right_section_no_auth_top_wrap}>
                        <img
                            src="https://avatars.steamstatic.com/f2ae4544e940ea8943d088507c57db5868461855_medium.jpg"
                            alt="user" className={styles.left_section_top_left_img}/>
                        <div className={styles.right_section_no_auth_top_right_wrap}>
                            <p>MI-6</p>
                            <p>@good_ak777</p>
                        </div>
                    </div>
                    <div className={styles.right_section_no_auth_btn_untie_wrap_wrap}>
                        <div className={styles.right_section_no_auth_btn_untie_wrap}>
                            <span>Отвязать аккаунт</span>
                        </div>
                    </div>
                </section> :
                <section className={styles.right_section_wrap}>
                    <p className={styles.right_section_p}>Для включения оповещений о продаже предметов пришлите нашему
                        боту
                        код для авторизации.</p>
                <span className={styles.right_section_span}>@tf2key_notification_bot</span>
                <div className={styles.right_section_btn_wrap}>
                    <span className={styles.right_section_btn_text_gray}>Ваш код для авторизации:</span>
                    <span className={styles.right_section_btn_text_orange}>231231231231231</span>
                    <Image
                        src={copy}
                        alt="Copy"
                        width={22}
                        height={22}
                        className={styles.right_section_btn_img}
                    />
                </div>
            </section>}
        </article>
    )
}

