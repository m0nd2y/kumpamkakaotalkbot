  //로그 확인파일 추가
  //날짜별로 급식 불러오는 데이터 개발하면 됨. 엄청난 노가다작업 예상합니다.
  var express = require('express');

  var http = require('http');
  require('date-utils');
  var bodyParser = require('body-parser');
  var lognum = 0;
  var bobdatatoday;
  var bobdatatomorrow;
  var bobdata1;
  var canary = 0;

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
  sampleAsyncday1 = async function(date) {
          //console.log(await school.getMeal());
          var beforedata = await school.getMeal();
          //var afterdata = JSON.parse(beforedata);
          bobdatatday1 = beforedata[date].replace(/[0-9]/g, "");
          bobdatatday1 = bobdataday1.replace(/\./g,"");
          bobdatatday1 = bobdataday1.replace(/_/g,"");
        }

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.get('/keyboard', function(req, res) {
    var data = {
      'type' : 'buttons',
      'buttons':['오늘의 급식', '내일의 급식', '이번 달 급식', '문의 & 건의']
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
          console.log('['+ time +']' + ' 오늘의 급식 \n' + ' [' + lognum + ']' + 'canary = ' + canary);
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
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식', '문의 & 건의']
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
        sampleAsynctoday(num);
        send = {
          'message' : {
            'text' : mm + "월" + num + "일 의 급식입니다.\n" + bobdatatomorrow
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
        break;
      case '문의 & 건의':
          var newdate = new Date();
          var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
          console.log('['+ time +']' + ' 문의 & 건의\n' + ' [' + lognum + ']');
          lognum = lognum + 1;
        send = {
          'message' : {
            'text' : '카카오톡 ID : ldj6192\n' + '페이스북 페이지 : http://facebook.com/bob.kumpams\n'
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;
      case '이번 달 급식':
          var newdate = new Date();
          var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
          console.log('['+ time +']' + ' 이번 달 급식\n' + ' [' + lognum + ']');
        send = {
          'message' : {
              'text' : '날짜를 선택해주세요.'
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['1일', '2일', '3일',  '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일', '돌아가기']
          }
        }
          break;

      case '1일':
          var mm = today.getMonth()+1; //January is 0!    
          var newdate = new Date();
          var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
          console.log('['+ time +']' + ' 이번 달 급식\n' + ' [' + lognum + ']');
      send = {
              'message' : {
                'text' : mm + '월 1일의 급식입니다.\n' + bobdataday1
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;


      case '돌아가기':
          console.log('['+ time +']' + '  돌아가기\n' + ' [' + lognum + ']');
      send = {
              'message' : {
                'text' : '메인화면'
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      default:
        send = {
          'message': {
            'text':'이번달에 없는 날짜이거나\n알 수 없는 명령입니다!\n\n개발자에게 문의해주세요.'
          },
          keyboard: {
            'type':'buttons',
            'buttons':['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
        break;
    }

    res.json(send);
  });
  http.createServer(app).listen(2011, function() {
    console.log('ㅅㅓ버시작');
  });
