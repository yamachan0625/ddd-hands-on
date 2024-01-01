import { DomainEventStorable } from 'Domain/shared/DomainEvent/DomainEventStorable';
import { BookId } from './BookId/BookId';
import { Price } from './Price/Price';
import { Status, StatusEnum } from './Stock/Status/Status';
import { Stock } from './Stock/Stock';
import { Title } from './Title/Title';
import {
  BOOK_EVENT_NAME,
  BookDomainEventFactory,
} from 'Domain/shared/DomainEvent/Book/BookDomainEventFactory';

export class Book extends DomainEventStorable {
  private constructor(
    private readonly _bookId: BookId,
    private _title: Title,
    private _price: Price,
    private readonly _stock: Stock
  ) {
    super();
  }

  static create(bookId: BookId, title: Title, price: Price) {
    const book = new Book(bookId, title, price, Stock.create());
    book.addDomainEvent(
      new BookDomainEventFactory(book).createEvent(BOOK_EVENT_NAME.CREATED)
    );

    return book;
  }

  static reconstruct(bookId: BookId, title: Title, price: Price, stock: Stock) {
    return new Book(bookId, title, price, stock);
  }

  delete() {
    // stockが削除可能か確認する
    this._stock.delete();
    // Bookを削除する処理があればここに書く

    this.addDomainEvent(
      new BookDomainEventFactory(this).createEvent(BOOK_EVENT_NAME.DELETED)
    );
  }

  // 販売可能かどうか
  isSaleable() {
    return (
      this._stock.quantityAvailable.value > 0 &&
      this._stock.status.value !== StatusEnum.OutOfStock
    );
  }

  increaseStock(amount: number) {
    this._stock.increaseQuantity(amount);
  }

  decreaseStock(amount: number) {
    this._stock.decreaseQuantity(amount);

    // 在庫切れになったらイベントを発行する
    if (this.status.equals(new Status(StatusEnum.OutOfStock))) {
      this.addDomainEvent(
        new BookDomainEventFactory(this).createEvent(BOOK_EVENT_NAME.DEPLETED)
      );
    }
  }

  changeTitle(newTitle: Title) {
    this._title = newTitle;
  }

  changePrice(newPrice: Price) {
    this._price = newPrice;
  }

  get bookId(): BookId {
    return this._bookId;
  }

  get title(): Title {
    return this._title;
  }

  get price(): Price {
    return this._price;
  }

  get stockId() {
    return this._stock.stockId;
  }

  get quantityAvailable() {
    return this._stock.quantityAvailable;
  }

  get status() {
    return this._stock.status;
  }
}
