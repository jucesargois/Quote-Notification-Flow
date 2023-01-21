var AWS = require('aws-sdk');
var ses = new AWS.SES();


var RECEIVER = 'email'
var SENDER = 'email'

var response = {
    'isBase64Encoded': false,
    'headers': {'Content-Type': 'application/json','Access-Control-Allow-Origin':'example.com'},
    'statusCode': 200,
    'body': {"result": "Success"}
};

exports.handler = function (event, context) { 
    console.log('Received event:', event);
    sendEmail(event, function(err,data){
        context.done(err,response.body);
    });
};

function sendEmail(event,done) {
    var params = {
        Destination: {
            ToAddresses:[
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Conversion type: ' + event.USDBRL.name + '\nhigh: ' + event.USDBRL.high + '\nlow: ' + event.USDBRL.low + '\nupdated_at: ' + event.USDBRL.create_date,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Informe diário cotação:' + 'Dólar americano/Real brasileiro',
                Charset: 'UTF-8'
            }

        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}

