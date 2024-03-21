const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
// Read the PDF file
const pdfBuffer = fs.readFileSync('Test PDF.pdf');

// Load the PDF document
PDFDocument.load(pdfBuffer)
  .then((pdfDoc) => {
    const pages = pdfDoc.getPages();
    console.log('PDF Document:', pages[0].doc);


  })
  .catch((err) => {
    console.error('Error loading PDF:', err);
  });

// const { PdfDocument } = require('@pomgui/pdf-tables-parser')
// const pdf = new PdfDocument();
// pdf.load('Test PDF.pdf')
//     .then(() => {
//         // console.log(pdf.pages[0].tables[0])

//         const lines = pdf.pages.map((page) => {
//             let rows = page.tables[0].data.slice(1)
//             let headers = rows[0];
//             console.log(rows);
//             let obj = {}
//             return rows.map(row => row.map((field, index) => {
//                 trimmedField = field && field.trim() || field.toString();
//                 // console.log(trimmedField);
//                 obj[headers[index]] = trimmedField;
//                 return obj
//                 // return field && field.trim() && headers[index] = field
//             }))

//         })
//         // console.log(lines[1])

//     })
//     .catch(err => console.error(err));
//////////////////////////////////////////////////////////////

// const pdf = require('pdf2json');
// const pdfParser = new pdf();
// pdfParser.loadPDF("Test PDF.pdf");
// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
// pdfParser.on("pdfParser_dataReady", pdfData => {
//     // number of rendered pages
//     // console.log(data.numrender);
//     // // PDF info
//     // console.log(data.info);
//     // // PDF metadata
//     // console.log(data.metadata);
//     // // PDF.js version
//     // // check https://mozilla.github.io/pdf.js/getting_started/
//     // console.log(pdfData.Pages[0].Texts);
//     // console.log(pdfData.Pages[0].Texts[0]);
//     // console.log(pdfData.Pages[0].Texts[1]);
//     // console.log(pdfData.Pages[0].Texts[2]);
//     // console.log(pdfData.Pages[0].Texts[3]);
//     // console.log(pdfData.Pages[0].Texts[4]);
//     // console.log(pdfData.Pages[0].Texts[5]);
//     // console.log(pdfData.Pages[0].Texts[6]);
//     // console.log(pdfData.Pages[0].Texts[7]);
//     // console.log(pdfData.Pages[0].Texts[8]);
//     // console.log(pdfData.Pages[0].Texts[9]);
//     // console.log(pdfData.Pages[0].Texts[10]);
//     // console.log(pdfData.Pages[0].Texts[11]);
//     // console.log(pdfData.Pages[0].Texts[12]);
//     // console.log(pdfData.Pages[0].Texts[13]);
//     // console.log(pdfData.Pages[0].Texts[14]);
//     // console.log(pdfData.Pages[0].Texts[15]);
//     // console.log(pdfData.Pages[0].Texts[33]);
//     // console.log(pdfData.Pages[0].Texts[52]);
//     // console.log(pdfData.Pages[0].Texts[71]);
//     console.log(pdfData.Pages[0].Texts[88]);
//     console.log(pdfData.Pages[0].Texts[107]);
//     // PDF text
//     let interval = 18
//     let intialTerm = 0
//     for (let i = 33; i < pdfData.Pages[0].Texts.length; i+=19) {
//         // intialTerm = intialTerm + interval
//         // console.log(i)
//         // console.log(pdfData.Pages[0].Texts[i].R[0]["T"])

//         const line = pdfData.Pages[0].Texts[i].R[0]["T"].replace(/(%20|\r?\n|\r)/g, " ").replace(/%2F/g, "/").replace(/%2C/g, ",").trim();

//         if (line !== "" && !line.includes("Page") && line !== "%20%20%20%20%20%20%20%20%20" && line !== "%20%20%20" && line !== "%20" && line !== "%20%20%20%20" && line !== "%20%20%20%20%20%20") {
//             // console.log(JSON.stringify(line))
//             // console.log(i== 19)

