const transliterator = require('./src/transliterator');
const validators = require('./src/validators');
const formatters = require('./src/formatters');
const dbSearch = require('./src/db-search');
const sms = require('./src/sms');
const dictionary = require('./src/dictionary');

module.exports = {
  ...transliterator,
  ...validators,
  ...formatters,
  ...dbSearch,
  ...sms,
  dictionary
};
