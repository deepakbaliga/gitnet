var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
var client = new Client();



var _response = {

};


var args = {

    headers: {
        "Authorization": "token " + process.env.GITHUB_AUTH,
        "User-Agent": "gitnetapp"
    } // request headers 
};



router.get('/', function (req, res) {

    if (req.body.username) {

        _response.success = true;

        var url = "https://api.github.com/users/" + req.body.username;


        client.get(url, args, function (data, response) {

            _response.data = data;
            console.log(_response);
            //res.end(JSON.stringify(_response));
            res.end();

        });



    } else {
        _response.success = false;
        _response.message = 'username field cannot be blank';
        res.end(JSON.stringify(_response));
    }

});



module.exports = router;