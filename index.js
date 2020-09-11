
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const router = express.Router();
const app = express();
const voiceit2 = require('voiceit2-nodejs');

const key = 'key_52c54af98d4045d88be7633d5868678f';
const token = 'tok_58e98ffa273a4a1aac7713978f78485a';

let myVoiceIt = new voiceit2(key, token);

const joeId = 'usr_4dfa94285c3e41289b69c22f82f0cfe1';
const ranjanId = 'usr_a1932679ebc646c8acb9a71549f49e00';

const joeUserToken = 'utk_cb0bb697c56c4c8a92892468580dab5b_1600295741370';
const ranjanUserToken = 'utk_ff2541f14dd14129bc4a7d799d0e3972_1600295787607';

app.use(fileUpload());
//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/health', function(req, res) {
  res.send('health OK !!');
});

app.post("/auth", (req, res) => {
    console.log('req', req.body);
    console.log('file?', req.body.file);
    res.send('hello there recieved!');
});

app.post('/upload', function(req, res) {

    console.log('REQUEST!!!!!', req.files.file.name);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      
    
      res.send(`File uploaded! ${req.files.file.name}`);
  });

app.listen(4000, () => {
    console.log('listening on port 4000');
})

app.post("/create-joe", function(req, res) {
    myVoiceIt.createUserToken({
        userId : joeId,
        secondsToTimeout: 500000,
      },(jsonResponse)=>{
        console.log('jsonResponse', jsonResponse)
      });
})

app.post("/create-ranjan", function(req, res) {
    myVoiceIt.createUserToken({
        userId : ranjanId,
        secondsToTimeout: 500000,
      },(jsonResponse)=>{
        console.log('jsonResponse', jsonResponse)
      });
})


myVoiceIt.createVoiceEnrollment({
    userId : "<userId>",
    contentLanguage : "<contentLanguage>",
    phrase : "<phrase>",
    audioFilePath : "<recording>"
  },(jsonResponse)=>{
    //handle response
  });

  app.post("/register-joe", function(req, res) {
    myVoiceIt.createVoiceEnrollment({
        userId : joeId,
        contentLanguage : "<contentLanguage>",
        phrase : "<phrase>",
        audioFilePath : "<recording>"
      },(jsonResponse)=>{
        //handle response
      });
})

app.post("/register-ranjan", function(req, res) {
    myVoiceIt.createVoiceEnrollment({
        userId : ranjanId,
        contentLanguage : "<contentLanguage>",
        phrase : "<phrase>",
        audioFilePath : "<recording>"
      },(jsonResponse)=>{
        //handle response
      });
})