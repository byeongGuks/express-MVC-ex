
require('dotenv').config(); // env 파일 지정
const path = require('path');

const server = require('./server.js');
const port = process.env.PORT || 3002;

server.listen(port, () => {
	console.log(`Listening on port ${port}!!`);
});
