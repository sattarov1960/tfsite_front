export function validatePhoneNumber(phoneNumber: string): boolean {
    const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phoneNumber);
}

export function validateCardNumber(number: string): boolean {
    const regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number)) {
        return false;
    }

    return luhnCheck(number);
}

function luhnCheck(val: string): boolean {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
        let intVal = parseInt(val.charAt(i));
        if (i % 2 === 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return sum % 10 === 0;
}