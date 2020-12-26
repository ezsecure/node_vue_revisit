const fs = require('fs');
const util = require('util');

// console.log("aaa");
// util.log("bbb", __dirname);


fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
    if (err) return util.error(err);
    util.log("data>>", data);
});
console.log("------------------------");

let data2 = fs.readFileSync(__dirname + '/test.json', 'utf-8');
util.log("data2>>", data2);

util.log("===================================");


let MsgFile = __dirname + '/message.txt';
fs.writeFileSync(MsgFile, 'Hello Node.js ttt세종대왕', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

let data3 = fs.readFileSync(MsgFile, 'utf-8');
util.log("data3>>", data3);
util.log("=-=-=-=--=-=-=-=-=-=-=-=-=");