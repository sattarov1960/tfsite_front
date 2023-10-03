import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import "@/app/globals.css"
import {Metadata} from "next";
import Script from 'next/script'
import Head from "next/head";

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'de'}];
}

export const metadata: Metadata = {
    generator: 'Next.js',
    applicationName: 'TF2 Key',
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
        title: 'TF2 key',
        description: 'Покупка и продажа ключей TF2. Принимаем QiWi, банковские переводы любого банка через систему быстрых платежей, а также USDT.',
        url: 'https://tf2key.ru',
        siteName: 'Next.js',
        images: [
            {
                url: 'https://tf2key.ru/images/tild6536-3537-4337-a533-343232346665__tf2key1.jpg',
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
            <Head>
                <meta name="yandex-verification" content="72580f116aa69764"/>
            </Head>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
            <Script id="metrika-counter" strategy="afterInteractive">
                {`(function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(89718128, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });`}
            </Script>
        </body>
        </html>
    );
}