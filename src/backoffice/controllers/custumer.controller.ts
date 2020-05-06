import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Custumer } from '../models/custumer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CustumerContract } from '../contracts/customer/custumer.contract';
import { CreateCustumerDto } from '../dtos/createCustumerDto';
import { AccountService } from '../service/account.service';
import { User } from '../models/user.model';
import { CustumerService } from '../service/custumer.servive';
import { Address } from '../models/address.model';
import { AddressContract } from '../contracts/customer/address.contract';
import { threadId } from 'worker_threads';

@Controller('v1/custumers')
export class CustomerController {
  /**
   *
   */
  constructor(
    private accountService: AccountService,
    private custumerService: CustumerService,
  ) {}

  @Get(':document')
  async get(@Param('document') document) {
    return 'obter os cliente' + document;
  }

  @UseInterceptors(new ValidatorInterceptor(new CustumerContract()))
  @Post()
  async post(@Body() model: CreateCustumerDto) {
    let user;
    let custumer;
    try {
      user = await this.accountService.create(
        new User(model.name, model.password, true),
      );
      custumer = await this.custumerService.create(
        new Custumer(
          model.name,
          model.document,
          model.email,
          null,
          null,
          null,
          null,
          user,
        ),
      );
      return new Result('Sucesso', true, custumer, null);
    } catch (error) {
      // roolback manual
      throw new HttpException(
        new Result('error ao criar o custumer', false, error, 'error'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/addresss/billing')
  @UseInterceptors(new ValidatorInterceptor(new AddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    const custumer = await this.custumerService.addBillingAddress(
      document,
      model,
    );

    return new Result('Suce', true, custumer, null);
  }

  @Put(':document')
  async put(@Param('document') document, @Body() body: Custumer) {
    return new Result('', true, { document, body }, null);
  }

  @Delete()
  async delete() {
    return 'deletar';
  }
}
