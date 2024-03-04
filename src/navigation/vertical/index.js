import CryptoJS from "crypto-js"
    var ciphertext = localStorage.getItem('sidebar')
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'qenium 123')
    let sidebar  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(sidebar)
export default sidebar;
