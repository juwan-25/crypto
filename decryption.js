//복호화
exports.d = function(cipher_alphabet, crypto, algorithm, key, iv){
    const deciper = crypto.createDecipheriv(algorithm, key, iv);
    let result = deciper.update(cipher_alphabet, 'base64', 'utf8');
    result += deciper.final('utf8');

    return result;
}