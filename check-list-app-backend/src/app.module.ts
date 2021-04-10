import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
  ]})
export class AppModule {}
