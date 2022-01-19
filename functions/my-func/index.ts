import { config } from 'dotenv'
import handler from './src/function'

config(); // setup env variables from .env files

exports.funcHandler = (req: any, res: any) => handler(req, res);
