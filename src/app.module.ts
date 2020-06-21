import { Module, HttpModule } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule, } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreModule } from './modules/store/store.module';


@Module({
  imports: [  
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestApi',
      { useNewUrlParser: true }
    ),
    TypeOrmModule.forRoot({     
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'nestApi',
        password: '##MS_PolicyEventProcessingLogin##',
        database: 'NestApi',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      HttpModule,
      BackofficeModule,
      StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}