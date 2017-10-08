/* Index.Js
   @ Node Node server
*/

/* Loading required dependencies:
 ** @express framework for node 
 ** @body-parser for json decode of headers
 ** @logger for console logging for showing params
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');
var http = require('http');

/* app uses port 5000 on localhost
   to load app in browser use
   localhost:5000
*/
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(logger('dev'));
app.set('app', __dirname + '/app');

app.get('/', function(request, response) {
    response.render('index');
});
app.get('/meteo', function(request, response) {

    console.log("Here");
    http.get('http://api.met.no/weatherapi/locationforecast/1.9/?lat=' + request.query.lat + ';lon=' + request.query.lon, function(res) {
        var str = '';
        console.log('Response is ' + res.statusCode);

        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            str += chunk;
        });

        res.on('end', function() {
            response.send(str);
        });

    });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on', app.get('port'));
});