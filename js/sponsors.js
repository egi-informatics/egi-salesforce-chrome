

var links = document.getElementsByTagName('a');
var divs = document.getElementsByTagName('div');
var textString;

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

var today = monthNames[monthIndex] + " " + day + ", " + year;

// START - Shows all sponsors
var tempAssetBlockArray = document.getElementsByClassName('assetBlock');
var tempAssetBlock = document.getElementsByClassName('assetBlock')[0];

for(i=0; i < tempAssetBlockArray.length; i++){
  if(tempAssetBlockArray[i].getElementsByTagName('a').length > tempAssetBlock.getElementsByTagName('a').length){
    tempAssetBlock = tempAssetBlockArray[i];
  }
}

var tempAlinks = tempAssetBlock.getElementsByTagName('a');

for(i = 0; i < tempAlinks.length; i ++){
  if(tempAlinks[i].innerText.indexOf("Show") != -1 && tempAlinks[i].innerText.indexOf("more") != -1){
    //console.log(tempAlinks[i].innerText);
    tempAlinks[i].click();
    break;
  }
}
// END - Shows all sponsors


// Fixes toolbar bug
//document.getElementById('tabBar').style.overflow = "hidden";

var detailBlockArray = document.getElementsByClassName('bDetailBlock')[0].getElementsByTagName('div');
var iNum; // Holds I #

// Stores the I # of the project to iNum
for(i = 0; i < detailBlockArray.length; i++){
    if(detailBlockArray[i].innerText.substring(0,2) == "I "){
        iNum = detailBlockArray[i].innerText;
    }
}
console.log(iNum);

setTimeout(function(){ // Needs a bit of a delay to work right

    // Re-gathers hyperlink list
    links = document.getElementsByTagName('a');

    // Finds the correct assetBlock element
    // There others in the recent items toolbar on the left.
    var assetBlockArray = document.getElementsByClassName('assetBlock');
    var assetBlock = document.getElementsByClassName('assetBlock')[0];

    for(i=0; i < assetBlockArray.length; i++){
      if(assetBlockArray[i].getElementsByTagName('a').length > assetBlock.getElementsByTagName('a').length){
        assetBlock = assetBlockArray[i];
      }
    }

    // Makes array of all links inside the assetBlock element
    var alinks = assetBlock.getElementsByTagName('a');
    var sponsorList = [];

    for(i=0;i<alinks.length;i++){
      if(alinks[i].innerText.substring(0, 2) == "I "){
        continue;
      }else if(alinks[i].innerText.trim() == "Assets Help"){
        continue;
      }else if(alinks[i].innerText == "Edit"){
        continue;
      }else if(alinks[i].innerText == "Del"){
        continue;
      }else if(alinks[i].href.indexOf("02ij") != -1){
        continue;
      }
      sponsorList.push(alinks[i].innerText);
    }

    // Sorts sponsor list alphabetically
    sponsorList.sort();
    console.log(sponsorList);

    // Starting the text file
    textString = iNum + " - Sponsors (" + today + ")\n";

    // Adds all sponsors
    for(i = 0; i < sponsorList.length; i++){
        textString += "\n" + sponsorList[i];
    }


    var h3s = document.getElementsByTagName('h3');
    function getAssetTitleElement(){
        for(i = 0; i < h3s.length; i++){
            if(h3s[i].innerText == "Assets"){
                return h3s[i];
            }
        }
    }

    var assets = getAssetTitleElement();
    //var assets = document.getElementsByClassName("pbTitle")[2].children[2];

    assets.innerHTML += '<a href="#" id="down" style="margin-left:5px;">Download List</a>';
    var down = document.getElementById('down');
    if(textString.split("\n").length > 3){
        down.download = iNum + " - Sponsors.txt";
        down.href = "data:text/plain;base64," + btoa(textString);
    }else{
        down.download = iNum + " - No Sponsors.txt";
        down.href = "data:text/plain;base64," + btoa(textString);
    }

}, 1000);
