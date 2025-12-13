import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
   <table border="1">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Description</th>
        <th>Price</th>
        <th>ISBN</th>
        <th>Stock</th>
      </tr>
      <tr>
        <td>Harry Potter</td>
        <td>J.K. Rowling</td>
        <td>Orphan Harry learns he is a wizard</td>
        <td>15.70</td>
        <td>978-1408825945</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Sapiens</td>
        <td>Yuval Noah Harari</td>
        <td>A brief history of humankind</td>
        <td>22.99</td>
        <td>978-0062316097</td>
        <td>50</td>
      </tr>
    </table>
);
}

export default App
