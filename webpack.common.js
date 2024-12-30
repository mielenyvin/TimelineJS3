const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const output_path = path.resolve(__dirname, "dist");
module.exports = {
    entry: "./src/js/index.js",
    optimization: {
        usedExports: true
    },
    output: {
        filename: "timeline.js",
        path: path.join(output_path, 'js'),
        library: "TL" // https://webpack.js.org/configuration/output/#outputlibrary
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/js/language/locale/*.json",
                    to: "js/locale/[name][ext]", // Используем [name] для сохранения оригинального имени файла
                },
                {
                    from: './src/embed/*',
                    to: "embed/[name][ext]", // Используем [name] для сохранения оригинального имени файла
                }
            ],
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true
        }),
    ],
    module: {
        rules: [{
                test: /\.less$/,
                use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../css/icons'
                    }
                }]
            }
        ]
    }
};