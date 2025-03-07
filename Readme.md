# Backend Chia Sẻ Ảnh

Đây là một backend Node.js cho ứng dụng chia sẻ ảnh, được xây dựng bằng Express, Prisma (MySQL), xác thực JWT và Swagger để tài liệu hóa API. Nó hỗ trợ đăng ký/đăng nhập người dùng, tải ảnh lên, bình luận và quản lý ảnh.

## Tính năng

- Xác thực người dùng (đăng ký, đăng nhập) với JWT
- Tải lên và quản lý ảnh (tạo, xóa, lưu)
- Bình luận trên ảnh
- Tìm kiếm ảnh theo tiêu đề
- Tài liệu API bằng Swagger
- Tải file lên với Multer (lưu trữ cục bộ)

## Yêu cầu trước khi bắt đầu

- **Node.js**: Phiên bản 18 trở lên
- **MySQL**: Phiên bản 8 trở lên
- **NPM**: Đi kèm với Node.js

# 1. Setup DB

`docker run --name my_db -e MYSQL_ROOT_PASSWORD=123456 -p 3308:3306 -d mysql:latest`

Open table plus, run:

`create database my_database;`

# 2. Khởi tạo Prisma: Chạy lệnh:

`npx prisma init`

# 3. Cấu hình schema.prisma: Mở file prisma/schema.prisma và chỉnh sửa như sau:

```shell
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  createdAt DateTime @default(now())
```

# 4. Tạo bảng trong database: Chạy lệnh để áp dụng schema vào MySQL

`npx prisma migrate dev --name init`

CALL API -> Controller -> Service -> Prisma -> Database

GET: lay du lieu
POST: tao
PUT: sua
DELETE: xoa

GET /users
POST /users : tao users

===========================
prompt:

tôi là một developer. tôi mới tìm hiểu nodejs.
tôi muốn xây dựng backend với database là mysql, backend nodejs express prisma (package.json "type":"module",)

thiet ke database de implement duoc cac API trong hinh.
ouput mong muon: file schema.prisma voi database da thiet ke
giai thich cach bang, field va moi he lien giua chung

===============================
hay implement cac API noi tren theo mo hinh router -> controller -> service (goi prisma de tuong tac voi db)

# 5. Start project

Tao file .env

```env
DATABASE_URL="mysql://<tên_người_dùng>:<mật_khẩu>@localhost:3306/image_sharing"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

```shell
npm install
mkdir uploads
```

Nếu đã có thư mục prisma/migrations/
Nếu thư mục prisma/migrations/ đã tồn tại (tức là bạn đã chạy migration trước đó):
Kiểm tra database có đồng bộ không:

```shell
npx prisma migrate status
```

Nếu database đã đồng bộ, bạn không cần làm gì thêm.
Nếu database thiếu migration, chạy:

```shell
npx prisma migrate deploy
```

để áp dụng các migration còn thiếu.

Khi thay đổi schema.prisma:
Chạy lại lệnh sau để tạo và áp dụng migration mới:

```shell
npx prisma migrate dev --name <tên_migration>
```

Ví dụ: `npx prisma migrate dev --name add_field`.

```
project/
├── prisma/           # Schema Prisma và migrations
├── src/              # Mã nguồn
│   ├── controllers/  # Logic xử lý API
│   ├── middleware/   # Middleware xác thực
│   ├── routes/       # Định nghĩa các route API
│   ├── services/     # Tương tác với cơ sở dữ liệu
│   └── index.js      # Điểm khởi chạy server
├── uploads/          # Thư mục lưu trữ ảnh tải lên
├── .env              # Biến môi trường
└── package.json      # Metadata và dependencies của project
```
