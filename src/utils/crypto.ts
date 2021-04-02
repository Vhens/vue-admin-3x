import * as CryptoJS from 'crypto-js';

//秘钥
const secretKey: string = 'adffsasdfsdfsadf'; // 字符串要多点，不然aes解密拿不到值
const iv: string = '1234567812345678';
/**
 * Aes 加密
 * @param cipherText
 * @returns
 */
export const encryptByAes = (cipherText: string) => {
  let options = {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  let encryptedData = CryptoJS.AES.encrypt(cipherText, CryptoJS.enc.Utf8.parse(secretKey), options);
  return encryptedData.toString();
};
/**
 * Aes 解密
 * @param cipherText
 * @returns
 */
export const decodeByAes = (cipherText: string) => {
  let options = {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };
  // 解密
  let decryptedData = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(secretKey), options);
  // 解密后，需要按照Utf8的方式将明文转位字符串
  return decryptedData.toString(CryptoJS.enc.Utf8);
};
/**
 * Base64加密
 * @param value
 * @returns
 */
export const encryptByBase64 = (cipherText: string) => {
  let wordArray = CryptoJS.enc.Utf8.parse(cipherText);
  return CryptoJS.enc.Base64.stringify(wordArray);
};
/**
 *  Base64解密
 * @param value
 * @returns
 */
export const decodeByBase64 = (cipherText: string) => {
  let parsedWordArray = CryptoJS.enc.Base64.parse(cipherText);
  return parsedWordArray.toString(CryptoJS.enc.Utf8);
};
/**
 *  MD5加密
 * @param value
 * @returns
 */
export const encryptByMd5 = (value: string) => {
  console.log(CryptoJS);
  return CryptoJS.MD5(value).toString();
};
