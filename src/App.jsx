import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'


function App() {
  const bookData = [
{ id: 1, title: "Harry Potter", author: "J.K. Rowling", description: "Orphan Harry learns he is a wizard",
price: 15.70, isbn: "978-1408825945", stock: 10 },
{ id: 2, title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind", price:
22.99, isbn: "978-0062316097", stock: 50 },
]

  return (
  <>
    <h3>Book List</h3>
    <BookList data={bookData}/>
  </>
);
}

export default App
