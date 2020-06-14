import { Contract } from "src/contract/contracts";
import { Injectable } from "@nestjs/common";
import { QueryDTo } from "src/modules/backoffice/dtos/query/QueryDto";
import { Flunt } from "src/utils/flunt/flunt";


@Injectable()
export class QueryContract implements Contract {
  erros: any[];

  validate(model: QueryDTo): boolean {
    const flunt = new Flunt();

    flunt.isMaxValue(model.take, 500, 'A quanidade ve ser menor do que 500');   

    this.erros = flunt.erros;
    return flunt.isValid();
  }
}