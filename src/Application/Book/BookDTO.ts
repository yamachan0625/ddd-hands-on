import { Book } from 'Domain/models/Book/Book';
import { StatusLabel } from 'Domain/models/Book/Stock/Status/Status';

export class BookDTO {
  public readonly bookId: string;
  public readonly title: string;
  public readonly price: number;
  public readonly stockId: string;
  public readonly quantityAvailable: number;
  public readonly status: StatusLabel;

  constructor(book: Book) {
    this.bookId = book.bookId.value;
    this.title = book.title.value;
    this.price = book.price.value.amount;
    this.stockId = book.stockId.value;
    this.quantityAvailable = book.quantityAvailable.value;
    this.status = book.status.toLabel();
  }
}
