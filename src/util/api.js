// const url= 'http://101.132.187.244:8082/Home'
// const uploadUrl= 'http://101.132.187.244:8083/'
const url = "http://ii.ysintelligent.com"
const uploadUrl = "http://iiadmin.ysintelligent.com/"

const api = {
  url: url,
  loadImgUrl: uploadUrl,
  loginCheck: url + "/User/loginCheck",
  logOut: url + "/User/logOut",
  qrcode: url + "/User/qrcode",
  qrcodeLoop: url + "/User/qrcodeLoop",
  qrcodeLogin: url + "/User/qrcodeLogin",
  index: url + "/Index/index",
  getBanner: url + "/Index/getBanner",
  beforeReceipt: url + "/Receipt/beforeReceipt",
  receiptIndex: url + "/Receipt/index",
  getRegion: url + "/Base/getRegion",
  addAddress: url + "/Address/addAddress",
  submitReceipt: url + "/Receipt/submitReceipt",
  payfront: url + "/Receipt/payfront",
  payBeforeSubmit: url + "/Receipt/payBeforeSubmit",
  wxPay: url + "/Receipt/IswxPay",
  submitDraft: url + "/Receipt/submitDraft",
  orderIndex: url + "/ReceiptOrder/index",
  schedule: url + "/ReceiptOrder/schedule",
  details: url + "/ReceiptOrder/details",
  news: url + "/Index/getNews",
  upload: uploadUrl + "picture/upload"
};
export default api