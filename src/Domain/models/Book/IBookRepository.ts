import { Book } from './Book';
import { BookId } from './BookId/BookId';
import { IDomainEventPublisher } from '../../shared/DomainEvent/IDomainEventPublisher';

export interface IBookRepository {
  save(book: Book, domainEventPublisher: IDomainEventPublisher): Promise<void>;
  update(
    book: Book,
    domainEventPublisher: IDomainEventPublisher
  ): Promise<void>;
  delete(
    book: Book,
    domainEventPublisher: IDomainEventPublisher
  ): Promise<void>;
  find(bookId: BookId): Promise<Book | null>;
}
