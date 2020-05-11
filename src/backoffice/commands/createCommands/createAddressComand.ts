import { Injectable } from "@nestjs/common";
import { AddressService } from "src/backoffice/service/address.service";
import { Address } from "src/backoffice/models/address.model";
import { AddressEnum } from "src/backoffice/enums/AddressEnum";
import { Result } from "src/backoffice/models/result.model";
import { Custumer } from "src/backoffice/models/custumer.model";
import { CreateAddressDto } from "src/backoffice/dtos/address/CreateAddressDto";

@Injectable()
export class CreateAddressCommand{

    /**
     *
     */
    constructor(private addressService: AddressService) { }

    create(document: string, addressDto: CreateAddressDto, addressEnum: AddressEnum ): Result{

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
        try {

            if(addressEnum == AddressEnum.Billing)
                custumer = this.addressService.createBillingAddress(document, address);
            else
                custumer = this.addressService.createShippingAddress(document, address);
            
        } catch (error) {
            return new Result("Erro ao criar o endereço", true, null, null)
        }
        return new Result("Endereço criado", true, custumer, null)        
        
       
    }

}