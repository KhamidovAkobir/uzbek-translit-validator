const { latinToCyrillicExceptions, cyrillicToLatinExceptions } = require('./dictionary');

const compoundRules = [
  { lat: /O'|Oʻ|O`|O’/g, cyr: 'Ў' },
  { lat: /o'|oʻ|o`|o’/g, cyr: 'ў' },
  { lat: /G'|Gʻ|G`|G’/g, cyr: 'Ғ' },
  { lat: /g'|gʻ|g`|g’/g, cyr: 'ғ' },
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
  { lat: /Ts|TS/g, cyr: 'Ц' },
  { lat: /ts/g, cyr: 'ц' },
  { lat: /(^|\s|[-"'(])E/g, cyr: '$1Э' },
  { lat: /(^|\s|[-"'(])e/g, cyr: '$1э' },
  { lat: /'|ʻ|`|’/g, cyr: 'ъ' }
];

const singleCharMap = {
  A: 'А', a: 'а', B: 'Б', b: 'б', D: 'Д', d: 'д', E: 'Е', e: 'е',
  F: 'Ф', f: 'ф', G: 'Г', g: 'г', H: 'Ҳ', h: 'ҳ', I: 'И', i: 'и',
  J: 'Ж', j: 'ж', K: 'К', k: 'к', L: 'Л', l: 'л', M: 'М', m: 'м',
  N: 'Н', n: 'н', O: 'О', o: 'о', P: 'П', p: 'п', Q: 'Қ', q: 'қ',
  R: 'Р', r: 'р', S: 'С', s: 'с', T: 'Т', t: 'т', U: 'У', u: 'у',
  V: 'В', v: 'в', X: 'Х', x: 'х', Y: 'Й', y: 'й', Z: 'З', z: 'з'
};

function toCyrillic(text) {
  if (!text || typeof text !== 'string') return '';
  let result = text;

  for (const [latWord, cyrWord] of Object.entries(latinToCyrillicExceptions)) {
    result = result.replace(new RegExp(`\\b${latWord}\\b`, 'g'), cyrWord);
  }

  for (const rule of compoundRules) {
    result = result.replace(rule.lat, rule.cyr);
  }

  return result.split('').map(char => singleCharMap[char] || char).join('');
}

function toLatin(text) {
  if (!text || typeof text !== 'string') return '';
  let result = text;

  for (const [cyrWord, latWord] of Object.entries(cyrillicToLatinExceptions)) {
    result = result.replace(new RegExp(cyrWord, 'g'), latWord);
  }

  result = result.replace(/([аоуэияёюеўАOУЭИЯЁЮЕЎ])Ц/g, '$1Тс');
  result = result.replace(/([аоуэияёюеўАOУЭИЯЁЮЕЎ])ц/g, '$1тс');
  result = result.replace(/Ц/g, 'С').replace(/ц/g, 'с');

  const reverseMap = {
    'Ў': "O'", 'ў': "o'", 'Ғ': "G'", 'ғ': "g'", 'Ш': 'Sh', 'ш': 'sh',
    'Ч': 'Ch', 'ч': 'ch', 'Ё': 'Yo', 'ё': 'yo', 'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya', 'Е': 'E', 'е': 'e', 'ъ': "'", 'Ъ': "'",
    'ь': '', 'Ь': '',
    'А': 'A', 'а': 'a', 'Б': 'B', 'б': 'b', 'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g', 'Д': 'D', 'д': 'd', 'Ж': 'J', 'ж': 'j',
    'З': 'Z', 'з': 'z', 'И': 'I', 'и': 'i', 'Й': 'Y', 'й': 'y',
    'К': 'K', 'к': 'k', 'Л': 'L', 'л': 'l', 'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n', 'О': 'O', 'о': 'o', 'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r', 'С': 'S', 'с': 's', 'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u', 'Ф': 'F', 'ф': 'f', 'Х': 'X', 'х': 'x',
    'Қ': 'Q', 'қ': 'q', 'Ҳ': 'H', 'ҳ': 'h', 'Э': 'E', 'э': 'e'
  };

  return result.split('').map(char => (reverseMap[char] !== undefined ? reverseMap[char] : char)).join('');
}

module.exports = { toCyrillic, toLatin };
