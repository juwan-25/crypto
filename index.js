const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 5000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static('views'));
app.use(express.urlencoded({extended: false})); //요청 데이터 분석

const encryption = require('./views/js/encryption.js');
const decryption = require('.//views/js/decryption.js');


const algorithm = 'aes-256-cbc';  
const key = crypto.scryptSync('aspecialpassword','salt', 32);  
const iv = crypto.randomBytes(16);
let plaintext, cipher;



app.get('/', (req, res) => {
    res.render('index', {});
});

app.post('/', (req, res) => {
    plaintext = req.body.plaintext;   
    cipher = encryption.e(plaintext,crypto, algorithm, key, iv); 

    res.render('index', {
        plaintext : plaintext,
        cipher : cipher
    });
});

app.get('/decry', (req, res) => {
    res.render('decry', {});

});

app.post('/decry', (req, res) => {
    cipher = req.body.cipher;
    console.log(cipher)   
    plaintext = decryption.d(cipher,crypto, algorithm, key, iv); 

    res.render('decry', {
        cipher : cipher,
        plaintext : plaintext
    });
});

app.listen(port, () => {
    console.log('5000 port에서 서버 실행 중...');
});