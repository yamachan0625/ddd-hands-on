import { Stock } from './Stock';
import { BookId } from '../BookId/BookId';
import { QuantityAvailable } from './QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from './Status/Status';
import { StockId } from './StockId/StockId';

// nanoid() をモックする
jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('Stock', () => {
  const bookId = new BookId('9784167158057');
  const stockId = new StockId('abc');
  const quantityAvailable = new QuantityAvailable(10);
  const status = new Status(StatusEnum.OnSale);

  describe('create', () => {
    it('デフォルト値で在庫を作成する', () => {
      const stock = Stock.create(bookId);

      expect(
        stock.stockId.equals(new StockId('testIdWithExactLength'))
      ).toBeTruthy();
      expect(stock.bookId.equals(bookId)).toBeTruthy();
      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();
      expect(stock.status.equals(new Status(StatusEnum.PreSale))).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('在庫が販売中の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );

      expect(() => stock.delete()).toThrow('販売中の在庫は削除できません。');
    });

    it('在庫が販売中でない場合はエラーを投げない', () => {
      const notOnSaleStatus = new Status(StatusEnum.Discontinued);
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        notOnSaleStatus
      );

      expect(() => stock.delete()).not.toThrow();
    });
  });

  describe('increaseQuantity', () => {
    it('在庫数を増やす', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );
      stock.increaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(15))
      ).toBeTruthy();
    });

    it('増加量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );

      expect(() => stock.increaseQuantity(-1)).toThrow(
        '増加量は0以上でなければなりません。'
      );
    });
  });

  describe('decreaseQuantity', () => {
    it('在庫数を減らす', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );
      stock.decreaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(5))
      ).toBeTruthy();
    });

    it('減少量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );

      expect(() => stock.decreaseQuantity(-1)).toThrow(
        '減少量は0以上でなければなりません。'
      );
    });

    it('減少後の在庫数が0未満になる場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );

      expect(() => stock.decreaseQuantity(11)).toThrow();
    });

    it('在庫数が0になったらステータスを販売停止にする', () => {
      const stock = Stock.reconstruct(
        stockId,
        bookId,
        quantityAvailable,
        status
      );
      stock.decreaseQuantity(10);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();
      expect(
        stock.status.equals(new Status(StatusEnum.Discontinued))
      ).toBeTruthy();
    });
  });
});
