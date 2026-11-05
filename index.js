const transliterator = require('./src/transliterator');
const validators = require('./src/validators');
const formatters = require('./src/formatters');
const dictionary = require('./src/dictionary');

module.exports = {
  ...transliterator,
  ...validators,
  ...formatters,
  dictionary
};
