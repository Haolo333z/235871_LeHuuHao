# BÀI THI THỰC HÀNH ĐIỆN TOÁN ĐÁM MÂY

## BẢNG THÔNG TIN NỘP BÀI (CÂU 9)
| Mục | Thông tin triển khai |
| :--- | :--- |
| **Họ và tên sinh viên** | Lê Hữu Hào |
| **Mã số sinh viên (MSSV)** | 235871 |
| **Học phần** | Điện toán đám mây |
| **Frontend Cloud URL** | [https://web-235871.onrender.com](https://web-235871.onrender.com) |
| **Backend Cloud API URL** | [https://api-235871.onrender.com](https://api-235871.onrender.com) |
| **API Health Check** | [https://api-235871.onrender.com/health](https://api-235871.onrender.com/health) |
| **API Devices** | [https://api-235871.onrender.com/api/devices](https://api-235871.onrender.com/api/devices) |
| **Docker Hub Backend** | haolo333z/backend:latest |
| **Docker Hub Frontend** | haolo333z/frontend:latest |
| **GitHub Repository** | [https://github.com/Haolo333z/235871_LeHuuHao](https://github.com/Haolo333z/235871_LeHuuHao) |

---

## 1. Giới thiệu hệ thống & Công nghệ sử dụng
Hệ thống Quản lý Thiết bị Phòng học được xây dựng theo kiến trúc Microservices/Client-Server hiện đại, đóng gói container và triển khai tự động trên nền tảng Cloud:
- **Frontend:** React (Vite), Axios, thiết kế giao diện tương thích responsive.
- **Backend:** Node.js, Express RESTful API.
- **Cơ sở dữ liệu (Database):** MongoDB Atlas (Cloud NoSQL Database).
- **Đóng gói & Phân phối:** Docker, Docker Hub.
- **Triển khai ứng dụng (Cloud Deployment):** Render (Static Site cho Frontend và Web Service cho Backend API).

---

## 2. Cấu trúc thư mục dự án
```text
235871_LeHuuHao/
├── backend/
│   ├── models/            # Schema định nghĩa cấu trúc thiết bị MongoDB
│   ├── routes/            # Các tuyến API CRUD thiết bị và Health check
│   ├── server.js          # Khởi tạo Express server, kết nối Database
│   ├── Dockerfile         # Đóng gói backend (node:20-alpine)
│   └── package.json       # Thư viện phụ thuộc backend
├── frontend/
│   ├── src/               # Mã nguồn React giao diện người dùng
│   ├── Dockerfile         # Đóng gói frontend chạy qua Nginx
│   ├── nginx.conf         # Cấu hình web server Nginx
│   └── package.json       # Thư viện phụ thuộc frontend
├── docker-compose.yml     # Quản lý chạy đồng thời toàn bộ hệ thống
└── README.md              # Báo cáo tổng hợp và hướng dẫn cài đặt
