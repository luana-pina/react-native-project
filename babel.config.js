module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          "@components": "./src/components",
          "@constants": "./src/shared/constants",
          "@interfaces": "./src/shared/interfaces",
          "@providers": "./src/shared/providers",
          "@store": "./src/shared/store",
          "@utils": "./src/shared/utils",
        },
      },
    ],
  };
};
