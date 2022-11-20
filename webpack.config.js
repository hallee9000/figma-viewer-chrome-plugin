const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

// check if mode is dev
const mode = process.argv.filter(e => e.includes('--mode'))[0].split('=')[1]
process.env.NODE_ENV = mode

// get env based on mode
require('dotenv').config({
  path: mode === 'production' ? '.env.production' : '.env'
})

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    content: './src/background/content.ts',
    ui: './src/ui/index.tsx',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@ui": path.resolve(__dirname, 'src/ui/'),
      "@shared": path.resolve(__dirname, 'src/shared/'),
      "@background": path.resolve(__dirname, 'src/background/'),
    }
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' },
      ]
  })

  ],
})

