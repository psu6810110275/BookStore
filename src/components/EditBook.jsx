import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
    const [form] = Form.useForm();

    // 1. ใช้ useEffect ตรวจสอบ props.isOpen 
    // เพื่อนำค่าจาก props.item มาใส่ลงใน Form
    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue({
                ...props.item, // copy ข้อมูลเดิม (title, author, price, stock)
                // ⚠️ ต้องแปลง Object category ให้เป็น ID สำหรับ Select
                categoryId: props.item.category?.id 
            });
        }
    }, [props.isOpen, props.item, form]);

    // 2. ฟังก์ชันจัดการเมื่อกดปุ่ม OK (Save)
    const handleOk = () => {
        // 3. validate ข้อมูลใน Form
        form.validateFields()
            .then(formData => {
                // ถ้าข้อมูลถูกต้อง ให้ส่งกลับไปบันทึกที่ Parent (BookScreen)
                // ตรงนี้คือ props.onSave หรือ props.onUpdate ตามที่ตั้งไว้
                props.onUpdate(formData); 
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal 
            title="Edit Book" 
            open={props.isOpen} 
            onOk={handleOk} 
            onCancel={props.onCancel}
            forceRender // บังคับให้ render form เพื่อให้ resetFields/setFields ทำงานได้แม้ modal ปิดอยู่
        >
            <Form form={form} layout="vertical">
                {/* ลอก Field มาจาก AddBook แต่เปลี่ยน layout ให้สวยงามใน Modal */}
                
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                
                <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>

                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select 
                        options={props.categories} 
                        placeholder="Select Category"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}