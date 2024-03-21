import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { ReportController } from './report/report.controller';

@Module({
  imports: [ReportModule],
  controllers: [AppController, ReportController],
  providers: [AppService],
})
export class AppModule {}
