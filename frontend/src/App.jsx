import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    deviceId: '', name: '', deviceType: 'Máy chiếu', room: '',
    brand: '', model: '', quantity: 1, status: 'Đang sử dụng',
    purchaseDate: '', description: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDevices = async (keyword = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/devices${keyword ? `?search=${keyword}` : ''}`);
      setDevices(res.data);
      setError('');
    } catch (err) {
      setError('Không thể kết nối hoặc tải dữ liệu từ Backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDevices(search);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/devices/${editingId}`, formData);
        alert('Cập nhật thành công!');
      } else {
        await axios.post(`${API_BASE}/devices`, formData);
        alert('Thêm thiết bị thành công!');
      }
      setEditingId(null);
      setFormData({
        deviceId: '', name: '', deviceType: 'Máy chiếu', room: '',
        brand: '', model: '', quantity: 1, status: 'Đang sử dụng',
        purchaseDate: '', description: ''
      });
      fetchDevices();
    } catch (err) {
      alert(err.response?.data?.error || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (d) => {
    setEditingId(d._id);
    setFormData(d);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        await axios.delete(`${API_BASE}/devices/${id}`);
        fetchDevices();
      } catch (err) {
        alert('Xóa thất bại');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>HỆ THỐNG QUẢN LÝ THIẾT BỊ PHÒNG HỌC</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm theo mã, tên, loại, phòng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>Tìm kiếm</button>
      </form>

      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Cập nhật thông tin thiết bị' : 'Thêm thiết bị mới'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <input name="deviceId" placeholder="Mã thiết bị (*)" value={formData.deviceId} onChange={handleChange} required />
          <input name="name" placeholder="Tên thiết bị (*)" value={formData.name} onChange={handleChange} required />
          <input name="deviceType" placeholder="Loại thiết bị (*)" value={formData.deviceType} onChange={handleChange} required />
          <input name="room" placeholder="Phòng học (*)" value={formData.room} onChange={handleChange} required />
          <input name="brand" placeholder="Hãng sản xuất" value={formData.brand} onChange={handleChange} />
          <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Số lượng" value={formData.quantity} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Đang sử dụng">Đang sử dụng</option>
            <option value="Hư hỏng">Hư hỏng</option>
            <option value="Đang sửa chữa">Đang sửa chữa</option>
            <option value="Ngừng sử dụng">Ngừng sử dụng</option>
          </select>
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
          <input style={{ gridColumn: 'span 3' }} name="description" placeholder="Mô tả / Ghi chú" value={formData.description} onChange={handleChange} />
          <button type="submit" style={{ gridColumn: 'span 3', padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {editingId ? 'Lưu thay đổi' : 'Thêm thiết bị'}
          </button>
        </form>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Mã</th>
            <th>Tên</th>
            <th>Loại</th>
            <th>Phòng</th>
            <th>Số lượng</th>
            <th>Tình trạng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d._id}>
              <td>{d.deviceId}</td>
              <td>{d.name}</td>
              <td>{d.deviceType}</td>
              <td>{d.room}</td>
              <td>{d.quantity}</td>
              <td style={{
                fontWeight: 'bold',
                color: d.status === 'Đang sử dụng' ? 'green' : d.status === 'Hư hỏng' ? 'red' : 'orange'
              }}>{d.status}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Sửa</button>
                <button onClick={() => handleDelete(d._id)} style={{ marginLeft: '5px', color: 'red' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}