import _colors from 'colors';
import { Request, Response, NextFunction } from 'express';
import { getRequestIP } from './utils';

const colors : any = _colors;

colors.setTheme({
    object: ['magenta', 'bold'],
    string: ['yellow', 'bold'],
    number: ['brightMagenta', 'bold'],
    array: ['cyan', 'bold'],
    boolean: ['brightRed', 'bold']
});

export default (req : Request, res : Response, next : NextFunction) => {
    console.log(`${req.method} - ${req.path} (${getRequestIP(req)})`);

    if (req.method === 'GET')
        return next();

    let body = '';
    if (!req.body || Object.entries(req.body).length === 0)
        body = 'Empty';
    else {
        body += '{\n';
        for (let key of Object.keys(req.body)) {
            let type : string = Array.isArray(req.body[key]) ? 'array' : typeof req.body[key];
            body += `    ${key}: `;

            if(req.body[key] === null || req.body[key] === undefined) {
                body += colors.grey(`${req.body[key]}\n`);
                continue;
            }

            switch (type) {
                case 'array':
                    body += colors[type](`[${type}] (${req.body[key].length})\n`);
                    break;
                case 'object':
                    body += colors[type](`[${type}] { ${Object.keys(req.body[key]).join(', ')} }\n`);
                    break;
                default:
                    if(req.body[key].length > 50)
                        body += colors[type](`[${type}] (${req.body[key].length})\n`);
                    else
                        body += colors[type](`${req.body[key]}\n`);
                    break;
            }
        }
        body += '}';
    }

    console.log(body);

    next();
}
