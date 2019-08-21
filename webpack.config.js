
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var path = require('path');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },  
    optimization: {
        minimize: true 
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components|build)/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['lodash'],
                    presets: ['@babel/preset-env']
                }
            }
        }
        ]
    },
    plugins: [
      new LodashModuleReplacementPlugin
    ],
    externals: {
        'react': 'commonjs react' 
    }
};