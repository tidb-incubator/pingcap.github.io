const path = require('path')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const pathJoinSrcJs = name => path.join(__dirname, 'src', 'js', name)

const generateEntry = filenames =>
  filenames.reduce(
    (acc, filename) => ({
      ...acc,
      [filename]: pathJoinSrcJs(filename),
    }),
    {}
  )

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: generateEntry([
    'about',
    'anchor',
    'app',
    'carousel',
    'community',
    'devcon',
    'devcon2021',
    'developer_sig',
    'doc',
    'hackathon2020',
    'hacking_camp_2021s2',
    'high_performance_tidb_challenge',
    'multi_slides_carousel',
    'recruit',
    'tidb_4_challenge',
    'tidb_performance_challenge',
    'tidb_planet',
    'tidb_planet_user',
    'tidb_usability_challenge',
    'video_on_modal',
  ]),
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'layouts', '_default', 'baseof.html'),
      template: path.join(__dirname, 'layouts', '_default', 'baseof.tpl.html'),
      chunks: ['app'],
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}
