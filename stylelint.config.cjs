module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    // https://github.com/necolas/idiomatic-css#declaration-order
    'stylelint-config-idiomatic-order',
  ],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    // a fork of stylelint-a11y that fixes peer dependency issues
    '@double-great/stylelint-a11y',
  ],
  rules: {
    'media-feature-range-notation': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'color-hex-length': null,
    'property-no-vendor-prefix': null,
    'a11y/media-prefers-reduced-motion': null,
    'a11y/no-outline-none': null,
    'a11y/selector-pseudo-class-focus': null,
    'plugin/declaration-block-no-ignored-properties': true,
  }
};