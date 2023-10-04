const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);

module.exports = withNextIntl({
    publicRuntimeConfig: {
        // Переменная окружения для определения режима разработки или продакшена
        ENVIRONMENT: process.env.NODE_ENV === 'production' ? 'deploy' : 'development',
    },
    env: {
        api: process.env.NODE_ENV === 'production' ? 'https://tf2key.ru/api' : 'http://127.0.0.1:8000',
        current: process.env.NODE_ENV === 'production' ? 'https://tf2key.ru' : 'http://127.0.0.1:3000',
        localhost_api: 'http://127.0.0.1:8000',
    },
});
