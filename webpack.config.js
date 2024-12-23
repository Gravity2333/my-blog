const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "./"),
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    chunkFilename: "js/[name]-[chunkhash:8].js",
    clean: true,
    // 增加 publicPath 把 src="/js/bundle.js" 使用绝对路径
    publicPath: "/",
  },
  resolveLoader: {
    extensions: [".tsx", ".js", ".ts", ".jsx", ".jsx", ".less"],
    modules: ["./src/loaders", "node_modules"],
  },
  performance: {
    maxAssetSize: 5000000000,  // 设置为 500 KiB，或者你希望的任何值
    maxEntrypointSize: 5000000000,  // 设置入口点的大小限制
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".jsx", ".jsx", ".less"],
    mainFiles: ["index"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./config"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
        ],
      },
      // CSS 文件处理规则
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        // 解析router/js
        test: /\/config\/router.js$/,
        use: "router-loader",
      },
      // 解析图片
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader', // 将图片移动到输出目录
            options: {
              name: '[name].[hash:8].[ext]',  // 设置输出文件名
              outputPath: 'images/',          // 输出路径
            },
          },
          // {
          //   loader: 'image-webpack-loader',  // 图片压缩
          //   options: {
          //     mozjpeg: {
          //       progressive: true,  // 启用渐进式渲染
          //       quality: 75,         // 设置压缩质量，0-100
          //     },
          //     optipng: {
          //       enabled: true,      // 启用 PNG 图片压缩
          //       optimizationLevel: 7,  // 压缩级别：0-7
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.90],  // 设置 PNG 压缩质量范围
          //       speed: 4,               // 压缩速度（0-10）
          //     },
          //     gifsicle: {
          //       interlaced: false,  // 是否使用隔行扫描
          //     },
          //     svgo: false  // 禁用SVG优化
          //   },
          // },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // 提取的 CSS 文件名
      chunkFilename: "css/[id].css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname,'./src/assets'),
    //       to: 'assets'
    //     }
    //   ]
    // })
  ],
  devServer: {
    port: 3000,
    hot: false,
    historyApiFallback: true, // 开启 historyApiFallback
    open: true,
    static: [path.resolve(__dirname,"./src/assets")],
  },
};
