import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from 'src/backoffice/contracts/contracts';
import { Result } from 'src/backoffice/models/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(private contract: Contract) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    let validate: Boolean;
    const body = context.switchToHttp().getRequest().body;
    validate = this.contract.validate(body);

    if (!validate) {
      throw new HttpException(
        new Result('Deu arrado', false, null, this.contract.erros),
        HttpStatus.BAD_REQUEST,
      );
    }
    return next.handle();
  }
}
