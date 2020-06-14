export class Flunt {
  constructor(public erros: any[] = []) {}

  hasMinLen(value: string, length: number, message: string) {
    if (value?.length <= length) this.erros.push(message);
  }
  isEmail(email: string, message: string) {
    if (email?.indexOf('@') < 0) this.erros.push(message);
  }
  isFixedLen(value: string, length: number, message: string) {
    if (value?.length !== length) this.erros.push(message);
  }
  isMaxValue(value: number, length: number, message: string) {
    if (value > length) this.erros.push(message);
  }

  isValid(): boolean {
    return this.erros.length === 0;
  }
}
