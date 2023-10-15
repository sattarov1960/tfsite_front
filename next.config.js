const withNextIntl = require('next-intl/plugin')(
    './i18n.ts'
);

module.exports = withNextIntl({
    publicRuntimeConfig: {
        ENVIRONMENT: process.env.NODE_ENV === 'production' ? 'deploy' : 'development',
    },
    env: {
        api: process.env.NODE_ENV === 'production' ? 'https://tf2key.ru/api' : 'http://127.0.0.1:8001',
        current: process.env.NODE_ENV === 'production' ? 'https://tf2key.ru' : 'http://127.0.0.1:3000',
        localhost_api: process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:8001',
        ws: process.env.NODE_ENV === 'production' ? 'wss://tf2key.ru/api/ws' : 'ws://127.0.0.1:8001/ws',
        use_yandex_metrika: true,
        yandex_metrika_id: 89718128,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mc.yandex.ru',
                port: '',
                pathname: '/watch/12345678',
            },
        ],
    },
});
