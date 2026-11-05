const assert = require('assert');
const { toCyrillic, toLatin, isValidUzbekPhone, parsePINFL, isValidTIN, detectBankCardType, formatUZS } = require('./index');

assert.strictEqual(toCyrillic("O'zbekiston"), "Ўзбекистон");
assert.strictEqual(toLatin("Тошкент шаҳри"), "Toshkent shahri");
assert.strictEqual(isValidUzbekPhone("+998 90 123 45 67"), true);
assert.strictEqual(parsePINFL("31505951234569").valid, true);
assert.strictEqual(formatUZS(1000000), "1 000 000 so'm");

console.log("All SDK tests passed successfully!");
