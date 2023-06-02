import csv_headers_12llp from "../data/csv_headers_12llp";
import config from "../data/memory-input-valid-data.json";

function findUniqueValues(arr) {
  return [...new Set(arr)];
}

// A helper function to generate a range of numbers
function range(startAt, size, range) {
  const temp = new Array(Math.ceil((size - startAt + 1) / range));
  let index = 0;
  for (let i = startAt; i <= size; i += range) {
    temp[index++] = i;
  }
  return temp;
}

// Function to get the ranged configuration
function getRangedConf(config) {
  return Object.fromEntries(
    Object.entries(config).map(([key, values]) => {
      return [
        key,
        values.map(([val1, val2, arr1, arr2]) => {
          return [val1, val2, range(...arr1), range(...arr2)];
        }),
      ];
    })
  );
}

function invertRange(range) {
  const start = range[0];
  const end = range[range.length - 1];
  const step = range[1] - range[0];

  return `${start}:${end}:${step}`;
}

const data = getRangedConf(config);

export function getInputCsvStructData(name, words, bits) {
  const vt = name?.split("_") === "lvt" ? "l" : "r";
  const specs = data[name];

  const matchedSpecs = specs.filter((obj) => {
    return (
      obj[2].some((value) => value === words) &&
      obj[3].some((value) => value === bits)
    );
  });

  if (matchedSpecs.length > 0) {
    const csvData = matchedSpecs.map((obj) => {
      return {
        compiler_name: name,
        mux: obj[0],
        bank: obj[1],
        words_min_max_incr: invertRange(obj[2]).toString(),
        bits_min_max_incr: invertRange(obj[3]).toString(),
        vttype: vt,
      };
    });

    return csvData;
  } else
    return [
      {
        compiler_name: "",
        mux: "",
        bank: "",
        words_min_max_incr: "",
        bits_min_max_incr: "",
        vttype: "",
      },
    ];
}

export function findWordsBits(name) {
  let specs = data[name];
  let matchingWords = [];
  let matchingBits = [];

  if (specs) {
    for (let spec of specs) {
      matchingWords.push(...spec[2]);
      matchingBits.push(...spec[3]);
    }

    return {
      matchingWords: findUniqueValues(matchingWords),
      matchingBits: findUniqueValues(matchingBits),
    };
  } else
    return {
      matchingWords: [],
      matchingBits: [],
    };
}

export function findMuxBanks(name, words, bits) {
  let specs = data[name];
  let matchingIndexes = [];
  let matchingMux = [];
  let matchingBanks = [];

  for (let i = 0; i < specs?.length; i++) {
    let spec = specs[i];
    if (spec[2].includes(words) && spec[3].includes(bits)) {
      matchingIndexes.push(i);
      matchingMux.push(spec[0]);
      matchingBanks.push(spec[1]);
    }
  }

  return {
    matching_mux: findUniqueValues(matchingMux),
    matching_banks: findUniqueValues(matchingBanks),
  };
}

export function generate_csv_headers() {}
