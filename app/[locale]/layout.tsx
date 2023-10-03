import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import "@/app/globals.css"

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'de'}];
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
        </body>
        </html>
    );
}