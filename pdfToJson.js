const pdf2table = require('pdf2table');
const fs = require('fs');
const pdfBuffer = fs.readFileSync('Test PDF.pdf');

const pdfToJson = () => {
    return new Promise((resolve, reject) => {
        pdf2table.parse(pdfBuffer, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const headers = [
                    "app_id",
                    "xref",
                    "settlement_date",
                    "broker",
                    "sub_broker",
                    "borrower_name",
                    "description",
                    "total_loan",
                    "commission_rate",
                    "upfront",
                    "upfront_incl_gst",
                ];

                rows = rows.slice(2); // first two rows are headers;
                // console.log(rows)

                const response = rows
                    .filter(row => row.length >= 10 && !row.includes("App ID"))
                    .map(row => {
                        if (row.length === 10) {
                            row.splice(4, 0, "Null");
                        }
                        return Object.fromEntries(headers.map((header, index) => [header, parseDatatype(row[index].trim()) || '']))
                    });
                resolve(response);
            }
        });
    });
};

function parseDatatype(value) {
    const intRegex = /^[\d,]+(?:\.\d{1,2})?$/; // Regex to match numbers with optional commas and up to 2 decimal places
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    // const match = inputString.match(regex);
    const Intmatch = value.match(intRegex);
    const dateMatch = value.match(dateRegex);
    if (Intmatch) {
        return parseFloat(Intmatch[0].replace(/,/g, '')); // Remove commas and parse as float
    }
    // if (dateMatch) {
    //     return new Date(dateMatch[0])
    // }
    return value; // Return null for invalid values
}

pdfToJson().then((result) => {
    fs.writeFileSync('reports.json', JSON.stringify(result, null, 2), 'utf-8');
}).catch((err) => {

});
// module.exports = { pdfToJson }