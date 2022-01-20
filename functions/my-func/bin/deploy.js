#! /usr/bin/env node

const shell = require(`shelljs`);

const funcName = process.argv[0];

if (!funcName) {
    shell.exec('echo \`Error! Please set func name into package.json in the deploy script for this func!\`');

    return;
}

shell.exec(`gcloud functions deploy ` +
            `${funcName}-local ` +
            `--project test-func-336618 ` +
            `--region europe-central2 ` +
            `--entry-point funcHandler ` +
            `--runtime nodejs16 ` +
            `--allow-unauthenticated ` +
            `--trigger-http`);
