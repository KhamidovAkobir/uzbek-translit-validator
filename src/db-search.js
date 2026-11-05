const { toCyrillic, toLatin } = require('./transliterator');

/**
 * Prepares a search query for dual-script PostgreSQL databases (Latin & Cyrillic)
 */
function buildBilingualSearchQuery(columnName, searchTerm) {
  if (!searchTerm || typeof searchTerm !== 'string') return { query: '', params: [] };
  const cleanTerm = searchTerm.trim();
  const latinVersion = toLatin(cleanTerm);
  const cyrillicVersion = toCyrillic(cleanTerm);

  // Returns variations for SQL ILIKE / OR queries
  const variations = Array.from(new Set([cleanTerm, latinVersion, cyrillicVersion]));
  const conditions = variations.map(() => `${columnName} ILIKE ?`).join(' OR ');
  const params = variations.map(v => `%${v}%`);

  return {
    sql: `(${conditions})`,
    params
  };
}

module.exports = { buildBilingualSearchQuery };
