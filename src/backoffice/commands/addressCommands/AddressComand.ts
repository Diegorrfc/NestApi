import { Injectable } from "@nestjs/common";
import { AddressService } from "src/backoffice/service/address.service";
import { Address } from "src/backoffice/models/address.model";
import { AddressEnum } from "src/backoffice/enums/AddressEnum";
import { Result } from "src/backoffice/models/result.model";
import { CreateAddressDto } from "src/backoffice/dtos/address/CreateAddressDto";

@Injectable()
export class CreateAddressCommand{
    
    constructor(private addressService: AddressService) { }
   
    async create(document: string, addressDto: CreateAddressDto, addressEnum: AddressEnum ): Promise<Result>{

        const address =  new Address(
            addressDto.zipCode,
            addressDto.street,
            addressDto.number,
            addressDto.complement,
            addressDto.neighborhood,
            addressDto.city,
            addressDto.state,
            addressDto.country
            );        
        let custumer;   
       
        if(!(await this.addressService.checkExist(document)))           
            return new Result("Erro ao criar o endereço", false, null, "usuário não existe")          

        try {           
           
            if(addressEnum == AddressEnum.Billing)
                custumer = this.addressService.createBillingAddress(document, address);
            else
                custumer = this.addressService.createShippingAddress(document, address);
            
           return new Result("Endereço criado", true, custumer, null)

        } catch (error) {
            return new Result("Erro ao criar o endereço", false, null, null)
        }       
    }
}