//_ 필터링 적용
var express = require('express');

var http = require('http');

var bodyParser = require('body-parser');

var as = require('async');
var bobdatatoday;
var bobdatatomorrow;
var weddaydate;
var wedmonthdata;
var tomorrowmonthdata;
var bobdatawedness;

var app = express();

function finddaytomorrow(monthdata, daydate) {
  tomorrowmonthdata=monthdata;
  switch(monthdata) {
    case 1 :
      if(daydate >= 32) {
        tomorrowmonthdata = 2;
        num = 1;
      }
      break;
    case 2 :
    if(daydate >= 29) {
      tomorrowmonthdata = 3;
      num = 1;
    }
      break;
    case 3 :
    if(daydate >= 32) {
      tomorrowmonthdata = 4;
      num = 1;
    }
      break;
    case 4 :
    if(daydate >= 31) {
      tomorrowmonthdata = 5;
      num = 1;
    }
      break;

    case 5 :
    if(daydate >= 32) {
      tomorrowmonthdata = 6;
      num = 1;
    }
      break;

    case 6 :
    if(daydate >= 31) {
      tomorrowmonthdata = 7;
      num = 1;
    }
      break;

    case 7 :
    if(daydate >= 32) {
      tomorrowmonthdata = 8;
      num = 1;
    }
      break;

    case 8:
    if(daydate >= 32) {
      tomorrowmonthdata = 9;
      num = 1;
    }
      break;

    case 9 :
    if(daydate >= 31) {
      tomorrowmonthdata = 10;
      num = 1;
    }
      break;

    case 10 :
    if(daydate >= 32) {
      tomorrowmonthdata = 11;
      num = 1;
    }
      break;

    case 11 :
    if(daydate >= 31) {
      tomorrowmonthdata = 12;
      num = 1;
    }
      break;

    case 12 :
    if(daydate >= 32) {
      tomorrowmonthdata = 1;
      num = 1;
    }
      break;

    default :
      tomorrowmonthdata=monthdata;
      console.log('XXXXXXXXXXXXX');
      break;
  }

}

function finddaywedness(monthdata, daydate) {
  wedmonthdata = monthdata;
  switch(monthdata) {
    case 1 :
      if(daydate >= 32) {
        wedmonthdata = 2;
        day = day - 31;
      }
      break;
    case 2 :
    if(daydate >= 29) {
      wedmonthdata = 3;
      day = day-28;
    }
      break;
    case 3 :
    if(daydate >= 32) {
      wedmonthdata = 4;
      day = day-31;
    }
      break;
    case 4 :
    if(daydate >= 31) {
      wedmonthdata = 5;
      day = day-30;
    }
      break;

    case 5 :
    if(daydate >= 32) {
      wedmonthdata = 6;
      day = day-31;
    }
      break;

    case 6 :
    if(daydate >= 31) {
      wedmonthdata = 7;
      day = day-30;
    }
      break;

    case 7 :
    if(daydate >= 32) {
      wedmonthdata = 8;
      day = day-31;
    }
      break;

    case 8:
    if(daydate >= 32) {
      wedmonthdata = 9;
      day = day-31;
    }
      break;

    case 9 :
    if(daydate >= 31) {
      wedmonthdata = 10;
      day = day-30;
    }
      break;

    case 10 :
    if(daydate >= 32) {
      wedmonthdata = 11;
      day = day-31;
    }
      break;

    case 11 :
    if(daydate >= 31) {
      wedmonthdata = 12;
      day = day-30;
    }
      break;

    case 12 :
    if(daydate >= 32) {
      wedmonthdata = 1;
      day = day-31;
    }
      break;

    default :
      wedmonthdata = monthdata;
      console.log('XXXXXXXXXXXXX');
      break;
  }

}


var today = new Date();

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
        bobdatatoday = bobdatatoday.replace(/_/g,"");
      }
sampleAsynctomorrow = async function(date) {
        console.log('\n\n[+]정상출력..\n\n')
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        console.log(beforedata[date]);
        bobdatatomorrow = beforedata[date].replace(/[0-9]/g, "");
        bobdatatomorrow = bobdatatomorrow.replace(/\./g,"");
        bobdatatomorrow = bobdatatomorrow.replace(/_/g,"");
      }
sampleAsyncwedness = async function(date) {
        console.log('\n\n[+]정상출력..\n\n')
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        console.log(beforedata[date]);
        bobdatawedness = beforedata[date].replace(/[0-9]/g, "");
        bobdatawedness = bobdatawedness.replace(/\./g,"");
        bobdatawedness = bobdatawedness.replace(/_/g,"");
      }

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/keyboard', function(req, res) {
  var data = {
    'type' : 'buttons',
    'buttons':['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
  };

  res.json(data);
});

app.post('/message',function(req,res) {
  var msg = req.body.content;
  console.log('전달받은 메시지: ' + msg);
  var send = {};
  

  switch(msg) {
    case '오늘의 급식':
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
          'buttons': ['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
        }
      }
      break;

    case '내일의 급식':
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
      num = dd+1;
      //mm, num
      finddaytomorrow(mm, num);
      sampleAsynctomorrow(num);
      send = {
        'message' : {
          'text' : tomorrowmonthdata + "월" + num + "일 의 급식입니다.\n" + bobdatatomorrow
        },
        keyboard: {
          'type': 'buttons',
          'buttons': ['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
        }
      }
      break;
    case '수요일 급식':
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var daylabel = today.getDay()
        if(daylabel <= 3) {
          day = dd + (3 - daylabel)
        }
        else{
          day = dd + (9 - daylabel)
        }
        //mm, day
        finddaywedness(mm,day)
        sampleAsyncwedness(day)
        send = {
          'message' : {
            'text' : '기대하고 계신가요?\n\n' + wedmonthdata + "월" + day + "일(수요일) 의 급식입니다.\n" + bobdatawedness
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
          }
        }
        break;
    case '문의 & 건의':
      send = {
        'message' : {
          'text' : '카카오톡 ID : ldj6192\n' + '페이스북 페이지 : http://facebook.com/bob.kumpams\n'
        },
        keyboard: {
          'type': 'buttons',
          'buttons': ['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
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
          'buttons':['오늘의 급식', '내일의 급식', '수요일 급식', '문의 & 건의']
        }
      }
      break;
  }

  res.json(send);
});
http.createServer(app).listen(1923, function() {
  console.log('ㅅㅓ버시작');
});
