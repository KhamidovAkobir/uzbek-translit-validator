const assert = require('assert');
const {
  toCyrillic,
  toLatin,
  isValidUzbekPhone,
  parsePINFL,
  formatUZS,
  buildBilingualSearchQuery,
  UzbekSMSClient
} = require('./index');

console.log('Running advanced SDK test suite...\n');

assert.strictEqual(toCyrillic("O'zbekiston"), "Ўзбекистон");
assert.strictEqual(isValidUzbekPhone("+998901234567"), true);
assert.strictEqual(parsePINFL("31505951234569").valid, true);
assert.strictEqual(formatUZS(5000000), "5 000 000 so'm");

// Test bilingual search builder
const search = buildBilingualSearchQuery('title', 'Toshkent');
assert.strictEqual(search.params.length > 0, true);

// Test SMS client mock
const smsClient = new UzbekSMSClient({ provider: 'eskiz' });
smsClient.sendOTP('+998901234567', '4829').then(res => {
  assert.strictEqual(res.success, true);
  console.log('✓ Bilingual DB search & SMS OTP adapters passed');
  console.log('\nAll advanced SDK test suites passed successfully!');
});
