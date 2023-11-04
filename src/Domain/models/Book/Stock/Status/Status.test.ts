import { Status, StatusEnum } from './Status';

describe('Statusクラスのテスト', () => {
  it('有効なステータスでインスタンスが生成されること', () => {
    expect(new Status(StatusEnum.PreSale).value).toBe(StatusEnum.PreSale);
    expect(new Status(StatusEnum.OnSale).value).toBe(StatusEnum.OnSale);
    expect(new Status(StatusEnum.Discontinued).value).toBe(
      StatusEnum.Discontinued
    );
  });

  it('無効なステータスでエラーが投げられること', () => {
    const invalidStatus = 'invalid' as StatusEnum; // テストのために無効な値を渡す
    expect(() => new Status(invalidStatus)).toThrow('無効なステータスです。');
  });

  describe('toLabel()', () => {
    it('ステータスPreSaleが「販売前」に変換されること', () => {
      const status = new Status(StatusEnum.PreSale);
      expect(status.toLabel()).toBe('販売前');
    });

    it('ステータスOnSaleが「販売中」に変換されること', () => {
      const status = new Status(StatusEnum.OnSale);
      expect(status.toLabel()).toBe('販売中');
    });

    it('ステータスDiscontinuedが「販売停止」に変換されること', () => {
      const status = new Status(StatusEnum.Discontinued);
      expect(status.toLabel()).toBe('販売停止');
    });
  });
});
