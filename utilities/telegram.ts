export function validateTelegram(telegram: string) {
    const regex = /@([A-Za-z0-9_]{1,15})/;
    return regex.test(telegram);
}