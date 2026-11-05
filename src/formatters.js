function formatUzbekPhone(phone) {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/\D/g, '');
  const local = cleaned.startsWith('998') ? cleaned.slice(3) : cleaned;
  if (local.length !== 9) return phone;
  return `+998 (${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7, 9)}`;
}

function maskUzbekPhone(phone) {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/\D/g, '');
  const local = cleaned.startsWith('998') ? cleaned.slice(3) : cleaned;
  if (local.length !== 9) return phone;
  return `+998 ${local.slice(0, 2)} *** ** ${local.slice(7, 9)}`;
}

function maskPINFL(pinfl) {
  if (typeof pinfl !== 'string' || pinfl.trim().length !== 14) return '';
  const c = pinfl.trim();
  return `${c.slice(0, 4)}******${c.slice(10, 14)}`;
}

function formatUZS(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
}

module.exports = {
  formatUzbekPhone,
  maskUzbekPhone,
  maskPINFL,
  formatUZS
};
