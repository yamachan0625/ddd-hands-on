import { BookId } from '../BookId/BookId';
import { QuantityAvailable } from './QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from './Status/Status';
import { StockId } from './StockId/StockId';

export class Stock {
  private constructor(
    private readonly _stockId: StockId,
    private readonly _bookId: BookId,
    private _quantityAvailable: QuantityAvailable,
    private _status: Status
  ) {}

  // 新規エンティティの生成
  static create(bookId: BookId) {
    const defaultStockId = new StockId(); // 自動ID採番
    const defaultQuantityAvailable = new QuantityAvailable(0);
    const defaultStatus = new Status(StatusEnum.PreSale);

    return new Stock(
      defaultStockId,
      bookId,
      defaultQuantityAvailable,
      defaultStatus
    );
  }

  delete() {
    if (this.status.value === StatusEnum.OnSale) {
      throw new Error('販売中の在庫は削除できません。');
    }
  }

  changeStatus(newStatus: Status) {
    this._status = newStatus;
  }

  // 在庫数を増やす
  increaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('増加量は0以上でなければなりません。');
    }

    const newQuantity = this.quantityAvailable.increment(amount).value;
    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  // 在庫数を減らす
  decreaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('減少量は0以上でなければなりません。');
    }

    const newQuantity = this.quantityAvailable.decrement(amount).value;
    if (newQuantity < 0) {
      throw new Error('減少後の在庫数が0未満になってしまいます。');
    }

    // 在庫数が0になったらステータスを販売停止にする
    if (newQuantity === 0) {
      this.changeStatus(new Status(StatusEnum.Discontinued));
    }

    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  // エンティティの再構築
  static reconstruct(
    stockId: StockId,
    bookId: BookId,
    quantityAvailable: QuantityAvailable,
    status: Status
  ) {
    return new Stock(stockId, bookId, quantityAvailable, status);
  }

  get stockId(): StockId {
    return this._stockId;
  }

  get bookId(): BookId {
    return this._bookId;
  }

  get quantityAvailable(): QuantityAvailable {
    return this._quantityAvailable;
  }

  get status(): Status {
    return this._status;
  }
}
