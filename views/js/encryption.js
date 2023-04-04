//암호화
exports.e = function(plain_text,crypto, algorithm, key, iv){
    const cipher = crypto.createCipheriv(algorithm, key, iv); 
    // 암호화 객체 생성
    let result = cipher.update(plain_text, 'utf8', 'base64');
    // 암호화할 문장을 넣음, utf8 - 입력값 인코딩, base64 - 출력값 인코딩
    result += cipher.final('base64');
    // final 필수 > 없으면 복호화 불가능

    return result;
}