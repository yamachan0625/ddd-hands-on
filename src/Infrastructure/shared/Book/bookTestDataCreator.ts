import { Book } from 'Domain/models/Book/Book';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import { Price } from 'Domain/models/Book/Price/Price';
import { QuantityAvailable } from 'Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from 'Domain/models/Book/Stock/Status/Status';
import { Stock } from 'Domain/models/Book/Stock/Stock';
import { StockId } from 'Domain/models/Book/Stock/StockId/StockId';
import { Title } from 'Domain/models/Book/Title/Title';

export const bookTestDataCreator =
  (repository: IBookRepository) =>
  async ({
    bookId = '9784167158057',
    title = '吾輩は猫である',
    priceAmount = 770,
    stockId = 'test-stock-id',
    quantityAvailable = 0,
    status = StatusEnum.OutOfStock,
  }): Promise<Book> => {
    const entity = Book.reconstruct(
      new BookId(bookId),
      new Title(title),
      new Price({ amount: priceAmount, currency: 'JPY' }),
      Stock.reconstruct(
        new StockId(stockId),
        new QuantityAvailable(quantityAvailable),
        new Status(status)
      )
    );

    await repository.save(entity);

    return entity;
  };
