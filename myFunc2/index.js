exports.myFuncHandler = (req, res) => {
    const message="<font color='blue'>Cloud Function of Truepill !!! Func2</font><br><b>App Version 1.3</b>";
    res.status(200).send(message);
};
