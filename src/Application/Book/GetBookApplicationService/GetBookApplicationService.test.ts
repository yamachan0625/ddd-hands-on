import { InMemoryBookRepository } from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import { GetBookApplicationService } from './GetBookApplicationService';
import { bookTestDataCreator } from 'Infrastructure/shared/Book/bookTestDataCreator';
import { BookDTO } from '../BookDTO';

describe('GetBookApplicationService', () => {
  it('指定されたIDの書籍が存在する場合、DTOに詰め替えられ、取得できる', async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    // テスト用データ作成
    const createdBook = await bookTestDataCreator(repository)({});

    const data = await getBookApplicationService.execute(
      createdBook.bookId.value
    );

    expect(data).toEqual(new BookDTO(createdBook));
  });

  it('指定されたIDの書籍が存在しない場合、nullが取得できる', async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    const data = await getBookApplicationService.execute('9784167158057');

    expect(data).toBeNull();
  });
});
