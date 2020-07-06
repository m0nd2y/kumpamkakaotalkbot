  //로그 확인파일 추가
  //날짜별로 급식 불러오는 데이터 개발하면 됨. 엄청난 노가다작업 예상합니다.
  var express = require('express');

  var http = require('http');
  require('date-utils');
  var bodyParser = require('body-parser');
  var lognum = 0;//로그출력 번호
  var bobdata;
  var beforedata;
  var app = express();
  var dd, mm; //날짜, 월

  //학교 급식 정보 파싱
  const School = require('node-school-kr')

  const school = new School()

  school.init(school.eduType.middle, school.region.gyeonggi, 'J100001489')

    //급식 정보 가져오는 함수
    sampleAsynctoday = async function() {
          beforedata = await school.getMeal();
        }

    //급식정보 초기 호출
    sampleAsynctoday();

    //가져온 급식정보 필터링
    function filtering(selectdata) {
          bobdata = beforedata[selectdata].replace(/[0-9]/g, "");
          bobdata = bobdata.replace(/\./g,"");
          bobdata = bobdata.replace(/\//g,"");
          bobdata = bobdata.replace(/_/g,"");
    }

    //로그 출력하기
    function printlog(buttonname) {
        var newdate = new Date();
        var time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
        console.log('['+ time +']' + buttonname + ' [' + lognum + ']');
        lognum = lognum+1;
    }

    //카카오톡 리퀘스트
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

    //날짜 구하기
    function getday() {
        dd = today.getDate();
        mm = today.getMonth()+1; //January is 0!
    }

    switch(msg) {
      case '오늘의 급식':
        printlog('오늘의 급식');
        getday();
        filtering(dd)
        send = {
            'message' : {
            'text' : mm + "월" + dd + "일 의 급식입니다.\n" + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식', '문의 & 건의']
          }
        }
        break;

      case '내일의 급식':
        printlog('내일의 급식')
        getday();
        var tmp = dd + 1;
        filtering(tmp);
        send = {
          'message' : {
            'text' : mm + "월" + tmp + "일 의 급식입니다.\n" + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
        break;
      case '문의 & 건의':
        printlog('문의 & 건의');
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
        printlog('이번 달 급식');
        getday();
        send = {
          'message' : {
              'text' : '오늘은 ' + mm + '월 ' + dd + '일 입니다.'
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['1일', '2일', '3일',  '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '돌아가기']
          }
        }
          break;

      case '1일':
        tmp = 1;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '2일':
        tmp = 2;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '3일':
        tmp = 3;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '4일':
        tmp = 4;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '5일':
        tmp = 5;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '6일':
        tmp = 6;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '7일':
        tmp = 7;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '8일':
        tmp = 8;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '9일':
        tmp = 9;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '10일':
        tmp = 10;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '11일':
        tmp = 11;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '12일':
        tmp = 12;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '13일':
        tmp = 13;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '14일':
        tmp = 14;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '15일':
        tmp = 15;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '16일':
        tmp = 16;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '17일':
        tmp = 17;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '18일':
        tmp = 18;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '19일':
        tmp = 19;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '20일':
        tmp = 20;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '21일':
        tmp = 21;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '22일':
        tmp = 22;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '22일':
        tmp = 22;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '23일':
        tmp = 23;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '24일':
        tmp = 24;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '25일':
        tmp = 25;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '26일':
        tmp = 26;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '27일':
        tmp = 27;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '28일':
        tmp = 28;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '29일':
        tmp = 29;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;

      case '30일':
        tmp = 30;
        printlog('' + tmp + '일');
        getday();
        filtering(tmp);
        send = {
              'message' : {
                'text' : mm + '월 ' + tmp + '일의 급식입니다.\n' + bobdata
          },
          keyboard: {
            'type': 'buttons',
            'buttons': ['오늘의 급식', '내일의 급식', '이번 달 급식',  '문의 & 건의']
          }
        }
          break;


      case '돌아가기':
        printlog('돌아가기');

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
        printlog('알수없는 명령');
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
  http.createServer(app).listen(1924, function() {
    console.log('ㅅㅓ버시작');
  });
