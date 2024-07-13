const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
            publicPath: '/_next/static/assets/',
          },
        },
      ],
    });

    return config;
  },
};
