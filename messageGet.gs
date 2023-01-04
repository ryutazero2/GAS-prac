let postOptions = {
    "method": "get",
    "contentType": "application/x-www-form-urlencoded",
    "payload": {
      "token": ACCESS_TOKEN
    }
  }
    
function getMessage(channelName,msg,ts){
  //指定したチェンネルの全てのメッセージを取得する
  let result = JSON.parse(UrlFetchApp.fetch(`https://slack.com/api/conversations.history?channel=${getChannelId(channelName)}`, postOptions));
  let messages = result.messages;
  
  //filter 等のメソッドを利用するため配列化する

  //検索の時間を指定
  tsfil = messages.filter(e => e['ts'] < getTime(ts));

  //スプレッドシートのデータを配列化する
  msgArray = msg[0].split(',');


  tsMsgFil = tsfil.filter(e => {
  //検索結果にマッチしたものは配列のメッセージが返ってきて、他は undefined で返ってくる
  const findResult = msgArray.find(m => e['text'] === m);
  return findResult !== undefined
});

  console.log(tsMsgFil);

  rep = tsMsgFil.filter(e => (e['reply_count'] > 0));
  if(rep.length === 0){
    console.log('ok');      //あとで return
  }
  //let represult = JSON.parse(UrlFetchApp.fetch(`https://slack.com/api/conversations.replies?channel=${getChannelId(channelName)}&ts=${getRepTs}`, postOptions));
  //let reply = represult.messages;
  //let array2 = Object.values(reply);
  
  //return array2;

}

//現在時刻からx時間前を取得し、unixtime に変換する
function getTime(beforeTime){
  //現在時刻から指定した時間前を取得する
  var now = new Date(); 
  var x_hour_ago = new Date();
  x_hour_ago.setHours(now.getHours() - beforeTime);
  //取得した時刻を unixtime に変換
  return x_hour_ago.getTime() / 1000;
}

function getChannelId(channelName) {
  var headers = {
    'Authorization': 'Bearer '+ ACCESS_TOKEN
  };
  var options = {
    'method' : 'post',
    'headers': headers,
    'contentType': 'application/json',
  };

  // 全てのチャンネル情報を取得
  var response = UrlFetchApp.fetch('https://slack.com/api/conversations.list', options);
  var json = JSON.parse(response.getContentText());

  // 対象のチャンネルのIDのみ表示する
  for (i=0; i<json.channels.length; i++) {
    if (json.channels[i].name == channelName) {
      return json.channels[i].id;
    }
  }
}