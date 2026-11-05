const compoundRules = [
  { lat: /O'|Oʻ|O`/g, cyr: 'Ў' },
  { lat: /o'|oʻ|o`/g, cyr: 'ў' },
  { lat: /G'|Gʻ|G`/g, cyr: 'Ғ' },
  { lat: /g'|gʻ|g`/g, cyr: 'ғ' },
  { lat: /Sh|SH/g, cyr: 'Ш' },
  { lat: /sh/g, cyr: 'ш' },
  { lat: /Ch|CH/g, cyr: 'Ч' },
  { lat: /ch/g, cyr: 'ч' },
  { lat: /Yo|YO/g, cyr: 'Ё' },
  { lat: /yo/g, cyr: 'ё' },
  { lat: /Yu|YU/g, cyr: 'Ю' },
  { lat: /yu/g, cyr: 'ю' },
  { lat: /Ya|YA/g, cyr: 'Я' },
  { lat: /ya/g, cyr: 'я' },
  { lat: /Ye|YE/g, cyr: 'Е' },
  { lat: /ye/g, cyr: 'е' },
  { lat: /'|ʻ|`/g, cyr: 'ъ' }
];

const singleCharMap = {
  A: 'А', a: 'а', B: 'Б', b: 'б', D: 'Д', d: 'д', E: 'Э', e: 'э',
  F: 'Ф', f: 'ф', G: 'Г', g: 'г', H: 'Ҳ', h: 'ҳ', I: 'И', i: 'и',
  J: 'Ж', j: 'ж', K: 'К', k: 'к', L: 'Л', l: 'л', M: 'М', m: 'м',
  N: 'Н', n: 'н', O: 'О', o: 'о', P: 'П', p: 'п', Q: 'Қ', q: 'қ',
  R: 'Р', r: 'р', S: 'С', s: 'с', T: 'Т', t: 'т', U: 'У', u: 'у',
  V: 'В', v: 'в', X: 'Х', x: 'х', Y: 'Й', y: 'й', Z: 'З', z: 'з'
};

function toCyrillic(text) {
  if (!text || typeof text !== 'string') return '';
  let result = text;
  for (const rule of compoundRules) {
    result = result.replace(rule.lat, rule.cyr);
  }
  return result.split('').map(char => singleCharMap[char] || char).join('');
}

function toLatin(text) {
  if (!text || typeof text !== 'string') return '';
  const reverseMap = {
    'Ў': "O'", 'ў': "o'", 'Ғ': "G'", 'ғ': "g'", 'Ш': 'Sh', 'ш': 'sh',
    'Ч': 'Ch', 'ч': 'ch', 'Ё': 'Yo', 'ё': 'yo', 'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya', 'Е': 'Ye', 'е': 'ye', 'ъ': "'", 'Ъ': "'",
    'А': 'A', 'а': 'a', 'Б': 'B', 'б': 'b', 'Д': 'D', 'д': 'd',
    'Э': 'E', 'э': 'e', 'Ф': 'F', 'ф': 'f', 'Г': 'G', 'г': 'g',
    'Ҳ': 'H', 'ҳ': 'h', 'И': 'I', 'и': 'i', 'Ж': 'J', 'ж': 'j',
    'К': 'K', 'к': 'k', 'Л': 'L', 'л': 'l', 'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n', 'О': 'O', 'о': 'o', 'П': 'P', 'п': 'p',
    'Қ': 'Q', 'қ': 'q', 'Р': 'R', 'р': 'r', 'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't', 'У': 'U', 'у': 'u', 'В': 'V', 'в': 'v',
    'Х': 'X', 'х': 'x', 'Й': 'Y', 'й': 'y', 'З': 'Z', 'з': 'z'
  };
  return text.split('').map(char => reverseMap[char] || char).join('');
}

function isValidUzbekPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?998(90|91|93|94|95|97|98|99|33|50|77|88)\d{7}$/.test(cleaned);
}

function isValidPINFL(pinfl) {
  if (typeof pinfl !== 'string') return false;
  return /^[1-6]\d{13}$/.test(pinfl.trim());
}

function isValidTIN(tin) {
  if (typeof tin !== 'string') return false;
  return /^\d{9}$/.test(tin.trim());
}

module.exports = { toCyrillic, toLatin, isValidUzbekPhone, isValidPINFL, isValidTIN };
