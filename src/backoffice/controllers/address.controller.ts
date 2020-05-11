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
 
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
 
import { AddressContract } from '../contracts/address/address.contract';
import { CreateAddressCommand } from '../commands/createCommands/createAddressComand';

import { AddressEnum } from '../enums/AddressEnum';
import { CreateAddressDto } from '../dtos/address/CreateAddressDto';
  
  @Controller('v1/addresss')
  export class CustomerController {
    /**
     *
     */
    constructor(private addressCommand: CreateAddressCommand) {}
    
    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new AddressContract()))
    async addBillingAddress(
      @Param('document') document: string, @Body() addressDto: CreateAddressDto) {       
       
        const result: Result = this.addressCommand.create(document,addressDto,AddressEnum.Billing);
        
        if(result.sucess)
          return result;
        
        throw new HttpException(new Result("error", false, null, result.error), HttpStatus.BAD_REQUEST)       
    }
    
    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new AddressContract()))
    async addShippingAddress(
      @Param('document') document: string, @Body() addressDto: CreateAddressDto) {
        
        const result: Result = this.addressCommand.create(document,addressDto,AddressEnum.Shipping);
        
        if(result.sucess)
          return result;
        
        throw new HttpException(new Result("error", false, null, result.error), HttpStatus.BAD_REQUEST)
    }
  
  }
  