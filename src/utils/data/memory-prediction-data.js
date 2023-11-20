// Some Dummy Options Array
export const VENDOR = [
  {
    id: 0,
    name: "ARM",
    value: "ARM",
  },
];

export const TECH = [
  {
    id: 0,
    name: "12LPP",
    value: "12LPP",
  },
  {
    id: 1,
    name: "22FDX",
    value: "22FDX",
  },
];

export const MEMTYPE = [
  {
    id: 0,
    name: "SRAM",
    value: "sram",
  },
  {
    id: 1,
    name: "RF",
    value: "rf",
  },
];

export const PORTTYPE = [
  {
    id: 0,
    name: "SP",
    value: "sp",
  },
  {
    id: 1,
    name: "2P",
    value: "2p",
  },
  {
    id: 2,
    name: "DP",
    value: "dp",
  },
  {
    id: 3,
    name: "2P1R1RW",
    value: "2p1r1rw",
  },
];

export const HDHSTYPE = [
  {
    id: 0,
    name: "HDF",
    value: "hdf",
  },
  {
    id: 1,
    name: "HSC",
    value: "hsc",
  },
  {
    id: 2,
    name: "HSE",
    value: "hse",
  },
  {
    id: 3,
    name: "UHSE",
    value: "uhse",
  },
  {
    id: 4,
    name: "UHDE",
    value: "uhde",
  },
];

export const VTTYPE = [
  {
    id: 0,
    name: "RVT",
    value: "r",
  },
  {
    id: 1,
    name: "LVT",
    value: "l",
  },
];

// export const WORDS = ["4", "8", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "68", "72", "76", "80", "84", "88", "92", "96", "100", "104", "108", "112", "116", "120", "124", "128", "132", "136", "140", "144", "148", "152", "156", "160", "164", "168", "172", "176", "180", "184", "188", "192", "196", "200", "204", "208", "212", "216", "220", "224", "228", "232", "236", "240", "244", "248", "252", "256", "260", "264", "268", "272", "276", "280", "284", "288", "292", "296", "300", "304", "308", "312", "316", "320", "324", "328", "332", "352", "384", "416", "448", "480", "512", "544", "576", "640", "672", "704", "768", "800", "832", "896", "928", "960", "1024", "1088", "1152", "1280", "1344", "1536", "1600", "1664", "1792", "1856", "2048", "2176", "2560", "2688", "3072", "3200", "3584", "3712", "4096", "5120", "6144", "7168", "8192", "10240", "12288", "14336", "16384", "20480", "24576", "28672", "32768"]
export const WORDS = [];
// export const BITS = ["4", "8", "9", "14", "19", "20", "24", "34", "40", "44", "48", "64", "80", "84", "88", "124", "128", "160"]
export const BITS = [];


export const DATA_COMBINATION = [
  "sram_sp_hse_lvt",
  "sram_sp_hse_rvt",
  "sram_sp_hdf_lvt",
  "sram_sp_hdf_rvt",
  "sram_2p_hse_rvt",
  "sram_2p_hse_lvt",
  "sram_dp_hse_rvt",
  "sram_dp_hse_lvt",
  "rf_sp_uhse_lvt",
  "rf_sp_hse_rvt",
  "rf_sp_hse_lvt",
  "rf_2p_hsc_rvt",
  "rf_2p_hsc_lvt"
]

export const DATA_COMBINATION_22FDX = [
  "sram_sp_hd_hvt_ag1",
  "sram_sp_hd_rvt_ag1",
  "rf_sp_hd_rvt_ag1",
  "rf_2p_hd_rvt_ag1",
  "rf_sp_hd_hvt_ag0",
  "rf_sp_hs_rvt_ag1",
  "rf_2p_uhd_rvt_ag1",
  "sram_sp_uhd_hvt_ag1",
]