var http = require('http');
var fs = require('fs');
var pdf_table_extractor = require("pdf-table-extractor");
var url = require('url');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "samer",
  password: "ssss",
  database: "limit"
});

  con.connect(function(err) {
     if (err) throw err;
      console.log('connected!');
  });


//create a server object:
http.createServer(function (req, res) {
    if (req.url == '/get')
        {
            var se = 'ادبي';
            var rate = 60;
            con.query("SELECT * FROM `2019` WHERE rate <= "+ rate +" && section = '"+ se +"'",(err,Res) => {
                if (err) throw err;
               var url_parts = url.parse(req.url, true);
               var query = url_parts.query;
                console.log(query.id);
                console.log(req);
                res.end(JSON.stringify(Res));
            });
            return;
        }
    fs.readFile('./index.html','UTF-8',(err,data) => {
        res.end(data);
    });
   
}).listen(8000);


//pdf_table_extractor("2019.pdf",success,error);
function rev(text) {
    return text.split("")
    .reverse()
    .join("");
}

 function success(result)
{
   
  
          var p = result.pageTables;
    
    p.map((key,index) => {
        var ob = key.tables;
        for (var i=1; i<ob.length; i++)
            {
                
                    var s = ob[i][6];
                var kull = rev(ob[i][5]);
                var limit = ob[i][4];
                var rate = ob[i][3];
                var section = rev(ob[i][1]);
                Into(s,kull,limit,rate,section);
                
                
            }
        
    } );
        
    
 
    
   
}
 
function error(err)
{
   console.error('Error: ' + err);
}


  function Into(s,kull,limit,rate,section) {
      console.log(s);
     var sql = "INSERT INTO `2019` (`s`, `kull`, `lm`, `rate`, `section`) VALUES ('"+s+"','"+kull+"', '"+limit+"','"+rate+"','"+section+"')";
     con.query(sql, function (err, result) {
     if (err) throw err;
     console.log(s+" record inserted");
       
    });
        
   
        
  
  
    
    
    
    
    
    
    
    
    
    
    
    
    
}