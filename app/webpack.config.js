const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = env => {
    return {
        entry: './src/index.js',
        mode: "none",
        output: {
            path: path.resolve('dist'),
            filename: 'index_bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "babel-loader"
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: true // true outputs JSX tags
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            host: '0.0.0.0',
        },
        plugins: [
            HtmlWebpackPluginConfig,
        ]
    }
}
