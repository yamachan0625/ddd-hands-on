import { InMemoryBookRepository } from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { MockTransactionManager } from 'Application/shared/MockTransactionManager';
import { bookTestDataCreator } from 'Infrastructure/shared/Book/bookTestDataCreator';
import {
  DeleteBookApplicationService,
  DeleteBookCommand,
} from './DeleteBookApplicationService';
import { MockDomainEventPublisher } from 'Infrastructure/DomainEvent/Mock/MockDomainEventPublisyer';

describe('DeleteBookApplicationService', () => {
  it('書籍を削除することができる', async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const mockDomainEventPublisher = new MockDomainEventPublisher();
    const deleteBookApplicationService = new DeleteBookApplicationService(
      repository,
      mockTransactionManager,
      mockDomainEventPublisher
    );

    // テスト用データ作成
    const bookId = '9784167158057';
    await bookTestDataCreator(repository)({
      bookId,
    });

    const command: Required<DeleteBookCommand> = { bookId };
    await deleteBookApplicationService.execute(command);

    const deletedBook = await repository.find(new BookId(bookId));
    expect(deletedBook).toBe(null);
  });
});
