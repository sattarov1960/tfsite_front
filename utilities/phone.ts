export function validatePhone(phone: string) {
    const regex = /^\+?[0-9]{10,14}$/;
    return regex.test(phone);
}