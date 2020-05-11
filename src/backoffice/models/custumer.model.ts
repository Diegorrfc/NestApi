import { Pet } from './pet.model';
import { CreditCard } from './credit-card.model';
import { Address } from 'cluster';
import { User } from './user.model';

export class Custumer {
  constructor(
    public name: string = "",
    public document: string,
    public email: string,
    public pets: Pet[],
    public billingAddress: Address,
    public shipppingAddresss: Address,
    public creadcard: CreditCard,
    public user: User,
  ) {}
}
