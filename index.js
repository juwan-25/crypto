const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 5000;
app.use(express.static('public'));
app.use(express.urlencoded({extended: false})); //요청 데이터 분석

app.set('view engine','ejs');
app.set('views','./views');

const encryption = require('./public/js/encryption.js');
const decryption = require('.//public/js/decryption.js');


const algorithm = 'aes-256-cbc';  
const iv = crypto.randomBytes(16);
let plaintext, cipher, key;



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/', (req, res) => {
    plaintext = req.body.plaintext;

    res.send(plaintext);

});

app.get('/decry', (req, res) => {
    res.sendFile(__dirname + "/public/decry.html");

});

app.listen(port, () => {
    console.log('5000 port에서 서버 실행 중...');
});