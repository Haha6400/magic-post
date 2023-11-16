//TODO: Thống kê hàng đi, đến của từng warehouse và tất cả warehouse trên cả nước

/*
@desc Functions for warehouse management.
Includes: Thống kê tất cả mặt hàng (bao gồm đã và đang có tại branch):
2 loại hàng:
- Hàng đang có mặt tại warehouse (Orders are available at warehouse)
- Hàng đã hoặc đang có mặt tại warehouse (All orders)

Hàng nhận được từ nơi khác tới:
- Nhận được từ warehouse khác, gửi tới hub dưới
Hàng gửi tới nơi khác:
- Nhận được từ hub dưới, gửi tới warehouse khác

=> Tìm kiếm theo id của 1 "warehouse khác" được gửi trong yêu cầu và tất cả "warehouse khác"
=> Input có start và end date
=> Chia ra với currentAccount là warehouseManager, supervisor

=> Tổng là: 2x2x2x2 = 16 link hehe
*/