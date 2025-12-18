import { useEffect, useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import Clock from './components/Clock';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import axios from 'axios';
import { Divider, Spin, message } from 'antd';

axios.defaults.baseURL = "http://localhost:3000";
const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

function BookScreen() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ 1. ใช้ State ตัวเดียว (editingBook) แทน flag เปิด/ปิด Modal
  // ถ้าเป็น null = ปิด Modal, ถ้าเป็น Object = เปิด Modal
  const [editingBook, setEditingBook] = useState(null);

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

  const fetchCategories = async () => {
    try {
        const response = await axios.get(URL_CATEGORY);
        const options = response.data.map(category => ({
            label: category.name, 
            value: category.id    
        }));
        setCategories(options);
    } catch (err) {
        console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

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

  const handleDeleteBook = async (bookId) => {
    try {
      setLoading(true);
      await axios.delete(`${URL_BOOK}/${bookId}`);
      setBookData(prevData => prevData.filter(book => book.id !== bookId));
      message.success("ลบหนังสือเรียบร้อย");
    } catch (err) {
      console.error("Error deleting book:", err);
      message.error("ไม่สามารถลบหนังสือได้");
    } finally {
      setLoading(false);
    }
  }

  // ✅ 2. สร้าง function updateBook
  const updateBook = async (formData) => {
      try {
          setLoading(true);
          
          // ✅ สร้าง payload ใหม่จาก formData เพื่อเตรียมส่ง
          const payload = { ...formData };

          payload.price = Number(payload.price);
          payload.stock = Number(payload.stock);

          // ✅ ลบค่าที่ Backend ไม่ต้องการรับ (ตามโจทย์)
          delete payload.id;
          delete payload.category; // ลบ object category เดิม (เพราะเราส่ง categoryId ไปแทนแล้ว)
          delete payload.createdAt;
          delete payload.updatedAt;

          // ✅ ใช้ PATCH ไปที่ /api/book/<id>
          // id ดึงมาจาก state editingBook ตัวปัจจุบัน
          const response = await axios.patch(`${URL_BOOK}/${editingBook.id}`, payload);
          
          // อัปเดตข้อมูลในตารางทันทีโดยไม่ต้องโหลดใหม่
          setBookData(prevData => prevData.map(book => 
              book.id === editingBook.id ? response.data : book
          ));
          
          message.success("แก้ไขข้อมูลสำเร็จ");
          
          // ✅ ปิด Modal โดยการ set state เป็น null
          setEditingBook(null);

      } catch (err) {
          console.error("Error updating book:", err);
          message.error("แก้ไขล้มเหลว");
      } finally {
          setLoading(false);
      }
  };

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
        <AddBook onBookAdded={handleAddBook} categories={categories} />
      </div>

      <Divider>My Books List</Divider>
      
      <h3>My books worth {totalAmount} dollars</h3>
      
      <Spin spinning={loading}>
        <BookList 
          data={bookData} 
          onLiked={handleLikeBook} 
          onDeleted={handleDeleteBook}
          // ✅ เมื่อกด Edit ให้ส่ง object record เข้าไปใส่ใน state โดยตรง
          onEdit={(record) => setEditingBook(record)} 
        />
      </Spin>
      
      {/* ✅ EditBook Modal */}
      <EditBook 
          // ✅ เช็คว่ามีข้อมูลหรือไม่ (!!editingBook) เพื่อเปิด/ปิด Modal
          isOpen={!!editingBook} 
          
          item={editingBook}
          categories={categories}
          
          // ✅ ส่งฟังก์ชัน updateBook ไปให้ Modal เรียกใช้ตอนกด Save
          onUpdate={updateBook}
          
          // ✅ ปิด Modal โดยการเคลียร์ค่า state
          onCancel={() => setEditingBook(null)}
      />

      <div><Clock/></div>
    </>
  );
}

export default BookScreen;