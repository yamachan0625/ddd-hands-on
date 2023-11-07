import { Stock } from './Stock';
import { QuantityAvailable } from './QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from './Status/Status';
import { StockId } from './StockId/StockId';

// nanoid() をモックする
jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('Stock', () => {
  const stockId = new StockId('abc');
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);

  describe('create', () => {
    it('デフォルト値で在庫を作成する', () => {
      const stock = Stock.create();

      expect(
        stock.stockId.equals(new StockId('testIdWithExactLength'))
      ).toBeTruthy();
      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();
      expect(
        stock.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('在庫ありの場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.delete()).toThrow('在庫がある場合削除できません。');
    });

    it('在庫なしなしの場合はエラーを投げない', () => {
      const notOnSaleStatus = new Status(StatusEnum.OutOfStock);
      const stock = Stock.reconstruct(
        stockId,
        quantityAvailable,
        notOnSaleStatus
      );

      expect(() => stock.delete()).not.toThrow();
    });
  });

  describe('increaseQuantity', () => {
    it('在庫数を増やす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.increaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(105))
      ).toBeTruthy();
    });

    it('増加量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.increaseQuantity(-1)).toThrow(
        '増加量は0以上でなければなりません。'
      );
    });
  });

  describe('decreaseQuantity', () => {
    it('在庫数を減らす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(95))
      ).toBeTruthy();
    });

    it('減少量が負の数の場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.decreaseQuantity(-1)).toThrow(
        '減少量は0以上でなければなりません。'
      );
    });

    it('減少後の在庫数が0未満になる場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.decreaseQuantity(101)).toThrow();
    });

    it('在庫数が0になったらステータスを在庫切れにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(100);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();
      expect(
        stock.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    });

    it('在庫数が10以下になったらステータスを残りわずかにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(90);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(10))
      ).toBeTruthy();
      expect(stock.status.equals(new Status(StatusEnum.LowStock))).toBeTruthy();
    });
  });
});
