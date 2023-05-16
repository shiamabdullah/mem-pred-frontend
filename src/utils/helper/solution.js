// function range(startAt, size, range) {
//   let temp = [];
//   for (let i = startAt; i <= size; i += range) {
//     temp.push(i);
//   }
//   return temp;
// }

function range(startAt, size, range) {
  // optimized with array assignment at first
  const temp = new Array(Math.ceil((size - startAt + 1) / range));
  let index = 0;
  for (let i = startAt; i <= size; i += range) {
    temp[index++] = i;
  }
  return temp;
}

let config = {
  //  sram_sp_hse_rvt_mvt_range_src.csv
  sram_sp_hse_lvt: [
    [2, 2, range(256, 1024, 8), range(8, 160, 2)],
    [2, 4, range(512, 2048, 16), range(8, 160, 2)],
    [4, 2, range(512, 2048, 16), range(4, 160, 1)],
    [4, 4, range(1024, 4096, 32), range(4, 160, 1)],
    [4, 8, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 2, range(1024, 4096, 32), range(4, 160, 1)],
    [8, 4, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 8, range(4096, 16384, 128), range(4, 160, 1)],
    [16, 2, range(2048, 8192, 64), range(4, 80, 1)],
    [16, 4, range(4096, 16384, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
    [16, 2, range(2048, 8192, 64), range(4, 80, 1)],
    [16, 4, range(4096, 16384, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
  ],
  sram_sp_hse_rvt: [
    [2, 2, range(256, 1024, 8), range(8, 160, 2)],
    [2, 4, range(512, 2048, 16), range(8, 160, 2)],
    [4, 2, range(512, 2048, 16), range(4, 160, 1)],
    [4, 4, range(1024, 4096, 32), range(4, 160, 1)],
    [4, 8, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 2, range(1024, 4096, 32), range(4, 160, 1)],
    [8, 4, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 8, range(4096, 16384, 128), range(4, 160, 1)],
    [16, 2, range(2048, 8192, 64), range(4, 80, 1)],
    [16, 4, range(4096, 16384, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
    [16, 2, range(2048, 8192, 64), range(4, 80, 1)],
    [16, 4, range(4096, 16384, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
  ],
  // sram_sp_hdf_rvt_mvt_range_src.csv
  sram_sp_hdf_lvt: [
    [4, 1, range(512, 2048, 8), range(4, 160, 1)],
    [4, 2, range(512, 4096, 16), range(4, 160, 1)],
    [4, 4, range(1024, 8192, 32), range(4, 160, 1)],
    [4, 8, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 1, range(1024, 4096, 16), range(4, 80, 1)],
    [8, 2, range(1024, 8192, 32), range(4, 160, 1)],
    [8, 4, range(2048, 16384, 64), range(4, 160, 1)],
    [8, 8, range(4096, 16384, 128), range(4, 160, 1)],
    [16, 2, range(2048, 16384, 64), range(4, 80, 1)],
    [16, 4, range(4096, 32768, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
    [32, 2, range(4096, 32768, 128), range(4, 40, 1)],
    [32, 4, range(8192, 65536, 256), range(4, 40, 1)],
  ],

  sram_sp_hdf_rvt: [
    [4, 1, range(512, 2048, 8), range(4, 160, 1)],
    [4, 2, range(512, 4096, 16), range(4, 160, 1)],
    [4, 4, range(1024, 8192, 32), range(4, 160, 1)],
    [4, 8, range(2048, 8192, 64), range(4, 160, 1)],
    [8, 1, range(1024, 4096, 16), range(4, 80, 1)],
    [8, 2, range(1024, 8192, 32), range(4, 160, 1)],
    [8, 4, range(2048, 16384, 64), range(4, 160, 1)],
    [8, 8, range(4096, 16384, 128), range(4, 160, 1)],
    [16, 2, range(2048, 16384, 64), range(4, 80, 1)],
    [16, 4, range(4096, 32768, 128), range(4, 80, 1)],
    [16, 8, range(8192, 32768, 256), range(4, 80, 1)],
    [32, 2, range(4096, 32768, 128), range(4, 40, 1)],
    [32, 4, range(8192, 65536, 256), range(4, 40, 1)],
  ],

  //   Sram_sp_2p_hse_rvt_mvt_range_src.csv
  sram_2p_hse_rvt: [
    [(2, 2, range(256, 1024, 8)), range(8, 160, 2)],
    [(2, 4, range(512, 2048, 16)), range(8, 160, 2)],
    [(4, 2, range(512, 2048, 16)), range(4, 160, 1)],
    [(4, 4, range(1024, 4096, 32)), range(4, 160, 1)],
    [(4, 8, range(2048, 8192, 64)), range(4, 160, 1)],
    [(8, 2, range(1024, 4096, 32)), range(4, 80, 1)],
    [(8, 4, range(2048, 8192, 64)), range(4, 80, 1)],
    [(8, 8, range(4096, 16384, 128)), range(4, 80, 1)],
  ],
  sram_2p_hse_lvt: [
    [(2, 2, range(256, 1024, 8)), range(8, 160, 2)],
    [(2, 4, range(512, 2048, 16)), range(8, 160, 2)],
    [(4, 2, range(512, 2048, 16)), range(4, 160, 1)],
    [(4, 4, range(1024, 4096, 32)), range(4, 160, 1)],
    [(4, 8, range(2048, 8192, 64)), range(4, 160, 1)],
    [(8, 2, range(1024, 4096, 32)), range(4, 80, 1)],
    [(8, 4, range(2048, 8192, 64)), range(4, 80, 1)],
    [(8, 8, range(4096, 16384, 128)), range(4, 80, 1)],
  ],
  //  sram_dp_hse_rvt_mvt_range_src.csv

  sram_dp_hse_rvt: [
    [4, 1, range(32, 1024, 16), range(4, 80, 1)],
    [4, 2, range(256, 2048, 32), range(4, 80, 1)],
    [4, 4, range(512, 4096, 64), range(4, 80, 1)],
    [4, 8, range(1024, 4096, 128), range(4, 80, 1)],
    [8, 1, range(64, 2048, 32), range(4, 40, 1)],
    [8, 2, range(512, 4096, 64), range(4, 40, 1)],
    [8, 4, range(1024, 8192, 128), range(4, 40, 1)],
    [8, 8, range(2048, 8192, 256), range(4, 40, 1)],
    [16, 1, range(128, 4096, 64), range(4, 20, 1)],
    [16, 2, range(1024, 8192, 128), range(4, 20, 1)],
    [16, 4, range(2048, 16384, 256), range(4, 20, 1)],
    [16, 8, range(4096, 16384, 512), range(4, 20, 1)],
  ],
  sram_dp_hse_lvt: [
    [4, 1, range(32, 1024, 16), range(4, 80, 1)],
    [4, 2, range(256, 2048, 32), range(4, 80, 1)],
    [4, 4, range(512, 4096, 64), range(4, 80, 1)],
    [4, 8, range(1024, 4096, 128), range(4, 80, 1)],
    [8, 1, range(64, 2048, 32), range(4, 40, 1)],
    [8, 2, range(512, 4096, 64), range(4, 40, 1)],
    [8, 4, range(1024, 8192, 128), range(4, 40, 1)],
    [8, 8, range(2048, 8192, 256), range(4, 40, 1)],
    [16, 1, range(128, 4096, 64), range(4, 20, 1)],
    [16, 2, range(1024, 8192, 128), range(4, 20, 1)],
    [16, 4, range(2048, 16384, 256), range(4, 20, 1)],
    [16, 8, range(4096, 16384, 512), range(4, 20, 1)],
  ],

  // rf_sp_uhse_rvt_mvt_range_src.csv
  rf_sp_uhse_lvt: [
    [1, 1, range(8, 256, 2), range(8, 320, 4)],
    [2, 1, range(16, 512, 4), range(4, 160, 2)],
    [4, 1, range(64, 1024, 8), range(4, 160, 1)],
    [8, 1, range(128, 2048, 16), range(4, 80, 1)],
  ],

  //   rf_sp_hse_rvt_mvt_range_src.csv
  rf_sp_hse_rvt: [
    [2, 1, range(16, 512, 4), range(4, 160, 2)],
    [4, 1, range(64, 1024, 8), range(4, 160, 1)],
    [8, 1, range(128, 2048, 16), range(4, 80, 1)],
  ],
  rf_sp_hse_lvt: [
    [2, 1, range(16, 512, 4), range(4, 160, 2)],
    [4, 1, range(64, 1024, 8), range(4, 160, 1)],
    [8, 1, range(128, 2048, 16), range(4, 80, 1)],
  ],

  //   rf_2p_hsc_rvt_mvt_range_src
  rf_2p_hsc_rvt: [
    [1, 1, range(4, 64, 2), range(4, 160, 2)],
    [1, 2, range(8, 128, 4), range(4, 160, 2)],
    [1, 4, range(16, 256, 8), range(4, 160, 2)],
    [1, 8, range(32, 512, 16), range(4, 160, 2)],
    [2, 1, range(8, 128, 4), range(4, 160, 1)],
    [2, 2, range(16, 256, 8), range(4, 160, 1)],
    [2, 4, range(32, 512, 16), range(4, 160, 1)],
    [2, 8, range(64, 1024, 32), range(4, 160, 1)],
    [4, 1, range(16, 256, 8), range(4, 80, 1)],
    [4, 2, range(32, 512, 16), range(4, 80, 1)],
    [4, 4, range(64, 1024, 32), range(4, 80, 1)],
    [4, 8, range(128, 2048, 64), range(4, 80, 1)],
    [8, 1, range(32, 512, 16), range(4, 40, 1)],
    [8, 2, range(64, 1024, 32), range(4, 40, 1)],
    [8, 4, range(128, 2048, 64), range(4, 40, 1)],
    [8, 8, range(256, 4096, 128), range(4, 40, 1)],
  ],

  rf_2p_hsc_lvt: [
    [1, 1, range(4, 64, 2), range(4, 160, 2)],
    [1, 2, range(8, 128, 4), range(4, 160, 2)],
    [1, 4, range(16, 256, 8), range(4, 160, 2)],
    [1, 8, range(32, 512, 16), range(4, 160, 2)],
    [2, 1, range(8, 128, 4), range(4, 160, 1)],
    [2, 2, range(16, 256, 8), range(4, 160, 1)],
    [2, 4, range(32, 512, 16), range(4, 160, 1)],
    [2, 8, range(64, 1024, 32), range(4, 160, 1)],
    [4, 1, range(16, 256, 8), range(4, 80, 1)],
    [4, 2, range(32, 512, 16), range(4, 80, 1)],
    [4, 4, range(64, 1024, 32), range(4, 80, 1)],
    [4, 8, range(128, 2048, 64), range(4, 80, 1)],
    [8, 1, range(32, 512, 16), range(4, 40, 1)],
    [8, 2, range(64, 1024, 32), range(4, 40, 1)],
    [8, 4, range(128, 2048, 64), range(4, 40, 1)],
    [8, 8, range(256, 4096, 128), range(4, 40, 1)],
  ],
};

function findUniqueValues(arr) {
  return [...new Set(arr)];
}

export function findWordsBits(name) {
  let specs = config[name];
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
  let specs = config[name];
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
