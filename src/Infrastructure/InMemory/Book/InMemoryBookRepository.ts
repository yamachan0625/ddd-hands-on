import { Book } from 'Domain/models/Book/Book';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';

export class InMemoryBookRepository implements IBookRepository {
  public DB: {
    [id: string]: Book;
  } = {};

  async save(book: Book, domainEventPublisher: IDomainEventPublisher) {
    this.DB[book.bookId.value] = book;
    domainEventPublisher;
  }

  async update(book: Book, domainEventPublisher: IDomainEventPublisher) {
    this.DB[book.bookId.value] = book;
    domainEventPublisher;
  }

  async delete(book: Book, domainEventPublisher: IDomainEventPublisher) {
    delete this.DB[book.bookId.value];
    domainEventPublisher;
  }

  async find(bookId: BookId): Promise<Book | null> {
    const book = Object.entries(this.DB).find(([id]) => {
      return bookId.value === id.toString();
    });

    return book ? book[1] : null;
  }
}
