import { isEqual } from 'lodash';

export class BookId {
  private readonly _value: string;

  constructor(value: string) {
    this._value = this.validateAndConvert(value);
  }

  private MAX_LENGTH = 100;
  private MIN_LENGTH = 10;

  private validateAndConvert(isbn: string): string {
    if (isbn.length < this.MIN_LENGTH || isbn.length > this.MAX_LENGTH) {
      throw new Error('ISBNの文字数が不正です');
    }

    // ISBNプレフィックス（もしあれば）とハイフンを除去
    const cleanedIsbn = isbn.replace(/^ISBN-?|-/g, '');

    if (cleanedIsbn.length === 10) {
      // ISBN-10 を ISBN-13 に変換
      return this.convertIsbn10ToIsbn13(cleanedIsbn);
    } else if (cleanedIsbn.length === 13) {
      // ISBN-13 のバリデーション
      if (this.isValidIsbn13(cleanedIsbn)) {
        return cleanedIsbn;
      }
    }

    throw new Error('不正なISBNの形式です');
  }

  private convertIsbn10ToIsbn13(isbn10: string): string {
    const prefix = '978';
    const core = isbn10.substring(0, 9); // 最初の9文字を取得
    const checksum = this.calculateIsbn13Checksum(prefix + core);
    return prefix + core + checksum;
  }

  private isValidIsbn13(isbn13: string): boolean {
    return isbn13.startsWith('978');
  }

  private calculateIsbn13Checksum(isbn13: string): string {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn13.charAt(i), 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checksum = 10 - (sum % 10);
    return checksum === 10 ? '0' : checksum.toString();
  }

  equals(other: BookId): boolean {
    return isEqual(this._value, other._value);
  }

  get value(): string {
    return this._value;
  }

  toISBN(): string {
    // この例では 'ISBN978-4-16-715805-7' のような特定のフォーマットに限定
    const isbnPrefix = this._value.substring(0, 3); // 最初の3桁 (978)
    const groupIdentifier = this._value.substring(3, 4); // 国コードなど（1桁）
    const publisherCode = this._value.substring(4, 6); // 出版者コード（2桁）
    const bookCode = this._value.substring(6, 12); // 書籍コード（6桁）
    const checksum = this._value.substring(12); // チェックディジット（1桁）

    return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
  }
}
