export default function generateCompareData(selectedData) {
  const selectedDataKeys = Object.keys(selectedData);
  const numSelectedDataKeys = selectedDataKeys.length;
  console.log({ numSelectedDataKeys });
  const features = Object.keys(JSON.parse(selectedData[selectedDataKeys[1]]));
  const colNames = [
    "Features",
    ...selectedDataKeys,
    ...(numSelectedDataKeys > 2 ? [] : ["Difference"]),
  ];
  const dataRows = [colNames];
  const numFeatures = features.length;

  for (let i = 0; i < numFeatures; i++) {
    const feature = features[i];
    const rowData = [feature];
    let featureTotal = 0;

    for (let j = 0; j < numSelectedDataKeys; j++) {
      const obj = JSON.parse(selectedData[selectedDataKeys[j]]);
      const value = obj[feature];
      rowData.push(value);

      if (typeof value === "number") {
        featureTotal += value;
      }
    }

    if (numSelectedDataKeys > 2) {
      dataRows.push(rowData);
    } else {
      //   const featureAverage = featureTotal / numSelectedDataKeys;
      const difference =
        typeof rowData[1] === "number" && typeof rowData[2] === "number"
          ? rowData[1] - rowData[2]
          : "-";
      rowData.push(difference);
      dataRows.push(rowData);
    }
  }

  return dataRows;
}
