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


import { AddressEnum } from '../enums/AddressEnum';
import { CreateAddressDto } from '../dtos/address/CreateAddressDto';
import { CreateAddressCommand } from '../commands/addressCommands/AddressComand';
  
  @Controller('v1/address')
  export class AddressController {
   
    constructor(private addressCommand: CreateAddressCommand) {}
    
    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new AddressContract()))
    async addBillingAddress(@Param('document') document: string, @Body() addressDto: CreateAddressDto) {       
       
        const result: Result = await this.addressCommand.create(document,addressDto,AddressEnum.Billing);        
        if(result.sucess)
          return result;
        
        throw new HttpException(result, HttpStatus.BAD_REQUEST)       
    }
    
    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new AddressContract()))
    async addShippingAddress(@Param('document') document: string, @Body() addressDto: CreateAddressDto) {
        
        const result: Result = await this.addressCommand.create(document,addressDto,AddressEnum.Shipping);       
        if(result.sucess)
          return result;
        
        throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  
  }
  