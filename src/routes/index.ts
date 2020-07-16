import express from 'express';

import { getRequestIP } from '../helpers/utils';

import { version } from '../../package.json';

const router = express();

const now = new Date();
router.get('/', (req, res) => {
    res.json({
        version: `v${version}`,
        date: now,
        ip: getRequestIP(req)
    });
});

export default router;
