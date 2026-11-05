const assert = require('assert');
const { toCyrillic, toLatin, isValidUzbekPhone, isValidPINFL } = require('./index');

assert.strictEqual(toCyrillic("O'zbekiston"), "Ўзбекистон");
assert.strictEqual(toLatin("Тошкент шаҳри"), "Toshkent shahri");
assert.strictEqual(isValidUzbekPhone("+998 90 123 45 67"), true);
assert.strictEqual(isValidPINFL("31234567890123"), true);

console.log("All tests passed successfully!");
