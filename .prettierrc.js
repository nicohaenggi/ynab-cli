module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 140,
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
};
