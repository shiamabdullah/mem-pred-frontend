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

const data = getRangedConf(config);

export function getInputCsvStructData(name) {
  const specs = config[name];
  //   const parsedArray = specs.split("_");
  //   console.log(parsedArray[3]);

  const csvHeaders = [
    { label: "compiler_name", key: "compiler_name" },
    { label: "mux", key: "mux" },
    { label: "bank", key: "bank" },
    { label: "words_min_max_incr", key: "words_min_max_incr" },
    { label: "bits_min_max_incr", key: "bits_min_max_incr" },
    { label: "vttype", key: "vttype" },
  ];

  const csvData = specs.map((obj) => {
    return {
      compiler_name: name,
      mux: obj[0],
      bank: obj[1],
      words_min_max_incr: obj[2],
      bits_min_max_incr: obj[3],
    };
  });
  console.log(csvData);
  return csvData;
}

getInputCsvStructData("sram_sp_hse_lvt");

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
