export class CreateCustumerDto {
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public password: string,
  ) {}
}
