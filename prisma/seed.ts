// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';

import { pdfToJson } from '../utils/pdfToJson';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // insertDataToPrisma();
  totalLoanAmountByDate(new Date(), new Date());
  highestLoanAmount();
}

async function insertDataToPrisma() {
  try {
    const reportInput: Prisma.ReportCreateManyInput[] = await pdfToJson();
    // Use Prisma client to insert data
    const result = await prisma.report.createMany({
      data: reportInput,
      skipDuplicates: true, // Skip duplicate entries
    });
    console.log('Data inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting data:', error.message);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

async function totalLoanAmountByDate(startDate: Date, endDate: Date) {
  const groupByBroker = await prisma.report.aggregate({
    where: {
      settlement_date: {
        lt: startDate,
        gte: endDate,
      },
    },
    _sum: {
      total_loan: true,
    },
  });

  console.log(groupByBroker);
}

async function highestLoanAmount() {
  const highestLoanAmountByBroker = await prisma.report.findFirst({
    orderBy: {
      total_loan: 'desc',
    },
    select: {
      broker: true,
      total_loan: true,
    },
  });

  console.log(highestLoanAmountByBroker);
}
// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
