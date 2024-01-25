// Server component

import IndexClientPage from './client';
import { Book } from './types';

export default async function IndexPage(){

  const books: Book[] = await import('../books.json').then((data) => data.library.map((obj) => obj.book))
  const genres: Book['genre'][] = Array.from(new Set(books.map(book => book.genre)))

  return <IndexClientPage books={books} genres={genres} />
}
