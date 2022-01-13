#! /usr/bin/env node

const shell = require("shelljs");

const command = "gcloud functions deploy " +
                 "function-8 " +
                "--project test-func-336618 " +
                "--region europe-central2 " +
                "--entry-point myFuncHandler " +
                "--runtime nodejs16 " +
                "--allow-unauthenticated " +
                "--trigger-http";

shell.exec(command);
