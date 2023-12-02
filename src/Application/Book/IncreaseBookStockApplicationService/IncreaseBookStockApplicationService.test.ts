import { InMemoryBookRepository } from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { MockTransactionManager } from 'Application/shared/MockTransactionManager';
import { bookTestDataCreator } from 'Infrastructure/shared/Book/bookTestDataCreator';
import {
  IncreaseBookStockApplicationService,
  IncreaseBookStockCommand,
} from './IncreaseBookStockApplicationService';

describe('IncreaseBookStockApplicationService', () => {
  it('書籍の在庫を増加することができる', async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const increaseBookStockApplicationService =
      new IncreaseBookStockApplicationService(
        repository,
        mockTransactionManager
      );

    // テスト用データ準備
    const bookId = '9784167158057';
    await bookTestDataCreator(repository)({
      bookId,
      quantityAvailable: 0,
    });

    const incrementAmount = 100;
    const command: IncreaseBookStockCommand = {
      bookId,
      incrementAmount,
    };
    await increaseBookStockApplicationService.execute(command);

    const updatedBook = await repository.find(new BookId(bookId));
    expect(updatedBook?.quantityAvailable.value).toBe(incrementAmount);
  });
});
