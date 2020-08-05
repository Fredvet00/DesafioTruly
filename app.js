
const express = require('express');
var application = express();
var http = require('http')
var bodyParser = require('body-parser')
application.use(bodyParser.urlencoded({extended:true}));




/*-------------------------------------------------------------------------*/


var option = montaroption1() //ok
var usandoOption = pegarDados(option)//ok


function montaroption1() {
    var username = 'glpi'
    var password = 'glpi'

    var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    

    var options1 = {
        host: '192.168.99.100',
        path: '/apirest.php/initSession',
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': auth }
    };
    return options1
}

function pegarDados(options1) {

    const req = http.get(options1, function (resp) {

        let data = '';

        // pedaços dos dados recebidos
        resp.on('data', (chunk) => {
            data += chunk;
        })


        //todo dado recebido, print
        resp.on('end', function () {
            var sessToken = Buffer(data);
            const sessTokenURL = JSON.parse(sessToken);
            
            var options2 = {
                host: '192.168.99.100',
                path: '/apirest.php/ticket/?session_token=' + sessTokenURL.session_token,
                method: 'GET'
            }
            var req = http.get(options2, function (res) {
                var bodyChunks = [];
                res.on('data', function (chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function (chunk) {
                    var respostaSite = Buffer.concat(bodyChunks);
                    respSiteJson = JSON.parse(respostaSite);
                    console.log(respSiteJson[1])// resposta da api com lista de tickets e suas informações contidas.
                    
                })
            })
        })


    })


}





















