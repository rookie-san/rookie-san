/**
 * 카카오톡 으로부터 오는 webhook을 처리하는 router 모듈
 * 
 */

const router = require('express').Router();
var logger = require('../../module/logger');
var CircularJSON = require('circular-json');


// function kakao() {
//   //kakao initialize 하기
//   logger.info('route()');
//   var router = setupRouter();
//   return router;
  
// }


function kakao () {
  router.get('/keyboard', getKeyboard);
  router.post('/message', postMessage);
  return router;
  
}

module.exports = kakao();

// 첫 로그인 시점에는 BTN으로 '언어설정', 'GA연결하기', '사용방법' 을 제공


// 이후에는 text 로 설졍 
// 
function getKeyboard(req, res) {
  // logger.info('route: kakao keyboard');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.json({
    "type" : "text"
  });
}


function postMessage (req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  logger.info('route: kakao message - ' + req.body.content);


  //{ user_key: 'DBpb8t6y66U2', type: 'text', content: 'Hello' }
  var user_key = req.body.user_key;
  var type = req.body.type;
  var content = req.body.content;

  return res.json({
    "message": {
      "text": content
    }
  });
}
