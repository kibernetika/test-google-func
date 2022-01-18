import { config } from "dotenv"
import {getTestHello} from "../../common/shared-utils";

config(); // setup env variables from .env files

console.log(process.env)

exports.funcHandler = (req: any, res: any) => {
    console.log('_MY_TEST_1 ', process.env._MY_TEST_1);
    console.log('_MY_TEST_2 ', process.env._MY_TEST_2);
    console.log('MY_SECRET_KEY_2 ', process.env.MY_SECRET_KEY_2);
    console.log('MY_SECRET_KEY_3 ', process.env.MY_SECRET_KEY_3);
    console.log('MY_SECRET_KEY_4 ', process.env.MY_SECRET_KEY_4);
    const checkSharedMethods = getTestHello();
    const message=`<h1>Cloud Function of Truepill !!! Func1<h1><br><p>${checkSharedMethods}</p><p>App Version 1.0.11</p>`;
    res.status(200).send(message);
};
