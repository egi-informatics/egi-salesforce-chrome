var details = document.querySelector('.detailList');
var tds = details.querySelectorAll('td');

var name = "";
var title = "";
var emails = [];
var phones = [];

// Gathering data
for(var i = 0; i < tds.length; i++){
  var td = tds[i];
  var text = td.innerText.trim().toLowerCase();
  var isLabel = td.classList.contains('labelCol')

  // Skips empty <td>s
  if(text.length == 0){
    continue;
  }

  var nextText = tds[i + 1].innerText.trim();
  if(!isLabel || nextText == ""){
    continue;
  }

  var isName = text == "name";
  var isPhone = text.indexOf('phone') != -1 || text.indexOf('mobile') != -1;
  var isTitle = text == "title";
  var isEmail = text.indexOf('email') != -1;

  if(isName){
    name = nextText;
  }
  if(isTitle){
    title = nextText;
  }

  if(isEmail){
    emails.push({
      label: td.innerText.trim(),
      data: nextText
    });
    continue;
  }
  if(isPhone && nextText.length > 0){
    phones.push({
      label: td.innerText.trim(),
      data: nextText
    });
    continue;
  }
}

function download(text, filename){
  var blob = new Blob([text], {type: "text/csv"}); // Types list: https://goo.gl/3EkJSx
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

function dateToday(){
  var currentDate = new Date();
  var day = currentDate.getDate();
  var monthIndex = currentDate.getMonth();
  var year = currentDate.getFullYear();

  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  return day + "-" + monthNames[monthIndex] + "-" + year;
}

function wrap(text){
  return "\"" + text + "\"";
}
var c = ",";
var n = "\n";
var empty = c + n;

var result = wrap("Name:") + c + wrap(name) + n;
result += wrap("Title:") + c + wrap(title) + n;
result += wrap("Date:") + c + wrap(dateToday()) + n + empty;

// Listing emails (with titles)
for(var i = 0; i < emails.length; i++){
  result += wrap(emails[i].label) + ":" + c + wrap(emails[i].data) + n;
}
result += empty;

// Listing phones (with titles)
for(var i = 0; i < phones.length; i++){
  result += wrap(phones[i].label) + ":" + c + wrap(phones[i].data) + n;
}

function downloadQuickInfo(){
  download(result, name.toLowerCase() + " quick info.csv");
}
//download(result, name.toLowerCase() + " quick info.csv");