//         }

//     }

//     for (let [index, line] of pdfData.Pages[0].Texts.entries()) {

//         // console.log(line,index)

//         // pdfData.Pages[0].Texts.map((a, index) => {
//         if (!line.R[0]["T"].includes("Page") && line.R[0]["T"] !== "%20%20%20%20%20%20%20%20%20" && line.R[0]["T"] !== "%20%20%20" && line.R[0]["T"] !== "%20" && line.R[0]["T"] !== "%20%20%20%20" && line.R[0]["T"] !== "%20%20%20%20%20%20") {
//             const processedText = line.R[0]["T"].replace(/(%20|\r?\n|\r)/g, " ");
//             // console.log(processedText);
//             // console.log(line.R[0]["T"])
//             let obj = {
//             };
//             if (line.x <= 2.167) {
//                 obj['app_id'] = line.R[0]["T"]

//             }
//             if (line.x === 5.206) {
//                 obj['xref'] = line.R[0]["T"]
//             }
//             if (line.x === 8.811) {
//                 obj['settlement_date'] = line.R[0]["T"]

//             }
//             if (line.x === 12.668) {
//                 obj['broker'] = line.R[0]["T"]

//             }
//             if (line.x === 26.345) {
//                 obj['sub_broker'] = line.R[0]["T"]

//             }
//             if (line.x === 32.96) {
//                 obj['borrower_name'] = line.R[0]["T"]

//             }
//             if (line.x === 43.783) {
//                 //Description
//                 obj['description'] = line.R[0]["T"]

//             }
//             if (line.x === 53.602) {
//                 //Total Loan
//                 obj['total_loan'] = line.R[0]["T"]

//             }
//             if (line.x === 57.539) {
//                 //Comm Rate
//                 obj['comm_rate'] = line.R[0]["T"]

//             }
//             if (line.x === 60.091) {
//                 //Upfront
//                 obj['upfront'] = line.R[0]["T"]

//             }

//             if (line.x === 64.153) {
//                 //Up GST
//                 obj['upfront_inc_gst'] = line.R[0]["T"]
//             }
//             // console.log(obj)
//         }

//     }
// })

/////////////////////////////////////////////////////

// const pdf = require('pdf-parse');
// let dataBuffer = fs.readFileSync('Test PDF.pdf');
// pdf(dataBuffer).then((data) => {
//     // number of rendered pages
//     // console.log(data.numrender);
//     // // PDF info
//     // console.log(data.info);
//     // // PDF metadata
//     // console.log(data.metadata);
//     // // PDF.js version
//     // // check https://mozilla.github.io/pdf.js/getting_started/
//     // // PDF text
//     // const lines = data.text.replace(/\r?\n|\r/g, " ")
//     const lines = data
//     console.log(lines)
//     const arr = [];
//     const header = [
//         'App IDXref',
//         'Settlement',
//         'DateBrokerSub BrokerBorrower NameDescription',
//         'Total Loan',
//         'Amount',
//         'Comm',
//         'RateUpfront',
//         'Upfront Incl',
//         'GST'
//     ]
//     // Start from index 5 to skip the header lines
//     // for (let i = 0; i < lines.length; i++) {
//     //     const line = lines[i].trim();
//     //     if (line !== '' && !line.includes("Page") && !header.includes(line)) {
//     //         const columns = line.split(/\s+/);
//     //         console.log(columns[3])

//     //         // const obj = {
//     //         //     SettlementDate: columns[0],
//     //         //     BrokerSubBroker: columns[1],
//     //         //     BorrowerName: columns.slice(2, -4).join(' '),
//     //         //     Description: columns.slice(-4).join(' '),
//     //         //     TotalLoanAmount: columns[-4],
//     //         //     CommRate: columns[-3],
//     //         //     UpfrontUpfrontInclGST: columns.slice(-2).join(' ')
//     //         // };
//     //         // console.log(obj)
//     //     }
//     // }

//     // lines.map(item=>console.log(item+"____1"))

// })
