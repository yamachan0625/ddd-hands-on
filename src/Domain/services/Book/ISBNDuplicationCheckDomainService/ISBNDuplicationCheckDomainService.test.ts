import { ISBNDuplicationCheckDomainService } from './ISBNDuplicationCheckDomainService';
import { InMemoryBookRepository } from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import { BookId } from '../../../models/Book/BookId/BookId';
import { Book } from '../../../models/Book/Book';
import { Title } from '../../../models/Book/Title/Title';
import { Price } from '../../../models/Book/Price/Price';

describe('ISBNDuplicationCheckDomainService', () => {
  let isbnDuplicationCheckDomainService: ISBNDuplicationCheckDomainService;
  let inMemoryBookRepository: InMemoryBookRepository;

  beforeEach(() => {
    // テスト前に初期化する
    inMemoryBookRepository = new InMemoryBookRepository();
    isbnDuplicationCheckDomainService = new ISBNDuplicationCheckDomainService(
      inMemoryBookRepository
    );
  });

  test('重複がない場合、falseを返す', async () => {
    const isbn = new BookId('9784167158057');
    const result = await isbnDuplicationCheckDomainService.execute(isbn);
    expect(result).toBeFalsy();
  });

  test('重複がある場合、trueを返す', async () => {
    const isbn = new BookId('9784167158057');
    const title = new Title('吾輩は猫である');
    const price = new Price({
      amount: 770,
      currency: 'JPY',
    });
    const book = Book.create(isbn, title, price);

    await inMemoryBookRepository.save(book);

    const result = await isbnDuplicationCheckDomainService.execute(isbn);
    expect(result).toBeTruthy();
  });

  test('異なるISBNで重複がない場合、falseを返す', async () => {
    const existingIsbn = new BookId('9784167158057');
    const newIsbn = new BookId('9784167158064');
    const title = new Title('テスト書籍');
    const price = new Price({ amount: 500, currency: 'JPY' });
    const book = Book.create(existingIsbn, title, price);

    await inMemoryBookRepository.save(book);

    const result = await isbnDuplicationCheckDomainService.execute(newIsbn);
    expect(result).toBeFalsy();
  });
});
