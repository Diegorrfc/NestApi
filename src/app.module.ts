import { Module, HttpModule } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    BackofficeModule,
    MongooseModule.forRoot(
      'mongodb+srv://diego:dr1991@cluster0-25l05.azure.mongodb.net/test?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
