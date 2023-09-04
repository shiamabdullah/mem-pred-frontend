import React from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import SingleChart from "../charts/single-chart";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfGenerator = ({
  keywords,
  multipleOutput,
  generateFileNameForChartName,
  memoryInput,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {keywords?.map((keyword, index) => (
        <View style={styles.section}>
          <SingleChart
            key={index}
            multipleOutput={multipleOutput}
            keyword={keyword}
            chartName={generateFileNameForChartName(memoryInput)}
          />
        </View>
      ))}
    </Page>
  </Document>
);

export default PdfGenerator;
