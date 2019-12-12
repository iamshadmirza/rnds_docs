const path = require("path");
const threadLoader = require("thread-loader");

const jsWorkerCommonOptions = {
  workers: 2,
  workerParallelJobs: 50,
  poolParallelJobs: 50
};

const babelWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: "babel-pool"
};

module.exports = ({ config, mode }) => {
  if (mode !== "PRODUCTION") {
    threadLoader.warmup(babelWorkerOptions, ["babel-loader"]);
  }

  config.module.rules.push({
    test: /\.jsx?$/,
    include: [
      path.resolve(__dirname, "../node_modules/react-native"),
      path.resolve(__dirname, "../node_modules/react-native-elements"),
      path.resolve(__dirname, "../node_modules/react-native-vector-icons"),
      path.resolve(__dirname, "../node_modules/@expo/vector-icons"),
    ],
    use: [
      { loader: "cache-loader" },
      { loader: "thread-loader", options: babelWorkerOptions },
      {
        loader: "babel-loader?cacheDirectory?true",
        options: {
          presets: [
            "module:metro-react-native-babel-preset",
            "@babel/preset-flow"
          ]
        }
      }
    ]
  });
  // convert react-native to react-native-web for storybook
  config.resolve.alias["react-native$"] = require.resolve("react-native-web");

  config.resolve.alias["@expo/vector-icons"] = path.resolve(
    __dirname,
    "../node_modules/react-native-vector-icons"
  );

  config.resolve.extensions.push(".js", ".jsx", ".mdx");
  return config;
};