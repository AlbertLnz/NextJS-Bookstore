'use client' // Client component -> (states, interactions...)

import { useEffect, useMemo, useState } from 'react'
import { Book } from './types';

// console.log(data)

// console.log(books)


export default function IndexClientPage({ books, genres}: {books: Book[], genres: Book['genre'][]}) {

  const [genre, setGenre] = useState<Book['genre']>("");
  const [readList, setReadList] = useState<Book['ISBN'][]>([]);
  // const [readList, setReadList] = useState<Set<Book['ISBN']>>(() => new Set());
    
  const matches = useMemo(() => genre ?
    books.filter((book) => {
      if(book.genre !== genre) return false
      return true
    })
  : books, [genre, books])

  const api = {
    readList: {
      onChange: (callback: (readList: Book['ISBN'][]) => void) => {
        function getReadList(){
          const readList = JSON.parse(localStorage.getItem('readList') ?? "[]") as Book['ISBN'][]
          callback(readList)
        }
    
        window.addEventListener('storage', getReadList)
        
        getReadList()
    
        return () => window.removeEventListener('storage', getReadList)
      },
      update: (readList: Book['ISBN'][]) => localStorage.setItem('readList', JSON.stringify(readList))
    }
  }

  const handleBookFav = (bookISBN: Book['ISBN']) => {
    const draft = readList.includes(bookISBN) 
    ? readList.filter((readBook) => readBook !== bookISBN) 
    : [...readList, bookISBN]

    setReadList(draft)

    api.readList.update(draft)

    // const draft = structuredClone(readList) // --> structuredClone supports Map and Set
    // draft.has(bookISBN) ? draft.delete(bookISBN) : draft.add(bookISBN)
    // setReadList(draft)
  }

  useEffect(() => {
    // setReadList(JSON.parse(localStorage.getItem('readList') ?? "[]") as Book['ISBN'][])
    const unsubscribe = api.readList.onChange(setReadList)

    return () => unsubscribe()
  }, [])

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
          <li key={book.ISBN} className='grid gap-2' onClick={() => handleBookFav(book.ISBN)}>
            <img src={book.cover} className='aspect-[9/14] object-cover' alt={book.title} />
            <p>{readList.includes(book.ISBN) &&
                // readList.has(book.ISBN) &&
                  <span>⭐</span>
               }
              {book.title}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
