// Server component

import IndexClientPage from './client';
import { Book } from './types';

export default async function IndexPage(){

  const books: Book[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('../books.json').then((data) => data.library.map((obj) => obj.book)))
    }, 3000)
  })
  const genres: Book['genre'][] = Array.from(new Set(books.map(book => book.genre)))

  return <IndexClientPage books={books} genres={genres} />
}
