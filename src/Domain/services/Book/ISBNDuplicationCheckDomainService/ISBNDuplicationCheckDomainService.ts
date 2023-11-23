import { BookId } from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';

export class ISBNDuplicationCheckDomainService {
  constructor(private bookRepository: IBookRepository) {}

  async execute(isbn: BookId): Promise<boolean> {
    // データベースに問い合わせて重複があるか確認する
    const duplicateISBN = await this.bookRepository.find(isbn);
    const isisDuplicateISBN = !!duplicateISBN;

    return isisDuplicateISBN;
  }
}
