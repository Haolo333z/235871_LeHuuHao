cat << 'EOF' > README.md
# Hệ thống quản lý thiết bị phòng học trên nền tảng đám mây

- **Họ và tên:** Lê Hữu Hào
- **MSSV:** 235871
- **Học phần:** Điện toán đám mây

## 1. Công nghệ sử dụng
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Cơ sở dữ liệu:** MongoDB Atlas
- **Đóng gói & Triển khai:** Docker, Docker Hub, Render

## 2. Cấu trúc dự án
- `backend/`: Chứa mã nguồn API, kết nối cơ sở dữ liệu MongoDB Atlas.
- `frontend/`: Chứa giao diện người dùng React kết nối backend.
- `README.md`: Tài liệu hướng dẫn cài đặt và thông tin triển khai.

## 3. Hướng dẫn cài đặt và chạy thử nghiệm (Câu 5 & Câu 6)

### Thông tin Docker Images:
- Backend Image: `haolo333z/backend-device:v1`
- Frontend Image: `haolo333z/frontend-device:v1`

### Chạy Backend container:
```bash
docker run -d -p 5000:5000 --name backend-container -e PORT=5000 -e MONGO_URI="mongodb+srv://admin_exam:Hao12345678@cluster0.maoes6s.mongodb.net/235871_LeHuuHao?retryWrites=true&w=majority" haolo333z/backend-device:v1
## Thông tin triển khai Render
- Frontend URL: https://web-235871.onrender.com
