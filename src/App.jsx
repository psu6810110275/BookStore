import { useEffect, useState } from 'react'
import './App.css'
import BookList from './components/BookList'
import Clock from './components/Clock';
import AddBook from './components/AddBook';
import axios from 'axios'
import { Divider, Spin, message } from 'antd';

axios.defaults.baseURL = "http://localhost:3000"
const URL_BOOK = "/api/book"

function App() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. ดึงข้อมูล (GET) - ✅ ถูกต้อง
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL_BOOK);
      setBookData(response.data); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  // 2. เพิ่มหนังสือ (POST) - ✅ ถูกต้อง
  const handleAddBook = async (book) => {
    try {
      setLoading(true);
      const response = await axios.post(URL_BOOK, book);
      setBookData([...bookData, response.data]);
      message.success("เพิ่มหนังสือสำเร็จ!");
    } catch (err) {
      console.error("Error creating book:", err);
      message.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  }

  // 3. กด Like (POST) - ✅ ถูกต้อง
  const handleLikeBook = async (bookId) => {
    try {
      const response = await axios.post(`${URL_BOOK}/${bookId}/like`);
      setBookData(prevData => 
        prevData.map(book => 
          book.id === bookId ? response.data : book
        )
      );
    } catch (err) {
      console.error("Error liking book:", err);
    }
  }

  // 4. ❌ ลบหนังสือ (DELETE) - ⚠️ ต้องแก้ตรงนี้ครับ!
  // จากเดิม: const handleDeleted = (bookId) => { ... }
  // แก้เป็นแบบนี้ครับ:
  const handleDeleteBook = async (bookId) => {
    try {
      setLoading(true);
      // ยิง API สั่งลบที่ Server: DELETE /api/book/:id
      await axios.delete(`${URL_BOOK}/${bookId}`);
      
      // ถ้าลบสำเร็จ ให้ลบออกจาก State หน้าจอด้วย
      setBookData(prevData => prevData.filter(book => book.id !== bookId));
      message.success("ลบหนังสือเรียบร้อย");
    } catch (err) {
      console.error("Error deleting book:", err);
      message.error("ไม่สามารถลบหนังสือได้");
    } finally {
      setLoading(false);
    }
  }

  useEffect (() =>{
    setTotalAmount(bookData.reduce((total , book) => total += (book.price * book.stock),0))
  }, [bookData])

  const bookCount = bookData.reduce( (total, book) => total += book.stock, 0);

  return (
    <>
      <h3>Book List</h3>
      
      {bookCount >= 50 && <p style={{ 'color': 'green' }}>Wow we have so many book {bookCount} books</p>}
      {bookCount < 50 && <p style={{ 'color': 'red' }}>Boss low on stock... {bookCount} books</p>}
      
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={handleAddBook}/>
      </div>

      <Divider>My Books List</Divider>
      
      <h3>My books worth {totalAmount} dollars</h3>
      
      <Spin spinning={loading}>
        <BookList 
          data={bookData} 
          onLiked={handleLikeBook} 
          onDeleted={handleDeleteBook}  // ✅ อย่าลืมเปลี่ยนชื่อ function ตรงนี้ให้ตรงกับข้างบน
        />
      </Spin>
      
      <div><Clock/></div>
    </>
  );
}

export default App