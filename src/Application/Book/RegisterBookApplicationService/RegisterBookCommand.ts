export class RegisterBookCommand {
  constructor(
    public readonly isbn: string,
    public readonly title: string,
    public readonly priceAmount: number
  ) {}
}
