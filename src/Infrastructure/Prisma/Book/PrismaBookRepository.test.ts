import { PostgreSQLBookRepository } from './PrismaBookRepository';
import { bookTestDataCreator } from 'Infrastructure/shared/Book/bookTestDataCreator';
import { Book } from 'Domain/models/Book/Book';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { Title } from 'Domain/models/Book/Title/Title';
import { Price } from 'Domain/models/Book/Price/Price';
import { QuantityAvailable } from 'Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from 'Domain/models/Book/Stock/Status/Status';
import { Stock } from 'Domain/models/Book/Stock/Stock';
import { PrismaClientManager } from '../PrismaClientManager';
import prisma from '../prismaClient';
import { ITransactionManager } from 'Application/shared/ITransactionManager';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';

describe('PostgreSQLBookRepository', () => {
  beforeEach(async () => {
    // テストごとにデータを初期化する
    await prisma.$transaction([prisma.book.deleteMany()]);
    await prisma.$disconnect();
  });

  const clientManager = new PrismaClientManager();
  const repository = new PostgreSQLBookRepository(clientManager);

  test('saveした集約がfindで取得できる', async () => {
    const bookId = new BookId('9784167158057');
    const title = new Title('吾輩は猫である');
    const price = new Price({
      amount: 770,
      currency: 'JPY',
    });
    const book = Book.create(bookId, title, price);
    await repository.save(book);

    const createdEntity = await repository.find(bookId);
    expect(createdEntity?.bookId.equals(bookId)).toBeTruthy();
    expect(createdEntity?.title.equals(title)).toBeTruthy();
    expect(createdEntity?.price.equals(price)).toBeTruthy();
    expect(createdEntity?.stockId.equals(book.stockId)).toBeTruthy();
    expect(
      createdEntity?.quantityAvailable.equals(book.quantityAvailable)
    ).toBeTruthy();
    expect(createdEntity?.status.equals(book.status)).toBeTruthy();
  });

  test('updateできる', async () => {
    const createdEntity = await bookTestDataCreator(repository)({});

    const stock = Stock.reconstruct(
      createdEntity.stockId,
      new QuantityAvailable(100),
      new Status(StatusEnum.InStock)
    );

    const book = Book.reconstruct(
      createdEntity.bookId,
      new Title('吾輩は猫である(改訂版))'),
      new Price({
        amount: 800,
        currency: 'JPY',
      }),
      stock
    );

    await repository.update(book);
    const updatedEntity = await repository.find(createdEntity.bookId);
    expect(updatedEntity?.bookId.equals(book.bookId)).toBeTruthy();
    expect(updatedEntity?.title.equals(book.title)).toBeTruthy();
    expect(updatedEntity?.price.equals(book.price)).toBeTruthy();
    expect(updatedEntity?.stockId.equals(book.stockId)).toBeTruthy();
    expect(
      updatedEntity?.quantityAvailable.equals(book.quantityAvailable)
    ).toBeTruthy();
    expect(updatedEntity?.status.equals(book.status)).toBeTruthy();
  });

  it('deleteできる', async () => {
    const createdEntity = await bookTestDataCreator(repository)({});

    const readEntity = await repository.find(createdEntity.bookId);
    expect(readEntity).not.toBeNull();

    await repository.delete(createdEntity.bookId);
    const deletedEntity = await repository.find(createdEntity.bookId);
    expect(deletedEntity).toBeNull();
  });
});

class Service {
  constructor(
    private repository: IBookRepository,
    private transactionManager: ITransactionManager
  ) {}

  async createBook() {
    await this.transactionManager.run(async () => {
      const bookId = new BookId('9784167158057');
      const title = new Title('吾輩は猫である');
      const price = new Price({
        amount: 770,
        currency: 'JPY',
      });
      const book = Book.create(bookId, title, price);
      await this.repository.save(book);
    });
  }
}
