const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = merge.smart({
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/timeline.css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/template/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'), // будет оказаться в build/ или dist/
            inject: 'body',
            showErrors: true,
        })
    ]
}, common)