import { PDFDocument, PDFPage } from 'pdf-lib';
import pdf from 'pdf-parse';
import fs from 'fs';

//allows for the pdf to be passed in as an argument from the command line
let pdfPath = process.argv[2];
getPDFDimensions(pdfPath);
extractTextFromPdf(pdfPath, '../../test_files');


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
        let outputFilePath = pdfPath.join(outputDir, pdfPath.basename(pdfFilePath, '.pdf') + '.txt');
        fs.writeFileSync(outputFilePath, data.text);
    });
}

