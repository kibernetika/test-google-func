import { config } from "dotenv"

config(); // setup env variables from .env files

console.log(process.env)

exports.funcHandler = (req, res) => {
    console.log('_MY_TEST_1 ', process.env._MY_TEST_1);
    console.log('_MY_TEST_2 ', process.env._MY_TEST_2);
    console.log('MY_SECRET_KEY_2 ', process.env.MY_SECRET_KEY_2);
    console.log('MY_SECRET_KEY_3 ', process.env.MY_SECRET_KEY_3);
    console.log('MY_SECRET_KEY_4 ', process.env.MY_SECRET_KEY_4);
    const message="<font color='blue'>Cloud Function of Truepill !!! Func1</font><br><b>App Version 1.9</b>";
    res.status(200).send(message);
};
