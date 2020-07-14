import { Request, Response, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from './constants';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    let stack = err.stack?.split('\n').map(line => line.trim());
    stack?.shift();
    res.status(HTTP_INTERNAL_SERVER_ERROR)
        .json({
            error: err.message,
            stack
        });
    next(err);
}
