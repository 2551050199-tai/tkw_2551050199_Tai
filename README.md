# tkw_2551050199_Tai
# WEBSITE QUẢN LÝ SƠN

# Sản phẩm gì?
* **Tên sản phẩm:** Phần mềm Quản lý Sơn
Dưới đây là phần tổng quan dự án website phần mềm quản lý dành riêng cho các đại lý kinh doanh sơn, đồng thời áp dụng chính xác các quy chuẩn thiết kế (Design System):

### Đối tượng hướng đến:
Đại lý kinh doanh sơn.

### Giá trị mang lại:
* Giúp đại lý quản lý vỏ thùng & hàng khuyến mãi.
* Quản lý sơn Base & Tinh màu.
* Kiểm soát lô và hạn sử dụng.

* **Figma Template:** [Link Figma Landwind - Tailwind CSS Landing Page]
* **Công nghệ sử dụng:** HTML5 (Semantic HTML), Tailwind CSS (v4), JavaScript (ES6), Git/GitHub.

---
## 1. Design System (Quy chuẩn Thiết kế)

### Bảng màu (Color Palette)
#### Màu thương hiệu chính
--color-brand-600: #2563eb;

#### Màu nhấn
--color-accent-500: #f59e0b;

#### Chữ chính
--color-ink: #1f2937;

#### Chữ phụ
--color-muted: #6b7280;

#### Nền trang
--color-surface: #f9fafb;

#### Viền
--color-line: #e5e7eb;

### 2. Font chữ & Cỡ chữ (Typography)

* **Font tiêu đề:** `'Inter', sans-serif`
* **Font nội dung:** `'Roboto', sans-serif`

#### Kích thước Heading
* `h1`: `48px`
* `h2`: `30px`
* `h3`: `20px`

---

### 📐 3. Bo góc (Border Radius) & Spacing

#### Bảng Quy Đổi Tailwind CSS
| Figma / Kích thước | Tailwind CSS Class | Ứng dụng |
| :--- | :--- | :--- |
| `8px` | `rounded-card` (`rounded-lg`) | Bo góc thẻ |
| `96px` | `py-24` | Padding dọc section |

---
Các breakpoint
sm: sử dụng cho giao diện nhỏ di động.
md: sử dụng cho máy tính bảng / tablet.
lg: màn hình máy tính xách tay / laptop.
xl: màn hình máy tính lớn.
2xl: dùng cho máy tính cỡ lớn (1280px trở lên).

---

## 🛠️ 5. Quy trình Git & Workflow

1. **Không push trực tiếp vào `main`.**
2. Lấy code mới nhất trước khi thực hiện task:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/ten-tinh-nang


## 6. Checklist Buổi 2
- [] Đủ 10 section có bố cục, khớp Figma ở màn hình từ 1280px
- [] Không dùng `absolute` để xếp bố cục chính (chỉ cho badge)
- [] Không có giá trị spacing tùy ý ngoài scale
- [] Khoảng cách dùng `gap`, không dùng `margin` trên từng phần tử con
- [] Ba thẻ bảng giá cao bằng nhau, ba nút thẳng hàng
- [] Cảm nhận giữ `<figure>` / `<blockquote>` / `<cite>`; số liệu giữ `<dl>`
- [] Mọi SVG trang trí có `aria-hidden="true"`
- [] Ít nhất 4 commit, có tag `buoi-2`