//index.js
const crypto = require('crypto');

// 암호화
const algorithm = 'aes-256-cbc';
let password = 'Hello World!'; // 암호화 할 문구
const key = crypto.scryptSync(password,'salt', 32); 
// scryptSync - password, salt, byte(키 길이 제한) 순으로 대입
const iv = crypto.randomBytes(16); 
// 초기화 벡터 iv - 더 강력한 암호화를 위해 사용하며, 예측 불가능한 값 > 랜덤값 주는게 좋음

const cipher = crypto.createCipheriv(algorithm, key, iv); 
// 암호화 객체 생성
let result = cipher.update(password, 'utf8', 'base64');
// 암호화할 문장을 넣음, utf8 - 입력값 인코딩, base64 - 출력값 인코딩
result += cipher.final('base64');
// final 필수 > 없으면 복호화 불가능
console.log('암호화: ',result);

// 복호화
const deciper = crypto.createDecipheriv(algorithm, key, iv);
// 복호화 객체 생성
let result2 = deciper.update(result, 'base64', 'utf8');
result2 += deciper.final('utf8');
console.log('복호화: ',result2);
