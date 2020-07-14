import express from 'express';

import database from '../helpers/database';
import authenticate from '../helpers/auth-jwt';

const router = express();

router.get('/', authenticate, async (req, res) => {

    const tables = await database('information_schema.tables')
        .select();

    res.json(tables.map(t => `${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

});

export default router;
