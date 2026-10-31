
# BÀI THI THỰC HÀNH ĐIỆN TOÁN ĐÁM MÂY

## Câu 1. Tạo repository và quản lý mã nguồn bằng GitHub

1. Tạo repository GitHub công khai theo quy ước đặt tên: `https://github.com/Haolo333z/235871_LeHuuHao`.
2. Tạo cấu trúc thư mục cho `frontend` và `backend`.
3. Tạo tệp `README.md` mô tả đề tài, công nghệ sử dụng, cấu trúc dự án và hướng dẫn cài đặt, chạy chương trình.
4. Tạo tệp `.gitignore` phù hợp (loại bỏ `node_modules/`, `dist/`, `.env`).
5. Không đưa tệp `.env`, mật khẩu, access token hoặc thông tin kết nối bí mật lên GitHub.
6. Commit và push mã nguồn sau khi hoàn thành câu này.

---

## Câu 2. Tạo cơ sở dữ liệu MongoDB Atlas

1. Tạo database có tên theo quy ước: `235871_LeHuuHao`.
2. Tạo collection: `devices`.
3. Thiết kế dữ liệu thiết bị với các trường tối thiểu:
   - `deviceId`: Mã thiết bị (duy nhất).
   - `name`: Tên thiết bị.
   - `deviceType`: Loại thiết bị.
   - `room`: Phòng học sử dụng.
   - `brand`: Hãng sản xuất.
   - `model`: Model thiết bị.
   - `quantity`: Số lượng.
   - `status`: Tình trạng thiết bị (`Đang sử dụng`, `Đang sửa chữa`, `Hư hỏng`, `Ngừng sử dụng`).
   - `purchaseDate`: Ngày trang bị.
   - `description`: Mô tả, ghi chú.
4. Thêm tối thiểu 3 bản ghi thiết bị mẫu có dữ liệu hợp lý:
   - Máy chiếu (`DEV001`).
   - Máy tính (`DEV003`).
   - Thiết bị âm thanh (`DEV002`).
5. Cấu hình quyền truy cập và chuỗi kết nối để backend có thể kết nối MongoDB Atlas (Network Access: `0.0.0.0/0` theo yêu cầu bài thực hành).
6. Không công khai thông tin xác thực trong mã nguồn.
7. Commit và push các thay đổi liên quan lên GitHub.

---

## Câu 3. Xây dựng backend API

Sử dụng Node.js và Express để xây dựng backend, kết nối MongoDB Atlas.

1. Xây dựng các API quản lý thiết bị:
   - `GET /api/devices`: Lấy danh sách thiết bị.
   - `GET /api/devices/:id`: Xem thông tin một thiết bị.
   - `POST /api/devices`: Thêm thiết bị mới.
   - `PUT /api/devices/:id`: Cập nhật thông tin thiết bị.
   - `DELETE /api/devices/:id`: Xóa thiết bị.
   - `GET /api/devices?search=keyword`: Tìm kiếm thiết bị theo mã, tên, loại hoặc phòng học.
2. Kiểm tra dữ liệu đầu vào khi thêm hoặc cập nhật thiết bị.
3. Không cho phép trùng mã thiết bị `deviceId`.
4. Xử lý trường hợp không tìm thấy thiết bị, dữ liệu không hợp lệ hoặc xảy ra lỗi kết nối.
5. Trả về dữ liệu JSON và mã trạng thái HTTP phù hợp (200, 201, 400, 404, 500).
6. Sử dụng biến môi trường để cấu hình:
   - `PORT=5000`: Cổng chạy backend.
   - `MONGO_URI`: Chuỗi kết nối cơ sở dữ liệu.
7. Tạo endpoint `GET /health` để kiểm tra trạng thái hoạt động của backend.
8. Kiểm thử các API và commit, push mã nguồn lên GitHub.

---

## Câu 4. Xây dựng frontend bằng React

Xây dựng giao diện web kết nối với backend API.

1. Xây dựng màn hình danh sách thiết bị, hiển thị mã thiết bị, tên, loại thiết bị, phòng học, số lượng và tình trạng.
2. Xây dựng chức năng xem chi tiết thiết bị.
3. Xây dựng chức năng thêm thiết bị.
4. Xây dựng chức năng cập nhật thông tin thiết bị.
5. Xây dựng chức năng xóa thiết bị.
6. Xây dựng chức năng tìm kiếm thiết bị theo từ khóa.
7. Cho phép xem tình trạng thiết bị để nhận biết thiết bị đang sử dụng, hư hỏng, đang sửa chữa hoặc ngừng sử dụng (hiển thị trực quan qua màu sắc).
8. Hiển thị trạng thái đang tải, thông báo lỗi và thông báo kết quả thao tác phù hợp.
9. Cấu hình địa chỉ backend để có thể thay đổi khi triển khai trên môi trường đám mây qua biến `VITE_API_BASE_URL`.
10. Kiểm tra các chức năng trên giao diện.
11. Commit và push mã nguồn lên GitHub.

---

## Câu 5. Đóng gói backend bằng Docker và đẩy lên Docker Hub

1. Viết `Dockerfile` để đóng gói backend (sử dụng base image `node:20-alpine`).
2. Xây dựng Docker image cho backend: `haolo333z/backend:latest`.
3. Chạy container và kiểm tra khả năng khởi động của ứng dụng.

**Lệnh chạy Docker backend trên Bash:**

