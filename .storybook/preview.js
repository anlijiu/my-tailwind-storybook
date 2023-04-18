import './polyfill';

import Layout from './Layout';

const WithLayout = storyFn => <Layout>{storyFn()}</Layout>;

export const decorators = [WithLayout];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
