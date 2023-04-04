const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 5000;
const path = require("path");

//ejs 사용을 위해 필요
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static('views'));

//요청 데이터 분석
app.use(express.urlencoded({extended: false})); 

//암호화 복호화 모듈
const encryption = require('./views/js/encryption.js');
const decryption = require('.//views/js/decryption.js');

//암호화 복호화를 위해 필요한 구성요소
const algorithm = 'aes-256-cbc';  
const key = crypto.scryptSync('aspecialpassword','salt', 32);  
const iv = crypto.randomBytes(16);
let plaintext, cipher;


//암호화 페이지
app.get('/', (req, res) => {
    res.render('index', {});
});

app.post('/', (req, res) => {
    //post로 form에서 전송시 평문 받아오기 > name으로 받아옴
    plaintext = req.body.plaintext;   
    //암호문으로 바꾸어주는 함수 실행
    cipher = encryption.e(plaintext,crypto, algorithm, key, iv); 

    //ejs 내 value 값을 바꾸고 내보내기
    res.render('index', {
        plaintext : plaintext,
        cipher : cipher
    });
});

//복호화 페이지
app.get('/decry', (req, res) => {
    res.render('decry', {});

});

app.post('/decry', (req, res) => {
    //post로 form에서 전송시 암호문 받아오기 > name으로 받아옴
    cipher = req.body.cipher;
    //평문(복호문)으로 바꾸어주는 함수 실행
    plaintext = decryption.d(cipher,crypto, algorithm, key, iv); 

    //ejs 내 value 값을 바꾸고 내보내기
    res.render('decry', {
        cipher : cipher,
        plaintext : plaintext
    });
});

app.listen(port, () => {
    console.log('5000 port에서 서버 실행 중...');
});