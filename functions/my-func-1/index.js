exports.funcHandler = (req, res) => {
    const message="<font color='blue'>Cloud Function of Truepill !!! Func1</font><br><b>App Version 1.8</b>";
    res.status(200).send(message);
};