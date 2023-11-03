import { BookId } from './BookId';

describe('BookId', () => {
  // 正常系
  test('有効なフォーマットの場合正しい変換結果を期待', () => {
    expect(new BookId('ISBN978-4-16-715805-7').value).toBe('9784167158057');
    expect(new BookId('978-4-16-715805-7').value).toBe('9784167158057');
    expect(new BookId('9784167158057').value).toBe('9784167158057');
  });

  test('旧ISBN(10桁)で入力された場合978を頭に追加した新ISBNに変換される', () => {
    const isbn10 = '4167158051';
    const bookId = new BookId(isbn10);
    expect(bookId.value).toBe('9784167158057'); // 正しい変換結果を期待
  });

  test('equals', () => {
    const bookId1 = new BookId('9784167158057');
    const bookId2 = new BookId('9784167158057');
    const bookId3 = new BookId('9781234567890');
    expect(bookId1.equals(bookId2)).toBeTruthy();
    expect(bookId1.equals(bookId3)).toBeFalsy();
  });

  test('toISBN', () => {
    const bookId = new BookId('9784167158057');
    expect(bookId.toISBN()).toBe('ISBN978-4-16-715805-7');
  });

  // 異常系
  test('不正な文字数の場合にエラーを投げる', () => {
    // 境界値のテスト
    expect(() => new BookId('1'.repeat(101))).toThrow('ISBNの文字数が不正です');
    expect(() => new BookId('1'.repeat(9))).toThrow('ISBNの文字数が不正です');
  });

  test('不正なフォーマットの場合にエラーを投げる', () => {
    expect(() => new BookId('187437538537852742')).toThrow(
      '不正なISBNの形式です'
    );
  });
});
