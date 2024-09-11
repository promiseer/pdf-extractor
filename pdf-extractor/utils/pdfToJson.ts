import * as pdf2table from 'pdf2table';
import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import * as moment from 'moment';

const pdfBuffer: Buffer = fs.readFileSync(__dirname + '/Test PDF.pdf');

const pdfToJson = (): Promise<Prisma.ReportCreateManyInput[]> => {
  return new Promise((resolve, reject) => {
    pdf2table.parse(pdfBuffer, (err: Error | null, rows: string[][]) => {
      if (err) {
        reject(err);
      } else {
        const headers: string[] = [
          'app_id',
          'xref',
          'settlement_date',
          'broker',
          'sub_broker',
          'borrower_name',
          'description',
          'total_loan',
          'commission_rate',
          'upfront',
          'upfront_incl_gst',
        ];

        rows = rows.slice(2); // First two rows are headers
        const response: any = rows
          .filter((row) => row.length >= 10 && !row.includes('App ID')) //Ignore  Headers and other rows
          .map((row) => {
            if (row.length === 10) {
              row.splice(4, 0, 'Null');
            }
            console.log(row);
            return Object.fromEntries(
              headers.map((header, index) => [
                header,
                parseDatetype(row[index].trim()) || '',
              ]),
            );
          });
        resolve(response);
      }
    });
  });
};
function parseDatetype(value: string) {
  const intRegex = /^[\d,]+(?:\.\d{1,2})?$/; // Regex to match numbers with optional commas and up to 2 decimal places
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  // const match = inputString.match(regex);
  const Intmatch = value.match(intRegex);
  const dateMatch = value.match(dateRegex);
  if (Intmatch) {
    return parseFloat(Intmatch[0].replace(/,/g, '')); // Remove commas and parse as float
  }
  if (dateMatch) {
    return moment(dateMatch[0], 'DD/MM/YYYY').toDate();
  }
  return value; // Return null for invalid values
}

export { pdfToJson };
