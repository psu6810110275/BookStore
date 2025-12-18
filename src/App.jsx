import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import Clock from './components/Clock';
import { Button } from 'antd'
import AddBook from './components/AddBook';
import axios from 'axios'
import { Divider, Spin } from 'antd';


axios.defaults.baseURL = "http://localhost:3000"
const URL_BOOK = "/api/book"


function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);


  //เพิ่ม function สำหรับดึงข้อมูล
  const fetchBooks = async () => {
    setLoading(true); // เริ่มโหลด หมุนติ้วๆ
    try {
      const response = await axios.get(URL_BOOK);
      // นำข้อมูลที่ได้จาก Server ใส่เข้าไปใน State
      setBookData(response.data); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // โหลดเสร็จแล้ว หยุดหมุน
    }
  }

   //เรียกfunction เมื่อหน้าload web ครั้งแรก
  useEffect(() => {
    fetchBooks();
  }, []); // ใส่ [] เพื่อให้ทำงานแค่ครั้งแรกครั้งเดียว

  // ... (ฟังก์ชัน handleLiked, handleDeleted, อื่นๆ ของเดิมเก็บไว้ได้)
  
  // ... (ส่วน useEffect คำนวณ totalAmount ของเดิมเก็บไว้ได้)


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
    <AddBook onBookAdded={ book => {
      setBookData([...bookData, book])
    }}/>
    <h3>My books worth {totalAmount} dollars</h3>
    {`Counter : ${counter}`}
    <Spin spinning={loading}>
    <BookList data={bookData} onLiked={handleLiked} onDeleted={handleDeleted} />
    </Spin>
    <div>
      <Clock/>
    </div>
  </>
);
}

export default App
