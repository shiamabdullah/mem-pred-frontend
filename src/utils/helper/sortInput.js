import { DATA_COMBINATION, DATA_COMBINATION_22FDX } from "../data/memory-prediction-data";

const filterUniqeData = (index, predictionInput) => {
  let value = '';
  if (index === 1) {
    value = predictionInput?.mem_type
  } else if (index === 2) {
    value = predictionInput?.mem_type + '_' + predictionInput?.port;
  } else if (index === 3) {
    value = predictionInput?.mem_type + '_' + predictionInput?.port + '_' + predictionInput?.hd_or_hs;
  }

  const uniqueValues = [];
  const filterData = DATA_COMBINATION.filter((item) => item.includes(value));
  const reStructuredData = filterData.map((data) => {
    const port = data.split('_')[index];
    if (uniqueValues.includes(port)) {
      return;
    }
    uniqueValues.push(port);
  });

  return uniqueValues;
};

export const filteredOptionsData = (index, optionsData, predictionInput) => {
  const options = filterUniqeData(index, predictionInput);
  let filteredOptions = [];

  if (index !== 3) {
    filteredOptions = optionsData.filter((option) => options.includes(option.value));
  } else {
    filteredOptions = optionsData.filter((option) => options.includes(option.name.toLowerCase()));
  }

  return filteredOptions;
};

const filterUniqeData22Fdx = (index, predictionInput) => {
  let value = '';
  if (index === 1) {
    value = predictionInput?.mem_type
  } else if (index === 2) {
    value = predictionInput?.mem_type + '_' + predictionInput?.port;
  } else if (index === 3) {
    value = predictionInput?.mem_type + '_' + predictionInput?.port + '_' + predictionInput?.hd_or_hs;
  }

  const uniqueValues = [];
  const filterData = DATA_COMBINATION_22FDX.filter((item) => item.includes(value));
  const reStructuredData = filterData.map((data) => {
    const port = data.split('_')[index];
    if (uniqueValues.includes(port)) {
      return;
    }
    uniqueValues.push(port);
  });

  return uniqueValues;
};

export const filteredOptionsData22fdx = (index, optionsData, predictionInput) => {
  const options = filterUniqeData22Fdx(index, predictionInput);
  console.log(optionsData, index)
  let filteredOptions = optionsData.filter((option) => options.includes(option.value));

  return filteredOptions;
};