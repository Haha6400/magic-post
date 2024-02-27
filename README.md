# **✨ HỆ THỐNG QUẢN LÝ CHUYỂN PHÁT ✨**
![image](https://github.com/Haha6400/magic-post/assets/100295385/3bbcf37d-09c0-49e4-a170-8ff87bfdc695)
## Mục lục
- [Giới thiệu](https://github.com/Haha6400/magic-post?tab=readme-ov-file#gi%E1%BB%9Bi-thi%E1%BB%87u)
- [Cài đặt](https://github.com/Haha6400/magic-post?tab=readme-ov-file#c%C3%A0i-%C4%91%E1%BA%B7t)
- [Công nghệ sử dụng](https://github.com/Haha6400/magic-post?tab=readme-ov-file#c%C3%B4ng-ngh%E1%BB%87-s%E1%BB%AD-d%E1%BB%A5ng)
- [Nhóm tác giả](https://github.com/Haha6400/magic-post?tab=readme-ov-file#nh%C3%B3m-t%C3%A1c-gi%E1%BA%A3)

## Giới thiệu
#### Tổng quan
Magic Post là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết. Ngược lại, một điểm tập kết sẽ làm việc với nhiều điểm giao dịch.

Người gửi, có hàng cần gửi, đem hàng đến một điểm giao dịch (thường là gần nhất) để gửi. Hàng, sau đó, được đưa đến điểm tập kết ứng với điểm giao dịch của người gửi, rồi được chuyển đến điểm tập kết ứng với điểm giao dịch của người nhận. Tại điểm giao dịch của người nhận, nhân viên giao hàng sẽ chuyển hàng đến tận tay người nhận.
#### Tính năng
Các tác nhân trong hệ thống:
- Lãnh đạo công ty (Supervisor)
- Trưởng điểm tập kết (Warehouse Manager) - Mỗi điểm tập kết chỉ có duy nhất 1 trưởng điểm
- Nhân viên điểm tập kết (Warehouse Staff)
- Trưởng điểm giao dịch (Hub Manager) - Mỗi điểm giao dịch chỉ có duy nhất 1 trưởng điểm
- Khách hàng (Customer) - Có thể là người gửi (Sender) hoặc người nhận (Receiver)
###### Chức năng cho lãnh đạo công ty
- Quản lý hệ thống các điểm giao dịch và điểm tập kết.
- Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch
- Thống kê hàng gửi, hàng nhận trên toàn quốc, từng điểm giao dịch hoặc điểm tập kết.
###### Chức năng cho trưởng điểm tại điểm giao dịch
- Cấp tài khoản cho giao dịch viên tại điểm giao dịch.
- Thống kê hàng gửi, hàng nhận tại điểm giao dịch.
###### Chức năng cho giao dịch viên tại điểm giao dịch
- Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng.
- Tạo đơn hàng
- Cập nhật trạng thái đơn hàng
- Xác nhận đơn hàng đã về đi từ điểm khác tới
- Xác nhận đơn hàng đã chuyển (hoặc không chuyển được)
- Thống kê các đơn hàng tùy theo trạng thái
###### Chức năng cho trưởng điểm tại điểm tập kết
- Quản lý tài khoản nhân viên tại điểm tập kết.
- Thống kê hàng đi, đến.
###### Chức năng cho nhân viên tại điểm tập kết
- Xác nhận đơn hàng đã nhận từ điểm giao dịch hoặc điểm tập kết khác chuyển đến.
- Xác nhận đơn hàng đã chuyển (hoặc không chuyển được)
- Thống kê các đơn hàng tùy theo trạng thái
- Cập nhật trạng thái đơn hàng
###### Chức năng cho khách hàng
- Tra cứu trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.

## Cài đặt
### Cài đặt cơ sở dữ liệu
```sh
npm install mongoose
```
### Cài đặt giao diện
###### Cài đặt npm
```sh
npm install
```
###### Chạy server
```sh
cd .\magic-post\
npm start
```
###### Chạy giao diện
```sh
cd .\frontend\
npm run dev
```
## Công nghệ sử dụng
Những công nghệ được sử dụng trong quá trình phát triển dự án:
- Frontend: VueJS3, Bootstrap, Axios, ApexChart,...
- Backend: Javascript, Mongoose,...
- Database: MongoDB
## Nhóm tác giả
| MSSV | Họ và tên | Nhiệm vụ | Phân công công việc |
| ------ | ------ | ------ | ------ |
| 20210310 | [Nguyễn Thị Hồng Hà](https://github.com/Haha6400) | Back-end | <ul><li>Các chức năng CRUD, quản lý tài khoảng người dùng</li><li>Các chức năng thống kê đơn hàng của các chi nhánh...</li><li>Các chức năng an ninh</li><li>Thiết kế cơ sở dữ liệu</li></ul>|
| 21020392 | [Nguyễn Đức Tân](https://github.com/ductan2003) | Front-end |<ul><li>Thiết kế giao diện người dùng</li><li>Hoàn thiện tất cả các giao diện của hệ thống</li><li>Viết lại và định tuyến URL</li><li>Xử lý nhập liệu</li></ul>|
| 21020757 | [Nguyễn Đăng Dương](https://github.com/21020757) | Back-end | <ul><li>Các chức năng CRUD của đơn hàng</li><li>Các chức năng thống kê doanh thu của các chi nhánh...</li><li>Xử lý mấy cái chức năng cần hàm tính toán</li><li>Thiết kế cơ sở dữ liệu</li></ul>|

