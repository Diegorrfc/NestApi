import { Result } from "src/backoffice/models/result.model";
import { Injectable } from "@nestjs/common";
import { PetService } from "src/backoffice/service/pet.service";
import { CreatePetDto } from "src/backoffice/dtos/pet/createPetDto";
import { Pet } from "src/backoffice/models/pet.model";



@Injectable()
export class PetCommand {
    
    constructor(private petService: PetService) { }
   
    async create(document: string, createPetDto: CreatePetDto): Promise<Result>{

        let pet = new Pet(createPetDto.name,createPetDto.gender,createPetDto.kind,createPetDto.brand)
        
        if(await this.petService.checkExist(document, pet))
            return new Result("Per já existe",false,null,"Pet já existe");
        
        try {
           let resultPet = await this.petService.createPet(document, pet);
           return new Result("Pet criado", true, null, null);
        
        } catch (error) {
            return new Result("Erro ao criar o pet", false, null, "Erro ao criar o pet");
        }
       
    }

   
}