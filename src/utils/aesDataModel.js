const CryptoJS = require('./crypto-js')

const keys = CryptoJS.enc.Utf8.parse('56812546#&djhss8')
//-
export function DecryptData(word) {
  let decrypt = CryptoJS.AES.decrypt(word, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let str = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  return JSON.parse(str)
}
//+
export function getSm2Encrypt(paras) {
  let words = JSON.stringify(paras)
  let srcs = CryptoJS.enc.Utf8.parse(words)
  let encrypted = CryptoJS.AES.encrypt(srcs, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
