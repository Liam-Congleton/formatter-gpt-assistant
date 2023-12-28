import { PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';

async function getPDFDimensions(pdfPath) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const width = firstPage.getWidth();
  const height = firstPage.getHeight();

  console.log(`Width: ${width}, Height: ${height}`);
}

const pdfPath = process.argv[2];
getPDFDimensions(pdfPath);