```bash
docker run -d -p 5000:5000 --name backend-container \
  -e PORT=5000 \
  -e MONGO_URI \
  haolo333z/backend:latest
```

Lưu ý: Biến môi trường `MONGO_URI` phải được thiết lập trên máy trước khi chạy lệnh trên. Không ghi mật khẩu MongoDB trực tiếp vào README.

4. Kiểm tra backend hoạt động tại địa chỉ:

   `http://localhost:5000/health`

5. Kiểm tra container đang chạy:

```bash
docker ps
```

6. Đẩy Docker image backend lên Docker Hub:

```bash
docker push haolo333z/backend:latest
```

7. Cập nhật README với hướng dẫn chạy backend bằng Docker.
8. Commit và push các thay đổi lên GitHub.

---

## Câu 6. Đóng gói frontend bằng Docker và đẩy lên Docker Hub

1. Viết `Dockerfile` để đóng gói frontend theo phương pháp multi-stage build:
   - `node:alpine`: Dùng để build ứng dụng React.
   - `nginx:alpine`: Dùng để phục vụ giao diện web.

2. Xây dựng Docker image cho frontend:

   `haolo333z/frontend:latest`

3. Chạy container và kiểm tra khả năng truy cập giao diện.

**Lệnh chạy Docker frontend:**

```bash
docker run -d -p 3000:80 --name frontend-container haolo333z/frontend:latest
```

4. Truy cập giao diện frontend tại địa chỉ:

   `http://localhost:3000`

5. Đảm bảo frontend có thể kết nối đến backend theo cấu hình triển khai.

6. Đặt tên image theo quy ước đã thống nhất:

   `haolo333z/frontend:latest`

7. Đẩy Docker image frontend lên Docker Hub:

```bash
docker push haolo333z/frontend:latest
```

8. Kiểm tra image frontend đã được đẩy lên Docker Hub công khai thành công.
9. Cập nhật `README.md` với hướng dẫn chạy frontend bằng Docker.
10. Commit và push các thay đổi lên GitHub.

---

## Câu 7. Triển khai frontend trên Render

1. **Dịch vụ triển khai:**
   - Tạo dịch vụ Static Site trên Render.
   - Kết nối với nhánh `main` của repository GitHub `haolo333z/235871_LeHuuHao`.

2. **Cấu hình môi trường:**
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variable:** `VITE_API_BASE_URL=https://api-235871.onrender.com/api`

3. **Triển khai ứng dụng:**
   - Quá trình build và deploy hoàn tất.
   - Nhận URL công khai chính thức.

4. **Kiểm tra giao diện:**
   - Giao diện hiển thị đúng chuẩn responsive tại URL đã cấp.

5. **Kiểm tra chức năng:**
   - Xem danh sách thiết bị.
   - Tìm kiếm thiết bị tức thời.
   - Thêm thiết bị mới.
   - Cập nhật trạng thái thiết bị.
   - Xóa thiết bị.
   - Kiểm tra kết nối frontend với backend API.

6. **URL Frontend (Render):**

   https://web-235871.onrender.com

7. **Commit & Push:**
   - Đã cập nhật URL frontend vào `README.md`.
   - Push các thay đổi lên GitHub.

---

## Câu 8. Triển khai backend API trên Render

1. **Dịch vụ triển khai:**
   - Tạo dịch vụ Web Service trên Render.
   - Kết nối repository GitHub.
   - Thiết lập thư mục gốc là `backend/`.

2. **Cấu hình biến môi trường kết nối MongoDB Atlas:**
   - `PORT=5000`
   - `MONGO_URI=<MONGODB_ATLAS_CONNECTION_STRING>`

   Lưu ý: Chuỗi kết nối MongoDB thực tế được cấu hình tại Environment Variables trên Render, không lưu mật khẩu vào mã nguồn hoặc README.

3. **Kiểm tra endpoint `/health`:**

   https://api-235871.onrender.com/health

   Phản hồi trạng thái hoạt động:

```json
{
  "status": "OK",
  "message": "Backend is healthy"
}
```

4. **Kiểm tra các API quản lý thiết bị qua URL công khai:**

   - Lấy danh sách thiết bị:

     `GET https://api-235871.onrender.com/api/devices`

   - Chi tiết một thiết bị:

     `GET https://api-235871.onrender.com/api/devices/:id`

   - Thêm thiết bị mới:

     `POST https://api-235871.onrender.com/api/devices`

   - Cập nhật thiết bị:

     `PUT https://api-235871.onrender.com/api/devices/:id`

   - Xóa thiết bị:

     `DELETE https://api-235871.onrender.com/api/devices/:id`

   - Tìm kiếm thiết bị:

     `GET https://api-235871.onrender.com/api/devices?search=keyword`

5. **Cấu hình CORS & API Base:**
   - Cấu hình CORS Middleware trên Express.
   - Cho phép tên miền frontend `https://web-235871.onrender.com` gọi API backend.

6. **Kiểm tra nghiệp vụ:**
   - Kiểm tra chức năng thêm thiết bị.
   - Kiểm tra chức năng sửa thông tin thiết bị.
   - Kiểm tra chức năng xóa thiết bị.
   - Kiểm tra chức năng tìm kiếm.
   - Đảm bảo dữ liệu đồng bộ với MongoDB Atlas.

7. **URL Backend API chính thức:**

   https://api-235871.onrender.com

8. **Commit & Push:**
   - Đã cập nhật đầy đủ URL backend API vào `README.md`.
   - Commit và push các thay đổi lên GitHub.
