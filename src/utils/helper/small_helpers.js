export function isWordsBitsSelected(config) {
  const { words, bits } = config;

  const wordsString = Array.isArray(words) ? words[0] : words;
  const bitsString = Array.isArray(bits) ? bits[0] : bits;
  return { words: wordsString, bits: bitsString };
}
