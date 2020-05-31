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

import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CustumerContract } from '../contracts/customer/custumer.contract';
import { CreateCustumerDto } from '../dtos/custumer/createCustumerDto';
import { CustumerService } from '../service/custumer.servive';
import { CustumerCommand } from '../commands/customerCommands/custumerCommand';

@Controller('v1/custumers')
export class CustomerController {
  /**
   *
   */
  constructor(
    private custumerCommand: CustumerCommand,
    private custumerService: CustumerService
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CustumerContract()))
  async post(@Body() model: CreateCustumerDto) {   
  
    let result = await this.custumerCommand.create(model)   
    if(result.sucess)
      return result
    else
      return new HttpException(result, HttpStatus.BAD_REQUEST);    
  }

  @Get(':document')
  async get(@Param('document') document) {
    console.log(document)
    return await this.custumerService.get(document);
  }  

  @Get()
  async getAllCustumers(){
    return await this.custumerService.getAll()   
  }
  
}