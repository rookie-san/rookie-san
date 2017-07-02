/**
 * 카카오톡 으로부터 오는 webhook을 처리하는 router 모듈
 * 
 */



var util = require('../module/util');
var router = require('express').Router();
var i18n = require('i18n');
var logger = require('../module/logger');
var db = require('../module/db');




function kakao() {
  router.get('/keyboard', getKeyboard);
  router.post('/message', postMessage);
  return router;

}

module.exports = kakao();



// 이후에는 text 로 설졍 
// 
function getKeyboard(req, res) {
  logger.info('route: kakao keyboard ' + req.body);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.json({
    "type": "text"
  });
}


function postMessage(req, res) {

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  //{ user_key: 'DBpb8t6y66U2', type: 'text', content: 'Hello' }
  var source = req.body.user_key;
  var event = req.body.type;
  var message = req.body.content;


  // req log
  logger.info('kakao message()');
  logger.debug('request :', req.body);
  logger.debug('source : ', source);
  logger.debug('message : ', message);

  // setting locale
  try {
    i18n.setLocale(db.chat.getLocale(source));
  }
  catch (err) {
    i18n.setLocale('en');
  }

  switch (event) {
    case 'photo':
      var photoUrl = message;
      // photoHandler(source, photoUrl);
      logger.info(photoUrl);
      break;
    case 'text':
      if (message.match(/^http(s?)/)) {
        res.json(urlHandler(source, message));

      }
      else {
        res.json(commandHandler(source, message));

      }
      break;

  }

}

function commandHandler(source, message) {
  var tokens = message.split(' ');
  var cmd = tokens.shift();
  var defaultBtn = {
    "type": "text"
  };
  logger.debug('commandHandler(): cmd =', cmd);

  if (typeof cmd == "undefined" || cmd == "") return;

  switch (cmd) {
    case 'h':
    case 'Help':
    case 'help':
      logger.info('Help command activated');
      return template(__("Kakao help"), defaultBtn);
    case '이대로_진행하기':
      return template("로그인 완료후 사용이 가능합니다.", defaultBtn);

    default:
      return template(message, defaultBtn);

  }
}


function urlHandler(source, url) {

  if (url.match(/analytics.google.com/)) {
    // "provider", "type", "id", "gaViewId", "gaAccountId" 저장하고..
    var params = url.replace(/.*a([0-9]+)/, '$1');
    var accountId = params.split('w')[0];
    var viewId = params.split('p')[1].split('/')[0];
    var authParam = `provider=kakao&type=user&id=${source}&account=${accountId}&view=${viewId}`;

    logger.debug('urlHandler(): ga = ', accountId, viewId);

    var authURL = util.browserHandler('googlechromes://', '/auth/google/login', authParam);
    logger.debug('authURL = ' + authURL);
    var tempURL = {
      "message": {
        "text": "아래 링크를 눌러서 Chrome에서 Google Analytics에 로그인해주세요. 네이버 앱에서 로그인도 가능합니다.",
        "photo": {
          "url": "https://statsbot-dusskapark.c9users.io/public/S__12279816.jpg",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "Google signin",
          "url": authURL
        }
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          util.browserHandler('naversearchapp://inappbrowser?url=', '/auth/google/login', authParam),
          "이대로_진행하기"
        ]
      }
    };
    return tempURL;

  }
  else {
    // 그냥 텍스트 핸들러로 전환
    return commandHandler(source, url);
  }
}

// function saveChat(source, url) {
//   logger.info('saveChat()')
//   var params = url.replace(/.*a([0-9]+)/, '$1');
//   var accountId = params.split('w')[0];
//   var viewId = params.split('p')[1].split('/')[0];
//   logger.debug('saveChat: ', accountId, viewId);

//   var queries = {
//     provider: "kakao",
//     type: "user",
//     id: source,
//     gaAccountId: accountId,
//     gaViewId: viewId
//   };

//   var chat = chatCheck(source);

//   if (chat == null) {
//     // 채팅방의 정보를 저장한다. 
//     db.chat.kakaoSave(queries)
//       .then(function(result) {
//         var successMsg = __("Set browser");
//         logger.debug('saveChat: ga  = ', result, successMsg);
//         return successMsg;
//       })
//       .catch(function(err) {
//         logger.error('Error in writing chat', err);
//         var failureMsg = "Error in writing chat";
//         return failureMsg;
//       });

//   }
//   else {
//     var alreadyHaveMsg = __('Already added GA account: UA-%s', chat.gaAccountId);
//     return alreadyHaveMsg;

//   }

// }



function chatCheck(source) {
  // 등록된 챗방인지 확인하는 모듈 
  var checked = db.chat.findByID(source);
  logger.debug('chat :', checked);
  if (checked == undefined) {
    logger.info("No auth history for ", source);
    return null;
  }
  else {
    return checked;
  }
}


function template(text, buttons) {
  var template = {
    "message": {
      "text": text
    },
    "keyboard": buttons
  };

  logger.debug("KAKAO MSG " + JSON.stringify(template));
  return template;
}
