import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import env from '../../config/environment';

import User from '../models/user';

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.auth.secret
    },
    (payload, done) => {
        User.findOne({ where: { id: payload.sub } })
            .then(user => {
                if (user)
                    done(null, user);
                else
                    done(new Error('User does not exist'));
            })
            .catch(err => done(err));
    }
));
