var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/get', (req, res) => {
    
    var se = req.body.se;
    var rate = req.body.rate;
    console.log(rate);
    try {
           if ( (isNaN(rate) == false) && se ) {
        se = (se =='1') ? 'احيائي' : (se == '2') ? 'تطبيقي' : (se == '3') ? 'ادبي' : '*';
        rate = +rate;
        if (rate >= 350)
            var fl = {t:rate, se:se};
        else
            fl = {r:rate, se:se}
        console.log(fl);
        
        search(fl, function(Res) {
            res.end(JSON.stringify(Res));
        });
}
    else {
        console.log(req.body);
        res.end("{}");
}
    }
    
    catch(e) {
        console.log(e);
    }
 
});

function search(qs, call) {
    var fs = require("fs");
    fs.readFile('./2019.json', onread);


function onread(err, ob) {
    if (err) 
        return console.log(err);
    var res = [];
    ob = JSON.parse(ob);
    for (var ii=0; ii<ob.length; ii++) {
        var s = ob[ii];
        var chk;
        if (qs.t !== undefined)
            chk = s.total <= qs.t;
        else
            chk = s.rate <= qs.r;
        if (qs.se != "*")
            chk = chk && s.sect == qs.se;
        if (chk) res.push(s);
    }
    
    call(res);
}
}

module.exports = router;
