import express from 'express';

import { getRequestIP } from '../helpers/utils';

const router = express();

const now = new Date();
router.get('/', (req, res) => {
    res.json({
        version: 'v1.0.0',
        date: now,
        ip: getRequestIP(req)
    });
});

export default router;
