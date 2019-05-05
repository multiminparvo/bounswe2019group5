function InsertTest(_classId, _type) {
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO vocab_test (class_id, type_id) values ('" + _classId +"', '" + _type + "')"
    db.query(sql, function (err, result) {
        if (err) throw err;        
        var sql2 = "SELECT LAST_INSERT_ID()"
        db.query(sql2, function (err2, result2) {
            if (err2) throw err2;  
            console.log(result2[0]['LAST_INSERT_ID()']);    
            var lastindex = result2[0]['LAST_INSERT_ID()']  
            fillVocQTable(_classId, lastindex) 
            fillVocQTable(_classId, lastindex) 
            fillVocQTable(_classId, lastindex) 
            fillVocQTable(_classId, lastindex) 
            fillVocQTable(_classId, lastindex) 
            console.log(lastindex);
            console.log("row inserted to table");
           })
    });    
}
function fillVocQTable(_classId, test_id) {
    var db = require('./connectToDatabase.js')
    var sql = "SELECT image, word FROM word WHERE class = '"+ _classId + "' ORDER BY RAND() LIMIT 4"
    var truePos;
    var trueWord;
    var _result;
    db.query(sql, function (err, result) {
        if (err) throw err;
        truePos = Math.floor(Math.random()*result.length);
        trueWord = result[truePos]['word']
        console.log("fillVoc çalıştı");
        _result = result;
    });  
    insertToQTable(_result, trueWord, truePos, test_id);
}

function insertToQTable(_result,trueWord, truePos, _test_id) {
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO vocab_question (test_id, img1, img2, img3, img4, word, answer) values ('"+_test_id+"', '"+ _result[0]['image'] + "', '" + _result[1]['image'] + "' ,'" + _result[2]['image'] + "', '" + _result[3]['image']+ "', '" + trueWord+ "', '" + truePos +"')  "
    db.query(sql, function (err, result) {
        if (err) throw err;
        truePos = Math.floor(Math.random()*_result.length) ;
        console.log(_result[truePos]['word']);
        console.log("insertQtable çalıştı");
        db.end();
    });
}
InsertTest('meyve', 'aman');