import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/custumer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/custumers.schema';
import { UserSchema } from './schema/user.schema';
import { AccountService } from './service/account.service';
import { CustumerService } from './service/custumer.servive';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Custumer', schema: CustomerSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [AccountService, CustumerService],
})
export class BackofficeModule {}
