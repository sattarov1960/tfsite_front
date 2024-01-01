export function validateTradeLink(tradeLink: string) {
    const regex = /https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+/;
    return regex.test(tradeLink);
}