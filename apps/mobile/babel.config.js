module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui", "@aramiworks/ui"],
          config: "./src/lib/tamagui/tamagui.config.ts",
          logTimings: true,
        },
      ],
    ],
  };
};
