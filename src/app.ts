import express from 'express';
require('express-async-errors');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';

import logger from './helpers/logger';
import errorHandler from './helpers/error';
import sequelize from './helpers/sequelize';

import index from './routes/index';
import tables from './routes/tables';
import users from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

require('./helpers/passport');
require('./helpers/email');

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(logger);

app.use('/', index);
app.use('/tables', tables);
app.use('/users', users);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
sequelize.authenticate();
