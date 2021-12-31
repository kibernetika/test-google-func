exports.myFuncHandler = (req, res) => {
    const message="<font color='blue'>GCP СloudFunction of Truepill !!!</font><br><b>App Version 1.3</b>";
    res.status(200).send(message);
};
