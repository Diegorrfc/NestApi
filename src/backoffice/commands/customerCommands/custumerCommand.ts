import { Result } from "src/backoffice/models/result.model";
import { Injectable } from "@nestjs/common";
import { CustumerService } from "src/backoffice/service/custumer.servive";
import { CreateCustumerDto } from "src/backoffice/dtos/custumer/createCustumerDto";
import { User } from "src/backoffice/models/user.model";
import { Custumer } from "src/backoffice/models/custumer.model";
import { AccountService } from "src/backoffice/service/account.service";


@Injectable()
export class CustumerCommand {
    
    constructor(private custumerService: CustumerService, private accountService: AccountService) { }
   
    async create(createCustumerDto: CreateCustumerDto): Promise<Result>{

        let user = new User(createCustumerDto.name, createCustumerDto.password, true)       
       
        if(await this.accountService.checkExist(user))           
            return new Result("O Usuário já existe", false, null, "usuário já existe")          

        let userCreated: User;
        try {           
           userCreated = await this.accountService.create(user);
           let cusumer = new Custumer(createCustumerDto.name, createCustumerDto.document, createCustumerDto.email, [], null, null, userCreated) 
           var resultCustumer = await this.custumerService.create(cusumer);           
           return new Result("Custumer criado", true, resultCustumer, null)

        } catch (error) {
            await this._deleteUser(userCreated)
            return new Result("Erro ao criar o Custumer", false, error, null)
        }       
    }

    async get(id: string) : Promise<Result> {
      
      let result: Result;

       try {
        var resultService = await this.custumerService.get(id)
        result = new Result("", true, resultService, null);
       } 
       catch (error) {       
        result = new Result(`Não existe nenhum custumer com o id ${id}`, true, resultService, null);
       }
       return result;
    }
    
    async update(createCustumerDto: CreateCustumerDto): Promise<Result>{

        let user = new User(createCustumerDto.name, createCustumerDto.password, true)       
       
        this._deleteUser(user);
        
        return new Result("Sucesso",true,null,null);
    }
    private async _deleteUser(user: User) : Promise<Boolean> {
       if(await this.accountService.checkExist(user)) 
           await this.accountService.delete(user.username);
        
        return true
    }
}