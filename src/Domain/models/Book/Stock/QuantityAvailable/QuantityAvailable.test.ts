import { QuantityAvailable } from './QuantityAvailable';

describe('QuantityAvailable', () => {
  it('許容される範囲内の在庫数を設定できる', () => {
    const validQuantityAvailable = 500;
    const quantity = new QuantityAvailable(validQuantityAvailable);
    expect(quantity.value).toBe(validQuantityAvailable);
  });

  it('MIN未満の値でQuantityAvailableを生成するとエラーを投げる', () => {
    const lessThanMin = QuantityAvailable.MIN - 1;
    expect(() => new QuantityAvailable(lessThanMin)).toThrow(
      `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
    );
  });

  it('MAX超の値でQuantityAvailableを生成するとエラーを投げる', () => {
    const moreThanMax = QuantityAvailable.MAX + 1;
    expect(() => new QuantityAvailable(moreThanMax)).toThrow(
      `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
    );
  });

  describe('increment', () => {
    it('正の数を加算すると、在庫数が増加する', () => {
      const initialQuantity = new QuantityAvailable(10);
      const incrementAmount = 5;
      const newQuantity = initialQuantity.increment(incrementAmount);

      expect(newQuantity.value).toBe(15);
    });

    it('最大値を超える加算を試みるとエラーが発生する', () => {
      const initialQuantity = new QuantityAvailable(QuantityAvailable.MAX);
      const incrementAmount = 1;

      expect(() => initialQuantity.increment(incrementAmount)).toThrow(
        `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
      );
    });
  });

  describe('decrement', () => {
    it('正の数を減算すると、在庫数が減少する', () => {
      const initialQuantity = new QuantityAvailable(10);
      const decrementAmount = 5;
      const newQuantity = initialQuantity.decrement(decrementAmount);

      expect(newQuantity.value).toBe(5);
    });

    it('在庫数を負の数に減算しようとするとエラーが発生する', () => {
      const initialQuantity = new QuantityAvailable(0);
      const decrementAmount = 1;

      expect(() => initialQuantity.decrement(decrementAmount)).toThrow(
        `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
      );
    });
  });
});
