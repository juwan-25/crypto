const crypto = require('crypto');
const encryption = require('./encryption.js');
const decryption = require('./decryption.js');

let plain_text = 'Hello World!'; 
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(plain_text,'salt', 32); 
//key값이 무조건 32글자 
const iv = crypto.randomBytes(16); 

let cipher_alphabet = encryption.e(plain_text, crypto, algorithm, key, iv);
console.log('암호화: ',cipher_alphabet);

// 복호화
let plain_text2 = decryption.d(cipher_alphabet, crypto, algorithm, key, iv);
console.log('복호화: ',plain_text2);
