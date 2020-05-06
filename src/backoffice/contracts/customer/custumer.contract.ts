import { Contract } from '../contracts';
import { Custumer } from '../../models/custumer.model';

import { Injectable } from '@nestjs/common';
import { CreateCustumerDto } from '../../dtos/createCustumerDto';
import { Flunt } from 'src/backoffice/flunt/flunt';

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
