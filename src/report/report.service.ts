import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Report, Prisma } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  async getReport(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReportWhereUniqueInput;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput;
  }): Promise<Report[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.report.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async insertNewRecord(data: Prisma.ReportCreateInput): Promise<Report> {
    return this.prisma.report.create({
      data,
    });
  }
  async loanAmountByDate() {
    return await this.prisma.report.groupBy({
      by: ['settlement_date'],
      _sum: {
        total_loan: true,
      },
    });
  }

  async highestLoanByBroker(startDate: Date, endDate: Date) {
    return await this.prisma.report.findMany({
      where: {
        settlement_date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        total_loan: 'desc',
      },
    });
  }

  async getTotalLoanByDate(startDate: Date, endDate: Date) {
    return await this.prisma.report.aggregate({
      where: {
        settlement_date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        total_loan: true,
      },
    });
  }
}
