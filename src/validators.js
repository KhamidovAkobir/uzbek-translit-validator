const { telecomCarriers } = require('./dictionary');

function isValidUzbekPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const match = cleaned.match(/^\+?998(\d{2})\d{7}$/);
  if (!match) return false;
  return Boolean(telecomCarriers[match[1]]);
}

function getPhoneCarrier(phone) {
  if (!isValidUzbekPhone(phone)) return null;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const prefix = cleaned.replace(/^\+?998/, '').slice(0, 2);
  return telecomCarriers[prefix] || null;
}

/**
 * Validates and parses 14-digit Uzbekistan PINFL (JSHSHIR)
 * Includes date validation and official [7, 3, 1] weight checksum verification
 */
function parsePINFL(pinfl, options = { verifyChecksum: false }) {
  if (typeof pinfl !== 'string') return { valid: false, error: 'PINFL must be a string' };
  const cleaned = pinfl.trim();
  if (!/^[1-6]\d{13}$/.test(cleaned)) {
    return { valid: false, error: 'Format must be 14 digits starting with gender/century index (1-6)' };
  }

  const index = parseInt(cleaned[0], 10);
  const day = parseInt(cleaned.slice(1, 3), 10);
  const month = parseInt(cleaned.slice(3, 5), 10);
  const yearShort = parseInt(cleaned.slice(5, 7), 10);

  let century = 1900;
  if (index === 1 || index === 2) century = 1800;
  if (index === 3 || index === 4) century = 1900;
  if (index === 5 || index === 6) century = 2000;

  const fullYear = century + yearShort;
  const gender = index % 2 === 1 ? 'male' : 'female';

  const birthDate = new Date(fullYear, month - 1, day);
  if (
    birthDate.getFullYear() !== fullYear ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return { valid: false, error: 'Invalid birth date encoded in PINFL' };
  }

  const weights = [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7];
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleaned[i], 10) * weights[i];
  }
  const expectedChecksum = sum % 10;
  const actualChecksum = parseInt(cleaned[13], 10);
  const checksumMatches = expectedChecksum === actualChecksum;

  if (options.verifyChecksum && !checksumMatches) {
    return { valid: false, error: 'PINFL checksum digit mismatch' };
  }

  return {
    valid: true,
    gender,
    birthDate: `${fullYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    regionCode: cleaned.slice(7, 10),
    serialNumber: cleaned.slice(10, 13),
    checksumValid: checksumMatches
  };
}

function isValidPINFL(pinfl, verifyChecksum = false) {
  return parsePINFL(pinfl, { verifyChecksum }).valid;
}

function isValidTIN(tin) {
  if (typeof tin !== 'string') return false;
  return /^[1-9]\d{8}$/.test(tin.trim());
}

function detectBankCardType(cardNumber) {
  if (typeof cardNumber !== 'string') return null;
  const cleaned = cardNumber.replace(/[\s\-]/g, '');
  if (!/^\d{16}$/.test(cleaned)) return null;
  if (cleaned.startsWith('8600') || cleaned.startsWith('5614')) return 'UZCARD';
  if (cleaned.startsWith('9860')) return 'HUMO';
  if (cleaned.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(cleaned)) return 'MASTERCARD';
  return 'UNKNOWN';
}

module.exports = {
  isValidUzbekPhone,
  getPhoneCarrier,
  parsePINFL,
  isValidPINFL,
  isValidTIN,
  detectBankCardType
};
