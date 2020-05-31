import { Module, HttpModule } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule, } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    BackofficeModule,
    MongooseModule.forRoot(
      'mongodb://nestapi:cRok0GZz0oexHhJKMVEITX3EAoQ0wW46s3RHzxzAGuQh1WQXoJUaeHqbdq8wTkjwfFb4vstItLy4OG0J7Rkbjg%3D%3D@nestapi.mongo.cosmos.azure.com:10255/?ssl=true&appName=@nestapi@',
      { useNewUrlParser: true }
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
//mongodb://nestapi:cRok0GZz0oexHhJKMVEITX3EAoQ0wW46s3RHzxzAGuQh1WQXoJUaeHqbdq8wTkjwfFb4vstItLy4OG0J7Rkbjg%3D%3D@nestapi.mongo.cosmos.azure.com:10255/?ssl=true&appName=@nestapi@
//mongodb+srv://diego:dr1991@cluster0-25l05.azure.mongodb.net/test?retryWrites=true&w=majority