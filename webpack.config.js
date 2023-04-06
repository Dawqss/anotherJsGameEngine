const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html")
    })],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 3000,
        open: true,
    },
};
