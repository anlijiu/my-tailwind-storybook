module.exports = () => ({
  plugins: [
    require('postcss-simple-vars')(),
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-map-get')(),
    require('postcss-preset-env')(),
    require('tailwindcss/nesting'),
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer')()
  ],
});
