import { Result } from "src/backoffice/models/result.model";
import { Injectable } from "@nestjs/common";
import { PetService } from "src/backoffice/service/pet.service";
import { CreatePetDto } from "src/backoffice/dtos/pet/createPetDto";
import { Pet } from "src/backoffice/models/pet.model";
import { CustumerService } from "src/backoffice/service/custumer.servive";



@Injectable()
export class PetCommand {
    
    constructor(private petService: PetService, private custumerService: CustumerService) { }
   
    async create(document: string, createPetDto: CreatePetDto): Promise<Result>{

        let pet = new Pet(createPetDto.name,createPetDto.gender,createPetDto.kind,createPetDto.brand)
        
        if(!await this.custumerService.checkExist(document))
            return new Result("Usuário não existe", false, null,"Usuário não existe");

        if(await this.petService.checkExist(document, pet))
            return new Result("Pet já existe", false, null,"Pet já existe");
        
        try {
           console.log("Pet")
           let resultPet = await this.petService.createPet(document, pet);          
           return new Result("Pet criado", true, resultPet, null);
        
        } catch (error) {
            return new Result("Erro ao criar o pet", false, null, "Erro ao criar o pet");
        }
       
    }

    async getAllPet(idCustumer: string): Promise<Result>{
        
        let resultPet = await this.petService.getAll(idCustumer); 
        console.log(resultPet)
      
        return new Result("", true,resultPet , null);
    }

   
}