import { PDFDocument, PDFPage } from 'pdf-lib';
import pdf from 'pdf-parse/lib/pdf-parse.js'
import fs from 'fs';
import path from 'path'; // import the path module

//allows for the pdf to be passed in as an argument from the command line
let pdfPath = process.argv[2];

//call the functions
getPDFDimensions(pdfPath);
extractTextFromPdf(pdfPath, '../../test_output');
isPdfEncrypted(pdfPath);

//need to account for edge cases such as different sized pages in the pdf
async function getPDFDimensions(pdfPath) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const width = firstPage.getWidth();
  const height = firstPage.getHeight();

  console.log(`Width: ${width}, Height: ${height}`);
}


//This function will take in a pdf file and return the text of pages in the pdf
function extractTextFromPdf(pdfFilePath, outputDir) {
    let dataBuffer = fs.readFileSync(pdfFilePath);

    pdf(dataBuffer).then(function(data) {
        let outputFilePath = path.join(outputDir, path.basename(pdfFilePath, '.pdf') + '.txt'); // use path.basename
        fs.writeFileSync(outputFilePath, data.text);
    });
}

async function isPdfEncrypted(pdfPath) {
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  console.log('PDF Encrypted: ' + pdfDoc.isEncrypted);
  return pdfDoc.isEncrypted;
}