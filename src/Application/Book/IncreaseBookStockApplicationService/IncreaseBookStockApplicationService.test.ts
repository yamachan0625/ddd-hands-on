import { InMemoryBookRepository } from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { MockTransactionManager } from 'Application/shared/MockTransactionManager';
import { bookTestDataCreator } from 'Infrastructure/shared/Book/bookTestDataCreator';
import {
  IncreaseBookStockApplicationService,
  IncreaseBookStockCommand,
} from './IncreaseBookStockApplicationService';
import { MockDomainEventPublisher } from 'Infrastructure/DomainEvent/Mock/MockDomainEventPublisyer';

describe('IncreaseBookStockApplicationService', () => {
  it('書籍の在庫を増加することができる', async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const mockDomainEventPublisher = new MockDomainEventPublisher();
    const increaseBookStockApplicationService =
      new IncreaseBookStockApplicationService(
        repository,
        mockTransactionManager,
        mockDomainEventPublisher
      );

    // テスト用データ準備
    const bookId = '9784167158057';
    await bookTestDataCreator(repository)({
      bookId,
    });

    const incrementAmount = 100;
    const command: Required<IncreaseBookStockCommand> = {
      bookId,
      incrementAmount,
    };
    await increaseBookStockApplicationService.execute(command);

    const updatedBook = await repository.find(new BookId(bookId));
    expect(updatedBook?.quantityAvailable.value).toBe(incrementAmount);
  });

  it('書籍が存在しない場合エラーを投げる', async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const mockDomainEventPublisher = new MockDomainEventPublisher();
    const increaseBookStockApplicationService =
      new IncreaseBookStockApplicationService(
        repository,
        mockTransactionManager,
        mockDomainEventPublisher
      );

    const bookId = '9784167158057';
    const incrementAmount = 100;
    const command: Required<IncreaseBookStockCommand> = {
      bookId,
      incrementAmount,
    };
    await expect(
      increaseBookStockApplicationService.execute(command)
    ).rejects.toThrow();
  });
});
