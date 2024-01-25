'use client' // Client component -> (states, interactions...)

import { useMemo, useState } from 'react'
import data from '../books.json'
import { Book } from './types';

// console.log(data)

const books: Book[] = data.library.map((d) => d.book)
// console.log(books)

const genres: string[] = Array.from(new Set(books.map(book => book.genre)))

export default function Home() {

  const [genre, setGenre] = useState<string>("");
  const matches = useMemo(() => genre ?
    books.filter((book) => {
      if(book.genre !== genre) return false
      return true
    })
  : books, [genre])

  return (
    <article className='grid gap-4'>
      <nav>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map((book) => (
          <li key={book.ISBN}>
            <img src={book.cover} className='aspect-[9/14] object-cover' alt={book.title} />
            <p>{book.title}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
