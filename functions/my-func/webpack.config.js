const path = require('path')

module.exports = {
    mode: "production",
    target: "node",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: "index.js"
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
            }
        ]
    }
}
