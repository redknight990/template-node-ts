import express from 'express';
import bcrypt from 'bcryptjs';

import { isValidEmail, isValidName, isValidPassword } from '../helpers/validation';
import { checkRequiredPOST } from '../helpers/middleware';
import authenticate, { issueJWT } from '../helpers/auth-jwt';

import User from '../models/user';
import { generateUUID } from '../helpers/utils';
import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_OK, HTTP_UNAUTHORIZED } from '../helpers/constants';

const router = express();

router.post('/register', checkRequiredPOST('firstName', 'lastName', 'email', 'password'), async (req, res) => {

    // Required fields
    let { firstName, lastName, email, password } = req.body;

    // Trim necessary fields
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    // Validate names
    if (!isValidName(firstName) || !isValidName(lastName))
        return res.status(HTTP_BAD_REQUEST).send('invalid_names');

    // Validate email
    if (!isValidEmail(email))
        return res.status(HTTP_BAD_REQUEST).send('invalid_email');

    // Validate password
    if (!isValidPassword(password))
        return res.status(HTTP_BAD_REQUEST).send('invalid_password');

    // Check email taken
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser)
        return res.status(HTTP_BAD_REQUEST).send('email_taken');

    // Create and return user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10)
    });

    res.json(user);

});

router.post('/login', checkRequiredPOST('email', 'password'), async (req, res) => {

    // Required fields
    const { email, password } = req.body;

    // Find user, if none, unauthorized
    const user = await User.scope().findOne({ where: { email, deleted: false } });
    if (!user)
        return res.sendStatus(HTTP_UNAUTHORIZED);

    // Compare passwords, if no match, unauthorized
    if (!bcrypt.compareSync(password, user.password))
        return res.sendStatus(HTTP_UNAUTHORIZED);

    // Issue a new JSON Web Token and return it
    let token = issueJWT(user);
    res.json({ token });

});

router.post('/reset-password', checkRequiredPOST('guid', 'password'), async (req, res) => {

    // Required fields
    const { guid, password } = req.body;

    // Find user, if none, not found
    let user = await User.scope().findOne({ where: { resetGUID: guid, deleted: false } });
    if (!user)
        return res.sendStatus(HTTP_NOT_FOUND);

    // Validate password
    if (!isValidPassword(password))
        return res.status(HTTP_BAD_REQUEST).send('invalid_password');

    // Save new password and generate new GUID
    user.password = bcrypt.hashSync(password, 10);
    user.resetGUID = generateUUID();
    await user.save();

    // Return OK
    res.sendStatus(HTTP_OK);

});

router.get('/current', authenticate, (req, res) => res.json(req.user));

export default router;
