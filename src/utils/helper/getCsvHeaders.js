export default function getCsvHeadersMultipleData(data) {
  const selectedDataKeys = Object.keys(data[0]);
  const headers = [];
  for (const key of selectedDataKeys) {
    headers.push({
      label: key,
      key,
    });
  }
  return headers;
}
