module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@styles": ["./src/styles"],
            "@assets": ["./assets"],
            "@utils": ["./src/utils"],
            "@lib": ["./src/lib"],
            "@hooks": ["./src/hooks"],
            "@store": ["./src/store"],
            "@services": ["./src/services"],
            "@components": ["./src/components"],
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      ],
			"react-native-reanimated/plugin"
		]
  };
};
