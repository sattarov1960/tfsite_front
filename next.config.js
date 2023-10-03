const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);

module.exports = withNextIntl({
    env: {
        api: "http://127.0.0.1:8000",
        current: "http://127.0.0.1:3000",
        localhost_api: "http://127.0.0.1:8000",
    }
});
