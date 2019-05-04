//insertToQTable fonksiyonu console.logundan sonra errror veriyor
//Error: Cannot enqueue Query after invoking quit.
function InsertTest(_classId, _type) {
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO vocab_test (class_id, type_id) values ('" + _classId +"', '" + _type + "')"
    db.query(sql, function (err, result) {
        if (err) throw err;        
        console.log("row inserted to table");
        sql = "SELECT LAST_INSERT_ID()"
        db.query(sql, function (err2, result2) {
            if (err2) throw err2;        
            fillVocQTable(_classId, result2) //şu an sadece 1 soru ekliyor
            console.log(result2);
            console.log("row inserted to table");
            db.end();
           })
    });    
}

function fillVocQTable(_classId, test_id) {
    var db = require('./connectToDatabase.js')
    var sql = "SELECT image, word FROM word WHERE class = '"+ _classId + "' ORDER BY RAND() LIMIT 4"
    db.query(sql, function (err, result) {
        if (err) throw err;
        truePos = Math.floor(Math.random()*result.length);
        console.log(result[truePos]['word']);
        var trueWord = result[truePos]['word']
        console.log("images-words found");
        db.end();
        insertToQTable(result, trueWord, truePos, test_id);
    });  
}

function insertToQTable(_result,trueWord, truePos, _test_id) {
    var db = require('./connectToDatabase.js')
    var sql = "INSERT INTO vocab_question (test_id, img1, img2, img3, img4, word, answer) values ('"+_test_id+"', '"+ _result[0]['image'] + "', '" + _result[1]['image'] + "' ,'" + _result[2]['image'] + "', '" + _result[3]['image']+ "', '" + trueWord+ "', '" + truePos +"')  "
    db.query(sql, function (err, result) {
        if (err) throw err;
        truePos = Math.floor(Math.random()*result.length) ;
        console.log(result[truePos]['word']);
        var trueWord = result[truePos]['word']
        console.log("images-words found");
        db.end();
    });
}