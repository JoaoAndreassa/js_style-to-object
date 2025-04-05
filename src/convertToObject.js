'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
'use strict';

function convertToObject(sourceString) {
  const styleEntries = sourceString
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item.includes(':'));

  const styleObject = styleEntries.reduce((acc, entry) => {
    const colonIndex = entry.indexOf(':');

    const key = entry
      .slice(0, colonIndex)
      .replaceAll(' ', '')
      .replaceAll('\n', '')
      .replaceAll('\t', '');

    const rawValue = entry.slice(colonIndex + 1);
    const value = cleanStyleValue(rawValue);

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return styleObject;
}

// Separação da lógica de limpeza de valor para melhorar a leitura
function cleanStyleValue(valueString) {
  const chars = valueString.split('');
  const hasComma = chars.includes(',');

  if (hasComma) {
    const firstNonSpaceIndex = chars.findIndex(
      (char) => char !== ' ' && char !== '\n' && char !== '\t',
    );

    return chars.slice(firstNonSpaceIndex).join('');
  }

  const cleaned = chars
    .join('')
    .replaceAll('\n', '')
    .replaceAll('"', '')
    .replaceAll('\t', '');

  const firstIndex = [...cleaned].findIndex((char) => char !== ' ');
  const lastIndex = [...cleaned].findLastIndex((char) => char !== ' ');

  return cleaned.slice(firstIndex, lastIndex + 1);
}

module.exports = convertToObject;
