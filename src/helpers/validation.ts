export function isValidName(value: string) {
    const regex = /^[A-zÀ-ú-' ]+$/;
    return regex.test(value) && value.length <= 50;
}

export function isValidEmail(value: string) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return regex.test(value) && value.length <= 200;
}

export function isValidPassword(value: string) {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return regex.test(value) && value.length >= 8 && value.length <= 50;
}
