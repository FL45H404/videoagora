//var fs = require('fs');
//var https = require('https');
var http = require('http');
var express = require('express');
var path=require('path');
var cors=require('cors');
var {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

var port = process.env.PORT || 3081;

// Fill the appID and appCertificate key given by Agora.io
var appID = "879dc4d9c6784e0c976a16fdf20e3b4a";
var appCertificate = "559995af2ae54734802343c0bb13e628";

// token expire time, hardcode to 3600 seconds = 1 hour
var expirationTimeInSeconds = 3600
var role = RtcRole.PUBLISHER

var app = express();
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(cors())
// app.disable('x-powered-by');
// app.set('port', PORT);
// app.use(express.favicon());
// app.use(app.router);

// var generateRtcToken = function(req, resp) {
//     var currentTimestamp = Math.floor(Date.now() / 1000)
//     var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
//     var channel = req.query.channel;
//     var uid=Math.floor((Math.random()*1000)+1);
//     var key = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);

//     resp.header("Access-Control-Allow-Origin", "*")
//         //resp.header("Access-Control-Allow-Origin", "http://ip:port")
//     // return resp.json({ 'key': key }).send();
//     console.log(key)
//     return resp.send({uid,key});
// };

// var generateRtmToken = function(req, resp) {
//     var currentTimestamp = Math.floor(Date.now() / 1000)
//     var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
//     // var account = req.query.account;
//     var account = "ravi";
//     if (!account) {
//         return resp.status(400).json({ 'error': 'account is required' }).send();
//     }

//     var key = RtmTokenBuilder.buildToken(appID, appCertificate, account, RtmRole, privilegeExpiredTs);

//     resp.header("Access-Control-Allow-Origin", "*")
//     console.log(key)
//         //resp.header("Access-Control-Allow-Origin", "http://ip:port")
//     return resp.json({ 'key': key }).send();
// };
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/key.html'));
})
// app.get('/rtcToken', generateRtcToken);
app.get('/invite',(req,res)=>{
    var currentTimestamp = Math.floor(Date.now() / 1000)
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    var channel = req.query.channel;
    // var uid=Math.floor((Math.random()*1000)+1);
    var uid=0;
    var key = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);

    res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Origin", "http://ip:port")
    // return resp.json({ 'key': key }).send();
    console.log(key)
        //resp.header("Access-Control-Allow-Origin", "http://ip:port")
        // console.log(req.params.channel)
        // console.log(req.query.channel)
    // return res.json({ 'key': key }).send();
    res.render(__dirname+"/public/index",{key:key})
})
// app.get('/rtmToken', generateRtmToken);

// http.createServer(app).listen(app.get('port'), function() {
//     console.log('AgoraSignServer starts at ' + app.get('port'));
// });
app.listen(port,()=>{
    console.log(`server started at`)
});
//https.createServer(credentials, app).listen(app.get('port') + 1, function() {
//    console.log('AgoraSignServer starts at ' + (app.get('port') + 1));
//});