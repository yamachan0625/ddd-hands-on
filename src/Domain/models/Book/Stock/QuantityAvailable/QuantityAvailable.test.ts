import { QuantityAvailable } from './QuantityAvailable';

describe('QuantityAvailable', () => {
  // 正常系
  it('許容される範囲内の在庫数を設定できる', () => {
    const validQuantityAvailable = 500;
    const quantity = new QuantityAvailable(validQuantityAvailable);
    expect(quantity.value).toBe(validQuantityAvailable);
  });

  // 異常系
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
});
