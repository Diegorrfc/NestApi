import { Injectable } from "@nestjs/common";
import { CreatePetDto } from "src/backoffice/dtos/pet/createPetDto";
import { Flunt } from "src/utils/flunt/flunt";
import { Contract } from "src/contract/contracts";



@Injectable()
export class PetContract implements Contract {
  erros: any[];

  validate(model: CreatePetDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 2, 'Nome invalido');
    flunt.hasMinLen(model.brand,2, 'Raça com o tamanho inválido');
    flunt.hasMinLen(model.kind, 2, 'Tipo com o tamaho inválido');
    flunt.hasMinLen(model.gender, 2, 'Genero inválido');

    this.erros = flunt.erros;
    return flunt.isValid();
  }
}