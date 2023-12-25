const puppeteer = require('puppeteer');
// const blobStream = require('blob-stream');
const fs = require('fs')
const path = require('path');
const { readFileSync } = require('fs');
const mustache = require('mustache');
const QRCode = require('qrcode');
const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const Branch = require('../models/branchModel');
const Fee = require('../models/feeModel');
const Mass = require('../models/massModel');
const ReceiverFee = require('../models/receiverFeeModel');
'use strict';

const html = `

<!DOCTYPE html>
<html lang="en">
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <!-- <link rel="stylesheet" href="labelTemplate.css" /> -->
      <title>Shipping label</title>
      <style>
        /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
html {
  -webkit-text-size-adjust: 100%;
  font-size: 10px
}

body {
  margin: 0
}

main {
  display: block
}

table {
  border: 1px solid black;
  margin: 0px;
  width: 320px;
  border-collapse: collapse;
  font-size: 10px;
  /* display: flex; */
}
tr,
th,
td {
  border: 1px solid black;;
}
th {
  background-color: rgb(192, 191, 191);
}
.right{
  width: 320px;
}
.wi-300{
  width: 160px;
}
.wi-200{
  width: 160px;
}
.wi-250{
  width: 200px;
}


abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted
}

b,strong {
  font-weight: bolder
}


img {
  border-style: none
}

html {
  box-sizing: border-box;
  font-family: sans-serif
}

*,::after,::before {
  box-sizing: inherit
}

html {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
.headerr{
    width: 500px;
}

*,::after,::before {
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0
}
table {
  border-collapse: collapse
}
img{
  display: block;
  vertical-align: middle;
  max-width: 100%;
  height: auto
}
.container {
  width: 100%
}
.border-gray-500 {
  border-color: #a0aec0
}
.border-gray-600 {
  border-color: #718096
}
.border-gray-700 {
  border-color: #4a5568
}
.rounded-lg {
  border-radius: .5rem
}
.border-2 {
  border-width: 2px
}
.border {
  border-width: 1px
}
.border-b-2 {
  border-bottom-width: 2px
}
.border-t-4 {
  border-top-width: 4px
}
.border-b-4 {
  border-bottom-width: 4px
}
.border-l {
  border-left-width: 1px
}
.inline-block {
    margin: 5px;
  display: inline-block
}
.flex {
  display: flex
}
.flex-wrap {
  flex-wrap: wrap
}
.items-center {
  align-items: center
}

.flex-none {
  flex: none
}
.font-bold {
  font-weight: 700
}
.hover\:font-bold:hover {
  font-weight: 700
}
.leading-none {
  line-height: 1
}
.leading-tight {
  line-height: 1.25
}
.m-4 {
  margin: 1rem
}
.p{
    margin: 0;
}
.p-4 {
  padding: 1rem
}
.py-2 {
  padding-top: .5rem;
  padding-bottom: .5rem
}
.px-2 {
  padding-left: .5rem;
  padding-right: .5rem
}  
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem
}
.pt-1 {
  padding-top: .25rem
}
.pb-4 {
  padding-bottom: 1rem
}
.pl-4 {
  padding-left: 1rem
}
.text-center {
  text-align: center
}
.text-right {
  text-align: right
}
.text-gray-700 {
  color: #4a5568
}
.hover\:text-gray-700:hover {
  color: #4a5568
}
.text-lg {
  font-size: 1.125rem
}
.text-2xl {
  font-size: 1.5rem
}
.w-1\/2 {
  /* width:50%; */
}
.w-3\/5 {
  width: 60%
}
.w-full {
  width: 100%
}
.mx-auto {
  margin-left: auto;
  margin-right: auto
}
.sm\:w-3\/5 {
  width: 60%
}
      </style>
    </head>
    <body>
      <div class="wrapper m-4">
        <!-- wrapper for sample -->
        <div class="shipping-label border border-gray-500 rounded-lg">
          <div class="shipping-label-header">
            <div class="flex items-center px-4 border-b-2 border-gray-700">
              <div class=" headerr flex-auto flex items-center py-2">
                <img src="data:image/jpeg;base64,${readFileSync(path.resolve(__dirname, './labelLogo.jpg')).toString('base64')
  }" alt="alt text" />
                <p class="inline-block text-lg text-gray-700 leading-tight">
                  Đồng hành cùng bạn trên mọi hành trình
                </p>
              </div>
              <div
                class="flex-none text-right leading-none border-l border-gray-600 pl-4 py-2"
              >
                <strong class="text-center">Order ID</strong>
                <p class="text-2xl font-bold">{{order_code}}</p>
              </div>
            </div>
          </div>

          <div
            class="shipping-label-body border-t-4 border-b-4 border-gray-700 p-4"
          >
            <div class="flex -px-2 border-b-2 border-gray-600 pb-4">
              <div class="right">
                <strong>1. Họ tên địa chỉ người gửi:</strong>
                <p>
                  {{senderName}}<br />
                  {{senderAddress}}
                </p>
                <p class="pt-1">
                  <strong>Điện thoại:&nbsp;</strong
                  ><span>{{senderPhonenumber}}</span>
                </p>
                <p>
                  <strong>Mã khách hàng:&nbsp;</strong><span>{{senderId}}</span>
                </p>
                <p>
                  <strong>Mã bưu chính:&nbsp;</strong
                  ><span>{{senderHubId}}</span>
                </p>
              </div>
              <div class="w-1/2 px-2">
                <strong>2. Họ tên địa chỉ người nhận:</strong>
                <p>
                  {{receiverName}}<br />
                  {{receiverAddress}}
                </p>
                <p class="pt-1">
                  <strong>Điện thoại:&nbsp;</strong
                  ><span>{{receiverPhonenumber}}</span>
                </p>
                <p><strong>Mã ĐH:&nbsp;</strong><span></span></p>
                <p>
                  <strong>Mã bưu chính:&nbsp;</strong
                  ><span>{{receiverHubId}}</span>
                </p>
              </div>
            </div>

            <div class="flex -px-2 border-b-2 border-gray-600 pb-4">
              <div class="right">
                <strong>3. Loại hàng gửi:</strong>
                <p>{{orderType}}</p>
                <strong>4. Nội dung trị giá bill gửi:</strong>
                <p></p>
                <table id="order">
                  <thread>
                    <tr>
                      <th>Nội dung</th>
                      <th>Số lượng</th>
                      <th>Trị giá</th>
                      <th>Giấy tờ đính kèm</th>
                    </tr>
                  </thread>
                  <tr>
                    <td>Tổng</td>
                    <td>0</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
                <strong>5. Dịch vụ đặc biệt/ cộng thêm:</strong>
                <p>{{special_service}}</p>
                <strong
                  >6. Chỉ dẫn của người gửi khi không chuyển phát được bưu
                  gửi:</strong
                >
                <p>{{instructions}}</p>
                <strong>7. Cam kết của người gửi:</strong> 
                <a>Tôi chấp nhận các điều khoản tại mặt sau của phiến gửi và cam
                đoan bưu gửi này không chứa những hàng nguy hiểm.</a>
                
                
              </div>

              <div class="w-1/2 px-2 wi-300">
                <strong>8. Cước:</strong>
                <p class="pt-1">Cước chính:&nbsp;<span>{{charge}}</span></p>
                <p class="pt-1">Phụ phí:&nbsp;<span>{{surcharge}}</span></p>
                <p class="pt-1">
                  Tổng cước (Gồm VAT):&nbsp;<span>{{VAT}}</span>
                </p>
                <p class="pt-1">Thu khác:&nbsp;<span>{{other_fee}}</span></p>
                <p class="pt-1">
                  <strong
                    >Tổng thu:&nbsp;
                    <span>{{total_fee}}</span>
                  </strong>
                </p>
                <strong>9. Khối lượng:</strong>
                <p class="pt-1">
                  Khối lượng thực tế:&nbsp;
                  <span>{{actual}}</span>
                </p>
                <p>
                  Khối lượng quy đổi:&nbsp;
                  <span>{{converted}}</span>
                </p>

              </div>

              <div class="w-1/2 px-2 wi-300">
              <strong>10. Thu của người nhận:</strong>
                <p class="pt-1">
                  COD:&nbsp;
                  <span>{{COD}}</span>
                </p>
                <p class="pt-1">Thu khác:&nbsp;<span>{{orther_receiver_fee}}</span></p>
                <p class="pt-1">
                  <strong
                    >Tổng thu:&nbsp;
                    <span>{{total_receiver}}</span>
                  </strong>
                </p>

                <strong>11. Chú dẫn nghiệp vụ:</strong>
                <p class="pt-1">
                  <span>{{note}}</span>
                </p>
              </div>
            </div>

            <div class="flex -px-2 pb-4 flex-wrap items-center">
              <div class="w-1/2 px-2 wi-250">
                <strong>Ngày giờ gửi:</strong>
                <span>{{orderCreatedAt}} </span>
                <p class="pt-1">
                  <strong>Chữ kí người gửi:&nbsp;</strong>
                  <span> </span>
                </p>
              </div>
              <div class="w-1/2 px-2 wi-250">
                <strong>Ngày giờ nhận:</strong>
                <span>{{lastUpdatedAt}} </span>
                <p class="pt-1">
                  <strong>Chữ kí người nhận:&nbsp;</strong>
                  <span> </span>
                </p>
              </div>

              <div class="w-1/2 px-2 wi-200">
                <img src="{{qrcode}}" alt="alt text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</html>

`


