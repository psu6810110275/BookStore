import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import Clock from './components/Clock'


function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", description: "Orphan Harry learns he is a wizard",
      price: 15.70, isbn: "978-1408825945", stock: 10 ,likeCount : 10 },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind", price:
      22.99, isbn: "978-0062316097", stock: 50 ,likeCount : 7 },
  ]);

  const generateBook = () => {
    const current = bookData.length + 1
    return {
      id: current,
      title: `Dummy Book ${current}`,
      author: `Unknown${current}`,
      description: `Dummy Description ${current}`,
      price: Math.floor(Math.floor(Math.random() * 20)),
      stock: Math.floor(Math.floor(Math.random() * 50))
      }
  }

  const handleLiked = (bookId) => {
    setBookData(
      bookData.map(book => {
        return book.id === bookId ? { ...book, likeCount: book.likeCount + 1 } : book
      }
    ))
  }

  const handleDeleted = (bookId) => {
    setBookData(
      bookData.filter(book => book.id != bookId)
    )
  }


  const handleAddBook = () => {
    //setBookData([...bookData,generateBook()])
    setBookData([...bookData,{title: title, price:price, stock:stock}])
  }

  useEffect (() =>{
    setTotalAmount(bookData.reduce((total , book) => total += (book.price * book.stock),0))
  }, [bookData])

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const bookCount = bookData.reduce( (total, book) => total += book.stock, 0);
  const positiveSummary = amount => <p style={{ 'color': 'green' }}>Wow we have so many book {amount} books</p>
  const negativeSummary = amount => <p style={{ 'color': 'red' }}>Boss low on stock... {amount} books</p>

  const [counter, setCounter] = useState(0);
  const counterClicked = () => {
      console.log("Clicked");
      setCounter(counter+1);
  }





  return (
  <>
    <h3>Book List</h3>
    {bookCount >= 50 && positiveSummary(bookCount)}
    {bookCount <50 && negativeSummary(bookCount)}
    <h3>My books worth {totalAmount} dollars</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label>Title : </label>
      <input type='text' onChange={(evt) => setTitle(evt.target.value)}/>
      <label>Price : </label>
      <input type='number' onChange={(evt) => setPrice(evt.target.value)}/>
      <label>Stock : </label>
      <input type='number' onChange={(evt) => setStock(evt.target.value)}/>
    </div>
    {`Counter : ${counter}`}
    <button onClick={counterClicked}>Add Counter</button>
    <button onClick={handleAddBook}>New Book</button>
    <BookList data={bookData} onLiked={handleLiked} onDeleted={handleDeleted} />
    <div>
      <Clock/>
    </div>
  </>
);
}

export default App
