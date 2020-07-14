import path from 'path';
import fs from 'fs';
import ini from 'ini';

const config = ini.parse(fs.readFileSync(path.join(__dirname, 'config.ini')).toString());

export default config;
