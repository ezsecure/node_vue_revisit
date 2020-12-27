const express = require('express'),
      app = express(),
      util = require('util');

      
const Pool = require('./pool'),
      Mydb = require('./mydb');

const testJson = require('./test/test.json');
const pool = new Pool();

app.use(express.static('public'));
// EJS부분
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// app.get('/', (req, res) => {
//   // res.send("Hello NodeJS!!");
//   res.render('index', {name: '홍길동'});
// });

// app.get('/test/:email', (req, res) => {
//     testJson.email = req.params.email;  // cf. req.body, req.query
//     testJson.aa = req.query.aa;
//     res.json(testJson);
// });

// app.get('/dbtest/:user', (req, res) => {
//     let user = req.params.user;
//     let mydb = new Mydb(pool);
//     mydb.execute( conn => {
//         conn.query('select * from Emp where id =?', [user], (err, ret) => {
//             res.json(ret);
//         });
//     });
// })

const webserver = app.listen(7000, function(){
    console.log("Express's started on port 7000");
});

// const io = require('socket.io')(webserver, {
//     log: false,
//     origins: '*:*',
//     pingInterval: 3000,
//     pingTimeout: 5000
// });
  
const io = require('socket.io')(webserver);
  

io.sockets.on('connect', (socket, opt) => {
    socket.emit('message', {msg: 'Welcome ' + socket.id});
    socket.on('message', (data, fn) => {
        // util.log("message >>", data.msg, Object.keys(socket.rooms));
        util.log("message >>", data.msg, Object.values(socket.rooms));
        fn(data.msg);
    });
    // util.log("connection >>> ", socket.io, socket.handshake.query);

    socket.on('join', function(roomId, fn) {
        util.log("Join1", roomId, socket.rooms);

        socket.join(roomId, function() {
            util.log("Join", roomId, Object.values(socket.rooms));
            if (fn) fn();
        });
    });

    socket.on('leave', function(roomId, fn) {
        util.log("leave >>", roomId, socket.id);
        socket.leave(roomId, function() {
            if (fn) fn();
        });
    });

    // socket.on('rooms', function(fn) {
    //     if (fn)
    //         fn(Object.keys(socket.rooms));
    // }); 

    socket.on('disconnecting', (data) => {
        util.log("disconnecting >>", socket.id, Object.keys(socket.rooms));
    });
 
    // socket.on('disconnect', (data) => {
    //     util.log("disconnect >>", socket.id, Object.keys(socket.rooms));
    // });

});
  