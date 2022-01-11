#! /usr/bin/env node

const shell = require("shelljs");
shell.exec("gcloud functions deploy function-5 --entry-point myFuncHandler --runtime nodejs16 --trigger-http --allow-unauthenticated");
