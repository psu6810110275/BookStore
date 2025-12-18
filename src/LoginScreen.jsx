import { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import axios from 'axios';

const URL_AUTH = "/api/auth/login";

export default function LoginScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const handleLogin = async (formData) => {
        try {
            setIsLoading(true);
            setErrMsg(null);

            // 1. ยิง API ไปที่ URL_AUTH พร้อม formData
            const response = await axios.post(URL_AUTH, formData);

            // 2. ดึง token ออกมาจาก response
            const token = response.data.access_token;

            // ตั้งค่า Header สำหรับ Request ถัดๆ ไป
            axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };
            
            // แจ้ง Component แม่ (App.jsx) ว่า Login สำเร็จแล้ว
            props.onLoginSuccess(token);

        } catch (err) {
            console.log(err);
            setErrMsg(err.message || "Login Failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form
            onFinish={handleLogin}
            autoComplete="off"
            style={{ width: "300px", margin: "0 auto", paddingTop: "50px" }}
        >
            {/* แสดง Alert เมื่อมี Error */}
            {errMsg && (
                <Form.Item>
                    <Alert message={errMsg} type="error" />
                </Form.Item>
            )}

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}