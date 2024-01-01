import { injectable, inject } from 'tsyringe';

import { ITransactionManager } from 'Application/shared/ITransactionManager';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';

export type DeleteBookCommand = {
  bookId: string;
};

@injectable()
export class DeleteBookApplicationService {
  constructor(
    @inject('IBookRepository')
    private bookRepository: IBookRepository,
    @inject('ITransactionManager')
    private transactionManager: ITransactionManager,
    @inject('IDomainEventPublisher')
    private domainEventPublisher: IDomainEventPublisher
  ) {}

  async execute(command: DeleteBookCommand): Promise<void> {
    await this.transactionManager.begin(async () => {
      const book = await this.bookRepository.find(new BookId(command.bookId));

      if (!book) {
        throw new Error('書籍が存在しません');
      }

      book.delete();

      await this.bookRepository.delete(book, this.domainEventPublisher);
    });
  }
}
