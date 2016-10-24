function refreshBlocks(){
  return document.getElementsByClassName('listRelatedObject');
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

function findBlockIndexFromTitle(title){
  var blocks = refreshBlocks();
  for(var i = 0; i < blocks.length; i++){
    var currentBlockTitles = blocks[i].getElementsByTagName('h3');
    if(currentBlockTitles.length <= 0){
      continue;
    }
    var blockTitle = currentBlockTitles[0].innerText;
    if(blockTitle == title){
      return i;
    }
  }
  throw "Error: Block not found with that title.";
}

function showAll(title){
  var blockIndex = findBlockIndexFromTitle(title);
  showMore(blockIndex);
}

function showMore(index){
  var blocks = refreshBlocks();
  var moreButtons = blocks[index].getElementsByClassName('pShowMore');
  //
  var moreButtonsExist = moreButtons.length > 0;
  var showButtonExists = false;
  var firstButton;
  //
  if(moreButtonsExist){
    firstButton = blocks[index].getElementsByClassName('pShowMore')[0].firstChild;
    showButtonExists = firstButton.innerText.indexOf("Show") != -1;
  }
  if(showButtonExists){
    firstButton.click();
    setTimeout(function(){showMore(index);}, 500);
  } else {
    blocks[index].setAttribute("expanded", "true");
    return;
  }
}

function blockToString(index){
  var blocks = refreshBlocks();
  var table = blocks[index].getElementsByClassName('list')[0];
  var rows = table.getElementsByTagName('tr');
  var result = rowsToString(rows);
  return result;
}

function rowsToString(rows){
  var result = "";
  for(var i = 0; i < rows.length; i++){
    var cells = rows[i].children;
    for(var j = 1; j < cells.length; j++){
      var text = cells[j].innerText;
      // Removing commas from the inner text
      text = text.replace(/\,/g, '-');
      if(text.length == 1 && text.charCodeAt(0) == 160){
        text = "";
      }
      result += text + ",";
    }
    result += "\n";
  }
  return result;
}

function downloadAsFile(text, filename){
  var blob = new Blob([text], {type: "text/csv"}); // Types list: https://goo.gl/3EkJSx
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

function tryDownload(title){
  var index = findBlockIndexFromTitle(title);
  var blocks = refreshBlocks();
  if(blocks[index].getAttribute("expanded") == "true"){
    //console.log("Block Index: " + index);
    //console.log("Block Expanded? " + blocks[index].getAttribute("expanded"));
    var account = document.getElementById('contactHeaderRow').innerText.trim();
    var text = account + " - " + title + "\n";
    text += "Date: " + dateToday() + "\n,,\n";
    text += blockToString(index);

    downloadAsFile(text, account.toLowerCase() + " " + title.toLowerCase() + ".csv");
    removeButtons();
    addButtons();
  } else {
    setTimeout(function(){tryDownload(title);}, 500);
  }
}

function expandAndDownload(title){
  showAll(title);
  tryDownload(title);
}

function addButtons(){
  var blocks = refreshBlocks();
  for(var i = 0; i < blocks.length; i++){
    var blockHeader = blocks[i].getElementsByClassName('pbHeader')[0];
    var title = blockHeader.getElementsByTagName('h3')[0].innerText;
    var button = document.createElement("button");
    insert(blockHeader, title, button);
  }
}

function insert(blockHeader, title, button){
  button.textContent = "Download";
  button.className = "ss-custom";
  button.style.position = "absolute";
  button.style.marginLeft = "-75px";
  button.style.marginTop = "4px";
  button.style.cursor = "pointer";
  button.addEventListener("click", function(){expandAndDownload(title);});
  blockHeader.insertBefore(button, blockHeader.firstChild);
}

function removeButtons(){
  var buttons = document.getElementsByClassName("ss-custom");
  for(var i = 0; i < buttons.length; i++){
    buttons[i].outerHTML = "";
  }
}

addButtons();
