// Server component

// import IndexClientPage from './client';
import { Book } from './types';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import IndexLoading from './loading';

const IndexClientPage = dynamic(() => import('./client')) // src -> false === no execute on pre-render

const api = {
  book: {
    list: async (): Promise<Book[]> => import('../books.json').then((data) => data.library.map((obj) => obj.book))
  }
}

export default async function IndexPage(){

  const books = await api.book.list()
  const genres: Book['genre'][] = Array.from(new Set(books.map(book => book.genre)))

  return <Suspense fallback={<IndexLoading />}>
    <IndexClientPage books={books} genres={genres} />
  </Suspense>
}
