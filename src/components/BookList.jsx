import { Table, Button, Space, Popconfirm, Tag, Image } from 'antd';

export default function BookList(props) {
  
  const columns = [
    {
      title: "Cover",
      dataIndex: "coverUrl", 
      key: "cover",
      render: (text) => (
        <Image 
          // ⚠️ เช็คตรงนี้: ถ้า Server รูปภาพ run ที่ port 3080 ให้ใช้ 3080 
          // แต่ถ้า API กับรูปอยู่ที่เดียวกัน (3000) ให้เปลี่ยนเป็น 3000 ครับ
          src={`http://localhost:3080/${text}`} 
          height={100} 
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
         <span style={{ color: stock < 50 ? 'red' : 'green' }}>{stock}</span>
      )
    },
    {
        // ✅ จุดที่แก้ไข: ดึงค่า .name ออกมาจาก Object category
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => {
          // ใช้ ?.name เพื่อกัน error กรณีข้อมูลเป็น null
          return (
             <Tag color="blue">{category?.name || 'General'}</Tag>
          )
        },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => props.onLiked(record.id)}>
             Like ({record.likeCount || 0})
          </Button>
          
          {/* ✅ เพิ่มปุ่ม Edit ตรงนี้ */}
          {/* ส่ง record ไปทั้งหมด เพื่อเอาไป set ลง Form */}
          <Button onClick={() => props.onEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete the book"
            description="Are you sure to delete this book?"
            onConfirm={() => props.onDeleted(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={props.data} 
      rowKey="id" 
    />
  );
}