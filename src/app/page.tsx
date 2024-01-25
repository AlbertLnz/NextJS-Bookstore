'use client' // Client component -> (states, interactions...)

import data from '../books.json'
import { Book, Author } from './types';

// console.log(data)


const books: Book[] = data.library.map((d) => d.book)
console.log(books )

export default function Home() {
  return (
    <main>
      
    </main>
  );
}
