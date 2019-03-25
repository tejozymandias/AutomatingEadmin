/* Toggle Back Buttons begins */
var db_back = document.getElementById("db_back");
db_back.addEventListener("click", showMainPage, false);

 function showMainPage() {
document.getElementById('standard_buttons').style.display = "block";
document.getElementById('database_buttons').style.display = "none";
chrome.storage.local.clear();
}

var db_back_1 = document.getElementById("db_back_1");
db_back_1.addEventListener("click", showDbPage, false);
var db_back_2 = document.getElementById("db_back_2");
db_back_2.addEventListener("click", showDbPage, false);
var db_back_3 = document.getElementById("db_back_3");
db_back_3.addEventListener("click", showDbPage, false);


 function showDbPage() {
document.getElementById('database_buttons').style.display = "block";
document.getElementById('standard_buttons').style.display = "none";
document.getElementById('uploadList').style.display = "none";
document.getElementById('outdatedSubmitButton').style.display = "none";
document.getElementById('enableEpSubmitButton').style.display = "none";
chrome.storage.local.clear();
}
/*  Toggle Back Buttons Ends */


$(document).ready(function(){
  $('.tooltipped').tooltip();
 });



 /* 2nd Layer Button Defintions begins*/
 const dbBtnClick = document.getElementById("Databases");
 dbBtnClick.addEventListener("click", shwDbPage, false);

 function shwDbPage() {
   document.getElementById('database_buttons').style.display = "block";
   document.getElementById('standard_buttons').style.display = "none";
    }
  /* 2nd Layer Button Defintions ends */





 /* 3rd Layer Button Defintions begins */
 const add_DbBtnClick = document.getElementById("add_Databases");
 add_DbBtnClick.addEventListener("click",uploadPage,false);
 add_DbBtnClick.myParam = "add_key";
 const del_DbBtnClick = document.getElementById("delete_Databases");
 del_DbBtnClick.addEventListener("click",uploadPage,false);
 del_DbBtnClick.myParam = "delete_key";

function uploadPage(evt){
  document.getElementById('uploadList').style.display = "block";
  document.getElementById('database_buttons').style.display = "none";
  document.getElementById('standard_buttons').style.display = "none";
  var secretKey = evt.target.myParam;
chrome.storage.local.set({ uploadStatus: secretKey }, function() {
  console.log("Value is set to " + secretKey);
});
}

document.getElementById("outdated_Dababases").addEventListener("click", function(){
  document.getElementById('database_buttons').style.display = "none";
  document.getElementById('standard_buttons').style.display = "none";
  document.getElementById('outdatedSubmitButton').style.display = "block";
});
document.getElementById("ep_Databases").addEventListener("click", function(){
  document.getElementById('database_buttons').style.display = "none";
  document.getElementById('standard_buttons').style.display = "none";
  document.getElementById('enableEpSubmitButton').style.display = "block";
});
    /* 3rd Layer Button Defintions ends */

 






  /* Upload File Functionality Definition Begins*/
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("submitButton").addEventListener("click",addUploadedFile );
});

function addUploadedFile() {
  try {
    let checkFileExists = document.getElementById('fileInput');
        var fileList = checkFileExists.files;
        if(!(fileList[0])){
          console.log('file not uploaded');
        } 
    const reader = new FileReader();
    var result = [];
    reader.readAsText(fileList[0]);
    reader.onload = function (result){result = reader.result.split("\n");
    console.log('result zero is'+ result[0]);
    chrome.storage.local.get(["uploadStatus"], function(data) {
      result.unshift(data.uploadStatus);
      chrome.storage.local.clear();
      sendArrData(result);
      });     
  }        
  } catch (error) {
   console.log('no file selected');
  } 
}
/* Upload File Functionality Definition Ends */


/*Remove Outdated Databases */
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("outdatedSubmit").addEventListener("click",sendOutdatedFn);
});
/*Remove Outdated Databases */
/*Enable EP Databases */
// document.addEventListener("DOMContentLoaded", function() {
  // document.getElementById("epSubmit").addEventListener("click",enableEpDbs);
// });
/*Enable EP Databases */




/*  Send Message to Content Scripts */
function sendArrData(caughtResult) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, caughtResult);
 });
}

function sendOutdatedFn() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {passcode: "removeOutdated"});
 });
}

function enableEpDbs() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {passcode: "enableEP"});
 });
}
/*  Send Message to Content Scripts */



