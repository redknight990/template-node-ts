import { NextFunction, Request, Response } from 'express';

import { isEmpty } from './utils';
import { HTTP_BAD_REQUEST } from './constants';

export function checkRequiredPOST(...fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        let keys = Object.keys(req.body);
        if (fields.filter(f => keys.includes(f) && !isEmpty(req.body[f])).length !== fields.length)
            return res.status(HTTP_BAD_REQUEST).send('invalid_body');
        next();
    };
}

export function checkRequiredGET(...fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        let keys = Object.keys(req.query);
        if (fields.filter(f => keys.includes(f) && !isEmpty(req.query[f])).length !== fields.length)
            return res.status(HTTP_BAD_REQUEST).send('invalid_parameters');
        next();
    };
}
