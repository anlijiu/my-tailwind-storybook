const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "webpackFinal": async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, "../src/app/components"),
      '@/hooks': path.resolve(__dirname, "../src/hooks"),
    };
    console.log("config.resolve.alias", config.resolve.alias);

    return config;
  },
  // "framework": "@storybook/react",
  "framework": {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
}
