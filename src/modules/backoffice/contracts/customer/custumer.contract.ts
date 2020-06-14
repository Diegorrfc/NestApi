import { Contract } from '../../../../contract/contracts';
import { Injectable } from '@nestjs/common';
import { CreateCustumerDto } from '../../dtos/custumer/createCustumerDto';
import { Flunt } from 'src/utils/flunt/flunt';

@Injectable()
export class CustumerContract implements Contract {
  erros: any[];

  validate(model: CreateCustumerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome invalido');
    flunt.isEmail(model.email, 'E-mail invalido');
    flunt.isFixedLen(model.document, 11, 'Cpf invalido');

    this.erros = flunt.erros;
    return flunt.isValid();
  }
}
