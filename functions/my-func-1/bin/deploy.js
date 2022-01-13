#! /usr/bin/env node

const shell = require("shelljs");

const command = "gcloud functions deploy " +
                "func-name-local " +
                "--project test-func-336618 " +
                "--region europe-central2 " +
                "--entry-point funcHandler " +
                "--runtime nodejs16 " +
                "--allow-unauthenticated " +
                "--trigger-http";
shell.exec(command);
