import { Book } from 'Domain/models/Book/Book';
import { DomainEvent } from '../DomainEvent';
import { StatusLabel } from 'Domain/models/Book/Stock/Status/Status';

export type BookDomainEventBody = {
  BookId: string;
  title: string;
  price: number;
  quantityAvailable: number;
  status: StatusLabel;
};

export const BOOK_EVENT_NAME = {
  CREATED: 'StockManagement.BookCreated',
  DEPLETED: 'StockManagement.BookDepleted',
  DELETED: 'StockManagement.BookDeleted',
} as const;

export class BookDomainEventFactory {
  constructor(private book: Book) {}

  public createEvent(
    eventName: (typeof BOOK_EVENT_NAME)[keyof typeof BOOK_EVENT_NAME]
  ) {
    return DomainEvent.create(this.entityToEventBody(), eventName);
  }

  private entityToEventBody(): BookDomainEventBody {
    return {
      BookId: this.book.bookId.value,
      title: this.book.title.value,
      price: this.book.price.value.amount,
      quantityAvailable: this.book.quantityAvailable.value,
      status: this.book.status.toLabel(),
    };
  }
}
