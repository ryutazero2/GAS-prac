//取得した値を記載する関数
function dataAdd(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('gastest');

  //取得したいデータを取得する
  data = getData();

  //ヘッダーを用意する
  var range = sheet.getRange('A1:E1');
  range.setValues([['チャンネル名', '検索文字列','メインスレッド','リプライ','過去何時間']]);

  //チャンネル名・検索文字列・過去何時間のデータを記載する
  sheet.getRange('A2').setValues([[data[0]]]);
  sheet.getRange('B2').setValues([[data[1]]]);
  sheet.getRange('E2').setValues([[data[2]]]);

  getMessage([data[0]],data[1],[data[2]]);
  
  //console.log(getMessage([data[0]],data[1],[data[2]]));
}


// シートを追加する関数
function sheetAdd()  {
  let mySheet = SpreadsheetApp.getActiveSpreadsheet();
  //スプレッドシートに新しいシートを追加挿入
  let newSheet = mySheet.insertSheet();
  //追加挿入したシートに名前を設定
  newSheet.setName("GAS追加シート");
}

//スプレッドシートの値を取得する関数
function getData(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('設定項目');
  const range = sheet.getRange('B1:B3').getValues();
  return range;
}