const printLabel = async (req, res) => {
  // console.log("OK");
  const order_id = req.params.order_id;
  const order = await Order.findById(order_id);

  // Create a browser instance
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  //Create QR Code 
  const qrcode = await QRCode.toDataURL('localhost:3000/api/orders/' + order.order_code);
  // console.log('localhost:3000/api/orders/' + order_id);
  // console.log(qrcode);

  const sender = await Customer.findById(order.sender_id);
  const senderBranch = await Branch.findById(sender.branch_id);
  const receiver = await Customer.findById(order.receiver_id);
  const receiverBranch = await Branch.findById(receiver.branch_id);
  const fee = await Fee.findById(order.fee_id);
  const mass = await Mass.findById(order.mass_id);
  const receiverFee = await ReceiverFee.findById(order.receiver_fee_id);
  // console.log(order)

  // Website URL to export as pdf
  const filledHTML = mustache.render(html, {
    "order_code": order.order_code,
    "senderName": sender.fullname,
    "senderAddress": sender.address,
    "senderPhonenumber": sender.phoneNumber,
    "senderId": sender._id,
    "senderHubId": senderBranch.postal_code,

    "receiverName": receiver.fullname,
    "receiverAddress": receiver.address,
    "receiverPhonenumber": receiver.phoneNumber,
    // "senderId": sender._id,
    "receiverHubId": receiverBranch.postal_code,

    "orderType": order.type,
    "special_service": order.special_service,
    "instructions": order.instructions,
    "charge": fee.charge,
    "surcharge": fee.surcharge,
    "VAT": fee.vat,
    "other_fee": fee.other_fee,
    "total_fee": fee.total,

    "actual": mass.actual,
    "converted": mass.converted,

    "COD": receiverFee.cod,
    "orther_receiver_fee": receiverFee.other_fee,
    "total_receiver": receiverFee.total,

    "note": order.note,

    "orderCreatedAt": order.createdAt,
    "lastUpdatedAt": order.updatedAt,

    "qrcode": qrcode
  });

  await page.setContent(filledHTML, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    // path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Set Content-Disposition header
  res.setHeader('Content-Disposition', 'attachment;filename=magic-post-label.pdf');
  // Set content type
  res.setHeader('Content-Type', 'application/pdf');

  // Send the PDF as the response
  res.send(pdf);

  await browser.close();
}

module.exports = { printLabel }