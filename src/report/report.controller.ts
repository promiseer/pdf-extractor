import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('reports')
  getReports() {
    return this.reportService.getReport({});
  }
  @Get()
  getTotalLoanByDate(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      if (!startDate || !endDate) {
        throw new BadRequestException('params not found');
      }

      return this.reportService.getTotalLoanByDate(
        new Date(startDate),
        new Date(endDate),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('groupByDate')
  getLoanAmountByDate() {
    try {
      return this.reportService.loanAmountByDate();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('higeshLoanByBroker')
  getHigestLoanByBroker(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      if (!startDate || !endDate) {
        throw new BadRequestException('params not found');
      }
      return this.reportService.highestLoanByBroker(
        new Date(startDate),
        new Date(endDate),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
