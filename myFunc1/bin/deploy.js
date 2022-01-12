#! /usr/bin/env node

const shell = require("shelljs");
shell.exec("gcloud functions deploy function-6 --project test-func-336618 --region europe-central2 --entry-point myFuncHandler --runtime nodejs16 --trigger-http --allow-unauthenticated");
