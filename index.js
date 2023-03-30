const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res)=>{
    try{
        console.log("URL : ",req.url);
        let fileSet = req.url;

        if(req.url == '/favicon.ico'){
            //현재는 사용하지 않아서 favicon이 나온다면 오류 발생
            return res.writeHead(404);
        } else if(req.url == '/') {
            //fileSet 아무 입력이 없다면? 기본으로 index.html 호출
            fileSet = "index";
        }
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});

        console.log("fileSet : ",fileSet, "__dirname", __dirname);
        console.log("경로 : ", path.join(__dirname,"/public/",fileSet));

        //원하는 파일을 열 수 있도록 함
        const data = await fs.readFile(path.join(__dirname,"/public/",fileSet)); // 절대경로
        //const data = await fs.readFile(`./html/${fileSet}.html`); //상대경로
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(err.message);
    }
});

server.listen(5000);

server.on('listening', ()=>{
    console.log("5000 포트에서 서버 대기중...");
});

server.on('error', (error)=>{
    console.error(error);
});