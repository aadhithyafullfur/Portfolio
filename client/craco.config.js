module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings for node_modules
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
        // Suppress all source map warnings from node_modules
        /Failed to parse source map/,
      ];
      
      // Disable source-map-loader for problematic packages
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && rule.use) {
          rule.use.forEach((useItem) => {
            if (useItem.loader && useItem.loader.includes('source-map-loader')) {
              if (!rule.exclude) {
                rule.exclude = [];
              }
              // Add to exclude array
              if (Array.isArray(rule.exclude)) {
                rule.exclude.push(/node_modules\/@mediapipe/);
              } else {
                rule.exclude = [rule.exclude, /node_modules\/@mediapipe/];
              }
            }
          });
        }
      });
      
      return webpackConfig;
    },
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Default middleware setup (no custom logic needed for now)
      return middlewares;
    },
  },
};