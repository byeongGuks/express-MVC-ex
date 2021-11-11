
const util = require('util');
const crypto = require('crypto');
const pbkdf2 = util.promisify(crypto.pbkdf2);

const encryptPassword = async (password) => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = crypto.randomBytes(64) // same size as output of hash function
    const iteration = Math.floor(Math.random() * 100000) + 100000;
    const digest = await pbkdf2(password, salt, iteration, KEY_LEN, ALGO);
    return `${ALGO}:${KEY_LEN}:${salt.toString('base64')}:${iteration}:${digest.toString('base64')}`;
};

const verifyPassword = async (password, hashedPassword) => {
    const [algo, keyLenStr, encodedSalt, iterationStr, encodedDigest] = hashedPassword.split(':');
    const keyLen = parseInt(keyLenStr, 10);
    const salt = Buffer.from(encodedSalt, 'base64');
    const iteration = parseInt(iterationStr, 10);
    const hashedDigest = Buffer.from(encodedDigest, 'base64');
    const digest = await pbkdf2(password, salt, iteration, keyLen, algo);
    return Buffer.compare(digest, hashedDigest) === 0;
};

module.exports = {
    encryptPassword,
    verifyPassword
};