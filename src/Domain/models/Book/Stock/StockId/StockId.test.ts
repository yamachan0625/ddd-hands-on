import { StockId } from './StockId';

// nanoid() をモックする
jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('StockId', () => {
  test('デフォルトの値でStockIdを生成する', () => {
    const stockId = new StockId();
    expect(stockId.value).toBe('testIdWithExactLength');
  });

  test('指定された値でStockIdを生成する', () => {
    const value = 'customId';
    const stockId = new StockId(value);
    expect(stockId.value).toBe(value);
  });

  test('最小長以下の値でStockIdを生成するとエラーを投げる', () => {
    const shortValue = '';
    expect(() => new StockId(shortValue)).toThrowError(
      new Error(
        `StockIdは${StockId.MIN_LENGTH}文字以上、${StockId.MAX_LENGTH}文字以下でなければなりません。`
      )
    );
  });

  test('最大長以上の値でStockIdを生成するとエラーを投げる', () => {
    const longValue = 'a'.repeat(StockId.MAX_LENGTH + 1);
    expect(() => new StockId(longValue)).toThrowError(
      new Error(
        `StockIdは${StockId.MIN_LENGTH}文字以上、${StockId.MAX_LENGTH}文字以下でなければなりません。`
      )
    );
  });
});
