const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const path = require("path");


module.exports = {
    mode: 'development',
    entry: {
        "mylib": path.resolve(__dirname, 'src/index.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            }
        ]
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js'
    },
    devtool:'source-map',
    resolve: { extensions: ['.ts'] },
    plugins: [ new CleanWebpackPlugin(),]
}
