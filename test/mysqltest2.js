const util = require('util'),
      Promise = require('bluebird');

const Pool = require('../pool');
const pool = new Pool();

const sql1 = 'update Emp set salary="300" where id = 3';
const sql2 = 'update Emp set salary="400" where id = 3';


function execute(fn) {
    Promise.using(pool.connect(), conn => {
        conn.beginTransaction( txerr => {
            fn(conn);
        });
    });
}

execute( conn => {
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)

    ]).then( r => {
        for (let i = 0; i < r.length; i++)
          util.log(`sql${i+1}=`, r[i].affectedRows);
        conn.commit();
        pool.end();

    }).catch(err => {
        util.log('ERR >>>>>>>>>>>>', err);
        conn.rollback();
        pool.end();
    });
});

// 트랜잭션 보장됨
// Promise.using(pool.connect(), conn => {
//     conn.beginTransaction( txerr => {
//         Promise.all([
//             conn.queryAsync(sql1),
//             conn.queryAsync(sql2)
    
//         ]).then( r => {
//             util.log('End of Then!!!!!!');
//             util.log('sql1 = ', r[0].affectedRows);
//             util.log('sql1 = ', r[1].affectedRows);
//             conn.commit();
//             pool.end();
            
//         }).catch(err => {
//             util.log('ERR >>>>>>>>>>>>', err);
//             conn.rollback();
//             pool.end();
//         });
//     });
//     // pool.end();
// });

// 트랜잭션 보장 안됨
// Promise.using(pool.connect(), conn => {
//     Promise.all([

//         conn.queryAsync(sql1),
//         conn.queryAsync(sql2)

//     ]).then( r => {
//         util.log('End of Then!!!!!!');
//         util.log('sql1 = ', r[0].affectedRows);
//         util.log('sql1 = ', r[1].affectedRows);
        
//     }).catch(err => {
//         util.log('ERR >>>>>>>>>>>>', err);
//         // pool.end();
//     });
    
//     pool.end();
// });

// then catch 사용법
// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1)
//         .then(console.log)
//         .catch(err => {
//             util.log('ERR >>>>>>>>>>>>', err);
//         })
//     pool.end();
// });


//쿼리 사용법
// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, (err, ret) => {
//         if (err) throw err;
//         util.log('sql1 = ', ret.affectedRows);
//     });
//     pool.end();
// });
