import { Module, HttpModule } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule, } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    BackofficeModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestApi',
      { useNewUrlParser: true }
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}