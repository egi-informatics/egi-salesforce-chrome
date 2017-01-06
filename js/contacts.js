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

  // Adding emails to array
  if(text.indexOf("@") != -1){
    emails.push(text);
    continue;
  }

  // Only looking for labels from here on down
  if(!isLabel){
    continue;
  }

  var isName = text == "name";
  var isPhone = text.indexOf('phone') != -1 || text.indexOf('mobile') != -1;
  var isTitle = text == "title";
  var nextText = tds[i + 1].innerText.trim();

  if(isName){
    name = nextText;
    continue;
  }
  if(isTitle){
    title = nextText;
  }
  if(isPhone && nextText.length > 0){
    phones.push(nextText);
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

var result = "";
result = "";

//download("this is the file", "text.txt");
