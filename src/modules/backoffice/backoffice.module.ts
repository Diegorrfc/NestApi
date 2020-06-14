import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/custumer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/custumers.schema';
import { UserSchema } from './schema/user.schema';
import { AccountService } from './service/account.service';
import { CustumerService } from './service/custumer.servive';
import { AddressService } from './service/address.service';
import { PetService } from './service/pet.service';
import { CreateAddressCommand } from './commands/addressCommands/AddressComand';
import { AddressController } from './controllers/address.controller';
import { CustumerCommand } from './commands/customerCommands/custumerCommand';
import { PetCommand } from './commands/PetCommand/PetCommand';
import { AccountController } from './controllers/account.controller';
import { PetController } from './controllers/pet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Custumer', schema: CustomerSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CustomerController, AddressController, AccountController, PetController],
  providers: [AccountService, CustumerService, PetService, AddressService, CreateAddressCommand, CustumerCommand, PetCommand],
})
export class BackofficeModule {}
