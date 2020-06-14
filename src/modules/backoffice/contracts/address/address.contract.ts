import { Contract } from '../../../../contract/contracts';
import { Flunt } from 'src/utils/flunt/flunt';
import { CreateAddressDto } from 'src/modules/backoffice/dtos/address/CreateAddressDto';

export class AddressContract implements Contract {
  erros: any[];

  /**
   *
   */
 
  validate(model: CreateAddressDto): boolean {
    const flunt: Flunt = new Flunt();
    flunt.hasMinLen(model.city,3,"Cidade precisa se menor do que 3");
    flunt.hasMinLen(model.complement,3,"complement precisa se menor do que 3");
    flunt.hasMinLen(model.country,3,"country precisa se menor do que 3");
    flunt.hasMinLen(model.zipCode,3,"zipCode precisa se menor do que 3");
    flunt.hasMinLen(model.neighborhood,3,"neighborhood precisa se menor do que 3");
    flunt.hasMinLen(model.number,3,"number precisa se menor do que 3");
    flunt.hasMinLen(model.state,3,"state precisa se menor do que 3");
    flunt.hasMinLen(model.street,3,"street precisa se menor do que 3");   

    this.erros = flunt.erros
    return flunt.isValid();
  }
}
