(function(){
  var details = document.querySelector('.detailList');
  var tds = details.querySelectorAll('td');

  var name = "";
  var title = "";
  var account = "";
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
    var isTitle = text == "title";
    var isAccount = text.indexOf('account') != -1;
    var isPhone = text.indexOf('phone') != -1 || text.indexOf('mobile') != -1;
    var isEmail = text.indexOf('email') != -1;

    if(isName){
      name = nextText;
    }
    if(isTitle){
      title = nextText;
    }
    if(isAccount){
      account = nextText;
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
  result += wrap("Account:") + c + wrap(account) + n;
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

  // Appending quick download button
  var topRow = document.querySelector('#topButtonRow');
  var button = document.createElement('input');
  button.classList.add('btn');
  button.value = "Download Quick Info";
  button.addEventListener('click', downloadQuickInfo);

  topRow.appendChild(button);
})();
