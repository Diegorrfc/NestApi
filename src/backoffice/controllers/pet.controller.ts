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
import { CustumerService } from '../service/custumer.servive'; 
import { PetCommand } from '../commands/PetCommand/PetCommand';
import { CreatePetDto } from '../dtos/pet/createPetDto';
import { PetContract } from '../contracts/pet/PetContract';
import { PetService } from '../service/pet.service';
  
  @Controller('v1/pet')
  export class PetController {
    /**
     *
     */
    constructor(    
      private petService: PetService,
      private petCommand: PetCommand,
    ) {}
  
    @Post(':id')
    @UseInterceptors(new ValidatorInterceptor(new PetContract()))
    async post(@Param('id') document: string, @Body() model: CreatePetDto) {   
    
      let result = await this.petCommand.create(document,model)     
      if(result.sucess)
        return result
      else
        return new HttpException(result, HttpStatus.BAD_REQUEST);    
    }
  
    @Get(':id')
    async getPets(@Param('id') idCustumer: string){
      return await this.petCommand.getAllPet(idCustumer)   
    }


    @Delete(':idCustumer/:idPet')
    async delete(@Param('idCustumer') idCustumer: string, @Param('idPet') idPet ){
      console.log(idCustumer,idPet)
      this.petService.delete(idCustumer,idPet)
    }
  }