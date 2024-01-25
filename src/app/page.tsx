'use client' // Client component -> (states, interactions...)

import { useState } from 'react'
import data from '../books.json'
import { Book, Author } from './types';

// console.log(data)


const books: Book[] = data.library.map((d) => d.book)
console.log(books )

export default function Home() {

  const [genre, setGenre] = useState<string>("");
  const matches = genre ? books.filter(book => {
    if(genre && book.genre !== genre) return false
    return true
  }) : books

  return (
    <article className='grid gap-4'>
      <nav>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Terror">Terror</option>
          <option value="Zombies">Zombies</option>
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
