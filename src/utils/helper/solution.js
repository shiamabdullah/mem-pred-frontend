function range(startAt, size, range) {
  let temp = [];
  for (let i = startAt; i < size; i += range) {
    temp.push(i);
  }
  return temp;
}

let specs = [
  ["key1", 2, 2, range(256, 1025, 8), range(8, 161, 2)],
  ["key2", 2, 4, range(512, 2049, 16), range(8, 161, 2)],
  ["key3", 4, 2, range(512, 2049, 16), range(4, 161, 1)],
  ["key4", 4, 4, range(1024, 4097, 32), range(4, 161, 1)],
  ["key5", 4, 8, range(2048, 8193, 64), range(4, 161, 1)],
  ["key6", 8, 2, range(1024, 4097, 32), range(4, 161, 1)],
  ["key7", 8, 4, range(2048, 8193, 64), range(4, 161, 1)],
  ["key8", 8, 8, range(4096, 16385, 128), range(4, 161, 1)],
  ["key9", 16, 2, range(2048, 8193, 64), range(4, 81, 1)],
  ["key10", 16, 4, range(4096, 16385, 128), range(4, 81, 1)],
  ["key11", 16, 8, range(8192, 32769, 256), range(4, 81, 1)],
  ["key12", 16, 2, range(2048, 8193, 64), range(4, 81, 1)],
  ["key13", 16, 4, range(4096, 16385, 128), range(4, 81, 1)],
  ["key14", 16, 8, range(8192, 32769, 256), range(4, 81, 1)],
  ["key15", 2, 2, range(256, 1025, 8), range(8, 161, 2)],
  ["key16", 2, 4, range(512, 2049, 16), range(8, 161, 2)],
  ["key17", 4, 2, range(512, 2049, 16), range(4, 161, 1)],
  ["key18", 4, 4, range(1024, 4097, 32), range(4, 161, 1)],
  ["key19", 4, 8, range(2048, 8193, 64), range(4, 161, 1)],
  ["key20", 8, 2, range(1024, 4097, 32), range(4, 161, 1)],
  ["key21", 8, 4, range(2048, 8193, 64), range(4, 161, 1)],
  ["key22", 8, 8, range(4096, 16385, 128), range(4, 161, 1)],
];

function findUniqueValues(arr) {
  return [...new Set(arr)];
}

export function find_indexes(num1, num2) {

  const matching_indexes = [];
  const matching_mux = [];
  const matching_banks = [];
  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];

    if (spec[3].includes(num1) && spec[4].includes(num2)) {
      matching_indexes.push(i);
      matching_mux.push(spec[1]);
      matching_banks.push(spec[2]);
    }
  }


  return {
    matching_mux: findUniqueValues(matching_mux),
    matching_banks: findUniqueValues(matching_banks),
    matching_indexes: matching_indexes,
  };
}

// console.log(find_indexes(1024, 150));
