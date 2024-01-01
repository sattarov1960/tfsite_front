
export function validateApiKey(apiKey: string) {
    return /^[0-9A-F]{32}$/i.test(apiKey);
}