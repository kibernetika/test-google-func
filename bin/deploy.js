#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("gcloud functions deploy function-1 --entry-point myFuncHandler --r\n" +
    "untime nodejs16 --trigger-http --allow-unauthenticated");
