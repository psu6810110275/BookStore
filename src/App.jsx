import { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen'; 

// ตั้งค่า Base URL
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  // สร้าง State เช็คสถานะการล็อกอิน (เริ่มต้นเป็น false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ฟังก์ชันนี้จะถูกเรียกเมื่อ LoginScreen ทำงานสำเร็จ
  const handleLoginSuccess = (token) => {
    // ได้ Token มาแล้ว (ตั้งค่า Header ใน LoginScreen ไปแล้ว)
    // เปลี่ยนสถานะเป็น True เพื่อให้หน้าจอเปลี่ยน
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {/* ถ้ายังไม่ Authenticate ให้โชว์หน้า Login */}
      {!isAuthenticated && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {/* ถ้า Authenticate แล้ว ให้โชว์หน้าจัดการหนังสือ */}
      {isAuthenticated && (
        <BookScreen />
      )}
    </div>
  );
}

export default App;