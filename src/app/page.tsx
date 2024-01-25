// Server component

import IndexClientPage from './client';
import { Book } from './types';

const api = {
  book: {
    list: async (): Promise<Book[]> => import('../books.json').then((data) => data.library.map((obj) => obj.book))
  }
}

export default async function IndexPage(){

  const books = await api.book.list()
  const genres: Book['genre'][] = Array.from(new Set(books.map(book => book.genre)))

  return <IndexClientPage books={books} genres={genres} />
}
