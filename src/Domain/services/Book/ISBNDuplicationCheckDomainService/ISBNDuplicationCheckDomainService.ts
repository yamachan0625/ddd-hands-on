import { BookId } from 'Domain/models/Book/BookId/BookId';

export class ISBNDuplicationCheckDomainService {
  async execute(isbn: BookId): Promise<boolean> {
    // データベースに問い合わせて重複があるか確認する
    const isDuplicateISBN = false;

    return isDuplicateISBN;
  }
}
