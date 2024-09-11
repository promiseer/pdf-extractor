import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReportService, PrismaService],
  exports: [ReportService],
})
export class ReportModule {}
