const path = require('path');
const http = require('http');
const express = require('express');
const axios = require('axios');
var cors = require('cors');

var bodyParser = require('body-parser')


const app = express();
app.use(cors());


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'build')));






app.post('/api/search',(req, res) => {

   

  // let query= req.param('query');
  // let option= req.param('option');
  // let page= req.param('page');

      const headers = {
         'Content-Type': 'application/json',     
      }    
    
      console.log('launch request');


      var query = (req.body.query)? req.body.query: '賠償';
      var option = (req.body.option)? req.body.option : 'text';
      var paged = (req.body.paged)? req.body.paged : 0;
     
      axios.post('http://23.97.66.207:6000/search',{
        query: query,
        option: option,
        page: paged
      },{
         headers: headers
       }).then(function(resx){
       // console.log(resx);
       // res.send(res);

        res.send(resx.data);
        
      }).catch(function (error) {
         console.log(error);
      });
      

      //return 'OK';
});

/*  SSR  */
app.post('/api/getPageById',(req, res) => {

    
    var key = req.body.key;

    const headers = {
        'Content-Type': 'application/json',     
    }    

    console.log('launch request2');
    axios.post('http://23.97.66.207:6000/connect_page ',{
      "_id":  key,
    },{
        headers: headers
      }).then(function(resx){
      
      // res.send(res);

      res.send(resx.data);
      
    }).catch(function (error) {
        console.log(error);
    });
});








app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.get('/search', (req, res) => {
  // res.sendFile(path.join(__dirname + '/build/index.html'));
});






const httpServer = http.createServer(app);
httpServer.listen(3000);
console.log('Server started!');