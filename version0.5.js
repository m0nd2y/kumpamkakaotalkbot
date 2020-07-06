//수요일 삭제
var express = require('express');

var http = require('http');
require('date-utils');
var bodyParser = require('body-parser');
var lognum = 0;
var bobdatatoday;
var bobdatatomorrow;
var tomorrowmonthdata;

var app = express();

//학교 급식 정보 파싱
const School = require('node-school-kr')

const school = new School()

school.init(school.eduType.middle, school.region.gyeonggi, 'J100001489')

sampleAsynctoday = async function(date) {
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        bobdatatoday = beforedata[date].replace(/[0-9]/g, "");
        bobdatatoday = bobdatatoday.replace(/\./g,"");
        bobdatatoday = bobdatatoday.replace(/_/g,"");
      }
sampleAsynctomorrow = async function(date) {
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        bobdatatomorrow = beforedata[date].replace(/[0-9]/g, "");
        bobdatatomorrow = bobdatatomorrow.replace(/\./g,"");
        bobdatatomorrow = bobdatatomorrow.replace(/_/g,"");
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
  var send = {};
  var today = new Date();

  switch(msg) {
    case '오늘의 급식':
        var newdate = new Date();
        var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
        console.log('['+ time +']' + ' 오늘의 급식 \n' + ' [' + lognum + ']');
        lognum = lognum + 1;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
      //mm, dd
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
        var newdate = new Date();
        var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
        console.log('['+ time +']' + ' 내일의 급식\n' + ' [' + lognum + ']');
        lognum = lognum + 1;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        num = dd+1;
      //mm, num
      sampleAsynctomorrow(num);
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
        var newdate = new Date();
        var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
        console.log('['+ time +']' + ' 문의 & 건의\n' + ' [' + lognum + ']');
        lognum = lognum + 1;
        var dd = today.getDate();
      send = {
        'message' : {
          'text' : '카카오톡 ID : ldj6192\n' + '페이스북 페이지 : http://facebook.com/bob.kumpams\n'
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
http.createServer(app).listen(1924, function() {
  console.log('ㅅㅓ버시작');
});
