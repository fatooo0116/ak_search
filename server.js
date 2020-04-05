const path = require('path');
const http = require('http');
const express = require('express');
const axios = require('axios');
var cors = require('cors');


const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

/*
app.post('/api/search',(req, res) => {

   let query= req.param('query');
   let option= req.param('option');
   let page= req.param('page');

   const headers = {
      'Content-Type': 'application/json',     
    }    
   if(query !=''){
      axios.post('http://23.97.66.207:6000/search',{
        query:query,
        option:option,
        page:page
      },{
         headers: headers
       }).then(function(res){
        console.log(res);
      }).catch(function (error) {
        console.log(error);
      });
    }

});
*/





app.post('/api/search',(req, res) => {

   

  // let query= req.param('query');
  // let option= req.param('option');
  // let page= req.param('page');

      const headers = {
         'Content-Type': 'application/json',     
      }    
    
      console.log('launch request');

     
      axios.post('http://23.97.66.207:6000/search',{
        query:"賠償",
        option:"text",
        page:0
      },{
         headers: headers
       }).then(function(resx){
        console.log(resx);
       // res.send(res);

        res.send(resx.data);
        
      }).catch(function (error) {
         console.log(error);
      });
      

      //return 'OK';
});





app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});




const httpServer = http.createServer(app);
httpServer.listen(3000);
console.log('Server started!');