const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-icons/fa': path.resolve(__dirname, 'node_modules/react-icons/fa/index.esm.js'),
    },
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
  },
  ignoreWarnings: [
    {
      module: /node_modules[\\/]@mediapipe[\\/]tasks-vision[\\/]/,
      message: /Failed to parse source map/,
    },
  ],
};