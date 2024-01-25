// Server component

import data from '../books.json'
import IndexClientPage from './client';
import { Book } from './types';


const books: Book[] = data.library.map((d) => d.book)
const genres: Book['genre'][] = Array.from(new Set(books.map(book => book.genre)))


export default function IndexPage(){
  return <IndexClientPage books={books} genres={genres} />
}
