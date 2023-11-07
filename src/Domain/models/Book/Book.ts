import { BookId } from './BookId/BookId';
import { Price } from './Price/Price';
import { Stock } from './Stock/Stock';
import { Title } from './Title/Title';

export class Book {
  private constructor(
    private readonly _bookId: BookId,
    private _title: Title,
    private _price: Price,
    private readonly _stock: Stock
  ) {}

  static create(bookId: BookId, title: Title, price: Price, stock: Stock) {
    return new Book(bookId, title, price, stock);
  }

  static reconstruct(bookId: BookId, title: Title, price: Price, stock: Stock) {
    return new Book(bookId, title, price, stock);
  }

  changeTitle(newTitle: Title) {
    this._title = newTitle;
  }

  changePrice(newPrice: Price) {
    this._price = newPrice;
  }

  delete() {
    this._stock.delete();
    // Bookを削除する処理があればここに書く
  }

  // 販売可能かどうか
  isSaleable() {
    return (
      this._stock.quantityAvailable.value > 0 &&
      this._stock.status.value !== 'OutOfStock'
    );
  }

  increaseStock(amount: number) {
    this._stock.increaseQuantity(amount);
  }

  decreaseStock(amount: number) {
    this._stock.decreaseQuantity(amount);
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
