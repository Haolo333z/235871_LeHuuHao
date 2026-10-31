const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Device = require('./models/Device');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint kiểm tra trạng thái máy chủ
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is healthy' });
});

// GET /api/devices (Danh sách & Tìm kiếm)
app.get('/api/devices', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { deviceId: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
          { deviceType: { $regex: search, $options: 'i' } },
          { room: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const devices = await Device.find(query);
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách thiết bị' });
  }
});

// GET /api/devices/:id (Xem chi tiết một thiết bị)
app.get('/api/devices/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: 'Không tìm thấy thiết bị' });
    res.status(200).json(device);
  } catch (err) {
    res.status(400).json({ error: 'Mã ID không hợp lệ' });
  }
});

// POST /api/devices (Thêm thiết bị mới)
app.post('/api/devices', async (req, res) => {
  try {
    const { deviceId, name, deviceType, room } = req.body;
    if (!deviceId || !name || !deviceType || !room) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đủ: deviceId, name, deviceType, room' });
    }
    const existing = await Device.findOne({ deviceId });
    if (existing) {
      return res.status(400).json({ error: 'Mã thiết bị (deviceId) đã tồn tại' });
    }
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu dữ liệu thiết bị' });
  }
});

// PUT /api/devices/:id (Cập nhật thiết bị)
app.put('/api/devices/:id', async (req, res) => {
  try {
    const { deviceId } = req.body;
    if (deviceId) {
      const existing = await Device.findOne({ deviceId, _id: { $ne: req.params.id } });
      if (existing) return res.status(400).json({ error: 'Mã thiết bị này đã thuộc về thiết bị khác' });
    }
    const updated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Không tìm thấy thiết bị để cập nhật' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Dữ liệu không hợp lệ hoặc lỗi cập nhật' });
  }
});

// DELETE /api/devices/:id (Xóa thiết bị)
app.delete('/api/devices/:id', async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Không tìm thấy thiết bị để xóa' });
    res.status(200).json({ message: 'Xóa thiết bị thành công' });
  } catch (err) {
    res.status(400).json({ error: 'Lỗi khi xóa thiết bị' });
  }
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));