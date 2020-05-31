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
    
  import { CustumerCommand } from '../commands/customerCommands/custumerCommand';
  import { AccountService } from '../service/account.service';
  
  @Controller('v1/users')
  export class AccountController {
    /**
     *
     */
    constructor(
      private custumerCommand: CustumerCommand,
      private accountService: AccountService
    ) {}
  
   
    @Delete(":userName")
    async delete(@Param('userName') userName) {
      console.log(userName)
      return await this.accountService.delete(userName);
    }   
    
  }