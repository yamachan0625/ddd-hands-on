export class IncreaseBookStockCommand {
  constructor(
    public readonly bookId: string,
    public readonly incrementAmount: number
  ) {}
}
