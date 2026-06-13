import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { JobsController } from './jobs/jobs.controller';
import { AIController } from './ai/ai.controller';

@Module({
  imports: [],
  controllers: [AuthController, JobsController, AIController],
  providers: [],
})
export class AppModule {}
