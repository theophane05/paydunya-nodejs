const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/lib/index.ts",
    module: {
        rules: [
            { 
                test: /\.ts?$/, 
                use: 'ts-loader', 
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    output: {
        filename: 'paydunya.min.js',
        path: path.resolve(__dirname, 'dist'),
    }
}