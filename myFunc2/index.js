import someHelper from 'common/someHelper';

exports.myFuncHandler = (req, res) => {
    const message=`<font color='blue'>Cloud Function of Truepill !!! Func2</font><br><b>App Version 1.4</b><br/><div>${someHelper('Func2')}</div>`;
    res.status(200).send(message);
};
