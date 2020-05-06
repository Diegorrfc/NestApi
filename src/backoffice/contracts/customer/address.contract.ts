import { Contract } from '../contracts';
import { Address } from 'src/backoffice/models/address.model';

export class AddressContract implements Contract {
  erros: any[];

  validate(model: Address): boolean {
    return true;
  }
}
