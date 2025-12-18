import { Button, Form, Select, Input, InputNumber } from 'antd';
// ❌ ไม่ต้อง import axios, useState, useEffect แล้ว (สำหรับ category)
// import axios from 'axios'; 
// import { useState, useEffect } from 'react';

export default function AddBook(props) {
    // ❌ เอา state categories ออก
    // const [categories, setCategories] = useState([]);
    
    const [form] = Form.useForm(); 

    // ❌ เอา fetchCategories และ useEffect ออกทั้งหมด
    // ...

    const onFinish = (values) => {
        props.onBookAdded(values); 
        form.resetFields(); 
    };

    return (
        <Form form={form} layout="inline" onFinish={onFinish}>
            
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input placeholder="Book Title"/>
            </Form.Item>

            <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                <Input placeholder="Author Name"/>
            </Form.Item>
            
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber placeholder="Price" min={0}/>
            </Form.Item>
            
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                <InputNumber placeholder="Stock" min={0}/>
            </Form.Item>

            <Form.Item 
                name="categoryId" 
                label="Category" 
                rules={[{ required: true, message: "Please select a category" }]}
            >
                {/* ✅ ใช้ props.categories แทน state */}
                <Select 
                    allowClear 
                    style={{ width: "150px" }} 
                    placeholder="Select..."
                    options={props.categories} 
                />
            </Form.Item>
            
             <Form.Item>
                <Button type="primary" htmlType="submit">New Book</Button>
            </Form.Item>
        </Form>
    );
}