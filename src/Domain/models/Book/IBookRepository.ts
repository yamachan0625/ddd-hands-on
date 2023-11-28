import { Book } from './Book';
import { BookId } from './BookId/BookId';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  update(book: Book): Promise<void>;
  delete(bookId: BookId): Promise<void>;
  find(bookId: BookId): Promise<Book | null>;
}
