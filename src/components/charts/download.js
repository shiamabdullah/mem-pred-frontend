import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export async function exportMultipleChartsToPdf(
  setDownload,
  generateFileNameForChartName,
  memoryInput
) {
  setDownload(true);
  const doc = new jsPDF("p", "px");

  const elements = document.getElementsByClassName("multiple-output-chart");

  await creatPdf({ doc, elements });

  const chartName = generateFileNameForChartName(memoryInput);

  doc.save(`${chartName}.pdf`);
  setDownload(false);
}

async function creatPdf({ doc, elements }) {
  const padding = 20;
  const marginTop = 20;
  let top = marginTop;

  for (let i = 0; i < elements.length; i++) {
    const el = elements.item(i);
    const imgData = await htmlToImage.toPng(el);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    const pageWidth = doc.internal.pageSize.getWidth();

    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      elHeight = elHeight * ratio - padding * 2;
      elWidth = elWidth * ratio - padding * 2;
    }

    const pageHeight = doc.internal.pageSize.getHeight();

    if (top + elHeight > pageHeight) {
      doc.addPage();
      top = marginTop;
    }

    doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
    top += elHeight + marginTop;
  }
}
