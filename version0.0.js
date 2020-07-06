//초기 기능
var express = require('express');

var http = require('http');

var bodyParser = require('body-parser');

var as = require('async');
var bobdatatoday;
var bobdatatomorrow;

var app = express();

var today = new Date();

//공백 판단
var blank_pattern = /^\s+|\s+$/g;


//학교 급식 정보 파싱
const School = require('node-school-kr')

const school = new School()

school.init(school.eduType.middle, school.region.gyeonggi, 'J100001489')

sampleAsynctoday = async function(date) {
        console.log('\n\n[+]정상출력..\n\n')
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        console.log(beforedata[date]);
        bobdatatoday = beforedata[date].replace(/[0-9]/g, "");
        bobdatatoday = bobdatatoday.replace(/\./g,"");
      }
sampleAsynctomorrow = async function(date) {
        console.log('\n\n[+]정상출력..\n\n')
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        console.log(beforedata[date]);
        bobdatatomorrow = beforedata[date].replace(/[0-9]/g, "");
        bobdatatomorrow = bobdatatomorrow.replace(/\./g,"");
      }

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/keyboard', function(req, res) {
  var data = {
    'type' : 'buttons',
    'buttons':['오늘의 급식', '내일의 급식', '문의 & 건의']
  };

  res.json(data);
});

app.post('/message',function(req,res) {
  var msg = req.body.content;
  console.log('전달받은 메시지: ' + msg);

  var send = {};
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  switch(msg) {
    case '오늘의 급식':
      sampleAsynctoday(dd);
      send = {
          'message' : {
          'text' : mm + "월" + dd + "일 의 급식입니다.\n" + bobdatatoday
        },
        keyboard: {
          'type': 'buttons',
          'buttons': ['오늘의 급식', '내일의 급식', '문의 & 건의']
        }
      }
      break;

    case '내일의 급식':
      num = dd+1;
      sampleAsynctomorrow(num)
      send = {
        'message' : {
          'text' : mm + "월" + num + "일 의 급식입니다.\n" + bobdatatomorrow
        },
        keyboard: {
          'type': 'buttons',
          'buttons': ['오늘의 급식', '내일의 급식', '문의 & 건의']
        }
      }
      break;
    case '문의 & 건의':
      send = {
        'message' : {
          'text' : '카카오톡 ID : ldj6192\n' + '페이스북 : http://facebook.com/bob.kumpams\n'
        },
        keyboard: {
          'type': 'buttons',
          'buttons': ['오늘의 급식', '내일의 급식', '문의 & 건의']
        }
      }
        break;

    default:
      send = {
        'message': {
          'text':'알 수 없는 명령입니다!'
        },
        keyboard: {
          'type':'buttons',
          'buttons':['오늘의 급식', '내일의 급식', '문의 & 건의']
        }
      }
      break;
  }

  res.json(send);
});
http.createServer(app).listen(1985, function() {
  console.log('ㅅㅓ버시작');
});