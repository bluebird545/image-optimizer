import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export default {
  mode: (process.env.NODE_ENV as 'production' | 'devlopment' | undefined) ?? 'development',
  entry: './src/index.tsx', // direct webpack to enter
  module: {
    rules: [
      {
        // load .ts & .tsx through ts-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // load sass/scss files through sass-loader
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // creates style nodes from js strings
          'css-loader', // translates css into commonjs
          'postcss-loader', // process PostCSS
          'sass-loader', // compile sass to css
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins:[new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    hot: true
  },
  output: {
    // output a bundle.js fil in current dir
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
} as Configuration