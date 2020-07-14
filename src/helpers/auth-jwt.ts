import passport from 'passport';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import env from '../../config/environment';
import { HTTP_UNAUTHORIZED } from './constants';

export function issueJWT(user: any) {
    return jwt.sign({ sub: user.id }, env.auth.secret, { expiresIn: '10h' });
}

export default (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
        if (err)
            return next(err);
        if (!user)
            return res.sendStatus(HTTP_UNAUTHORIZED);
        req.user = user;
        next();
    })(req, res, next);
}
