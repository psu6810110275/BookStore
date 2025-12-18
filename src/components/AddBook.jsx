import { Button, Form, Select, Input, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL_CATEGORY = "/api/book-category";

export default function AddBook(props) {
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm(); // 1. เรียกใช้ Hook Form เพื่อสั่งล้างข้อมูลได้

    // ดึงข้อมูล Category
    const fetchCategories = async () => {
        try {
            const response = await axios.get(URL_CATEGORY);
            // แปลงข้อมูลให้เป็น format { label, value }
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
        fetchCategories();
    }, []);

    const onFinish = (values) => {
        // ส่งข้อมูลกลับไปให้ App.jsx
        props.onBookAdded(values); 
        
        // 2. ล้างข้อมูลในฟอร์มหลังจากกด Submit
        form.resetFields(); 
    };

    return (
        <Form form={form} layout="inline" onFinish={onFinish}>
            
            {/* 3. เพิ่มช่องกรอก Title */}
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input placeholder="Book Title"/>
            </Form.Item>

            {/* 4. เพิ่มช่องกรอก Author ตามโจทย์ข้อ 1 */}
            <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                <Input placeholder="Author Name"/>
            </Form.Item>
            
            {/* 5. เพิ่มช่องกรอก Price */}
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber placeholder="Price" min={0}/>
            </Form.Item>
            
            {/* 6. เพิ่มช่องกรอก Stock */}
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                <InputNumber placeholder="Stock" min={0}/>
            </Form.Item>

            <Form.Item 
                name="categoryId" 
                label="Category" 
                rules={[{ required: true, message: "Please select a category" }]}
            >
                <Select 
                    allowClear 
                    style={{ width: "150px" }} 
                    placeholder="Select..."
                    options={categories} 
                />
            </Form.Item>
            
             <Form.Item>
                <Button type="primary" htmlType="submit">New Book</Button>
            </Form.Item>
        </Form>
    );
}