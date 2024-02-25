 const path = require ('path')
 const MiniCssExtractPlugin = require('mini-css-extract-plugin')
 
 module.exports = {
    entry: {
        index: './src/index.js' // essa chave determina o nome do arquivo
    },
    mode: 'development', //determina o modo
    module: {
        rules: [{
            test: /\.css$/,
            use:[MiniCssExtractPlugin.loader, 'css-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}