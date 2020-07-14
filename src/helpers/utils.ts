import { Request } from 'express';

export function isEmpty(value: any) {
    return value === undefined || value === null || value === '';
}

export function getRequestIP(req: Request) {
    if (req.connection.remoteAddress)
        return req.connection.remoteAddress.replace('::ffff:', '').replace('::1', '127.0.0.1');
    return '';
}

export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
