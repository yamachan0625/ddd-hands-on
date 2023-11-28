import { Book } from 'Domain/models/Book/Book';
import { BookId } from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';

export class InMemoryBookRepository implements IBookRepository {
  public DB: {
    [id: string]: Book;
  } = {};

  async save(book: Book) {
    this.DB[book.bookId.value] = book;
  }

  async update(book: Book) {
    this.DB[book.bookId.value] = book;
  }

  async delete(bookId: BookId) {
    delete this.DB[bookId.value];
  }

  async find(bookId: BookId): Promise<Book | null> {
    const book = Object.entries(this.DB).find(([id]) => {
      return bookId.value === id.toString();
    });

    return book ? book[1] : null;
  }
}
