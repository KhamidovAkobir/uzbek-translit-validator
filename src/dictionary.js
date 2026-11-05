/**
 * Morphological and orthographic exceptions in Uzbek Latin-Cyrillic conversion
 */
const latinToCyrillicExceptions = {
  "mo'jiza": "мўъжиза",
  "Mo'jiza": "Мўъжиза",
  "mo'tabar": "мўътабар",
  "Mo'tabar": "Мўътабар",
  "mo'tadil": "мўътадил",
  "sentabr": "сентябрь",
  "Sentabr": "Сентябрь",
  "oktabr": "октябрь",
  "Oktabr": "Октябрь",
  "byudjet": "бюджет",
  "Byudjet": "Бюджет",
  "rejissyor": "режиссёр",
  "ashyo": "ашё",
  "Ashyo": "Ашё",
  "obyekt": "объект",
  "subyekt": "субъект"
};

const cyrillicToLatinExceptions = Object.fromEntries(
  Object.entries(latinToCyrillicExceptions).map(([k, v]) => [v, k])
);

const telecomCarriers = {
  "90": "Beeline",
  "91": "Beeline",
  "93": "Ucell",
  "94": "Ucell",
  "50": "Ucell",
  "95": "Uztelecom",
  "99": "Uztelecom",
  "77": "Uztelecom",
  "97": "Mobiuz",
  "88": "Mobiuz",
  "98": "Perfectum",
  "33": "Humans",
  "20": "OQ"
};

module.exports = {
  latinToCyrillicExceptions,
  cyrillicToLatinExceptions,
  telecomCarriers
};
