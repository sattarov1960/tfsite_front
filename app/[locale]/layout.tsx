import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import "@/app/globals.css"
import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";
import {YandexMetrika} from "@/layout/components/yandex_metrika/metrika";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'ru'}, {locale: 'ua'}];
}

export const metadata: Metadata = {
    metadataBase: new URL('https://tf2key.ru'),
    applicationName: 'TF2 Key',
    title: getTitle("автоматическая покупка и продажа ключей TF2."),
    description: 'Сайт для покупки и продажи ключей TF2 по самой выгодной цене. Принимаем и переводим на QiWi, банковские карты и USDT. Быстро, легко, надёжно. Поддержка работает 24 на 7.',
    colorScheme: 'dark',
    keywords: ['продать ключи тф2', 'продать ключи тф', 'продать ключи tf2', 'купить ключи тф2', 'купить ключи тф', 'купить ключи tf2', 'ключи тф2', 'tf2 keys', 'buy tf2 keys'],
    robots: {
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
    },
    themeColor: 'black',
    alternates: {
        canonical: 'https://tf2key.ru',
        languages: {
            'ru-RU': '/ru',
            'ua-UA': '/ua',
            'en-US': '/en',
        },
    },
    openGraph: {
        title: 'TF2KEY',
        description: 'Покупка и продажа ключей TF2. Принимаем QiWi, банковские переводы любого банка через систему быстрых платежей, а также USDT.',
        url: 'https://tf2key.ru',
        siteName: 'TF2KEY.RU',
        images: [
            {
                url: '/images/tild6536-3537-4337-a533-343232346665__tf2key1.jpg',
                width: 800,
                height: 600,
                alt: 'TF 2 KEY',
            },
        ],
        locale: 'ru_RU',
        type: 'website',
    }
}

// @ts-ignore
export default async function LocaleLayout({children, params: {locale}}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
            <YandexMetrika/>
            <ToastContainer />
        </body>
        </html>
    );
}
