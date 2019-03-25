function testFuntionJs(){
    console.log("Hello, hello , hello, is there anybody in there?");
}

var todayDate = function(){
	var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
	  return today;
}


function process(date){
  var parts = date.split("/");
  return new Date(parts[2],parts[0] -1,parts[1]);
}


function nxtPage(){
var getNxtArrow = document.getElementsByClassName('DataGrid-EmptyWhiteStyle');
	  var arrNumber = getNxtArrow.length-2;	
if(getNxtArrow[arrNumber].innerHTML.indexOf("arwSmallDown") !== -1){
		getNxtArrow[arrNumber].childNodes[0].click();
} else {
	chrome.storage.local.clear();
	return;
}
}

// overwrite confirm box
function overWriteConfirm(){
var disablerFunction = function() {
  window.alert = function alert(msg) {
    console.log("Hidden Alert " + msg);
  };
  window.confirm = function confirm(msg) {
    console.log("Hidden Confirm " + msg);
    return true;
  };
};
var disablerCode = "(" + disablerFunction.toString() + ")();";

var disablerScriptElement = document.createElement("script");
disablerScriptElement.textContent = disablerCode;

document.documentElement.appendChild(disablerScriptElement);
disablerScriptElement.parentNode.removeChild(disablerScriptElement); 
}



		 // wrap in a function and call
  // var disablerFunction = function() {
    // window.alert = function alert(msg) {
      // console.log("Hidden Alert " + msg);
    // };
    // window.confirm = function confirm(msg) {
      // console.log("Hidden Confirm " + msg);
      // return true;
    // };
  // };
  // var disablerCode = "(" + disablerFunction.toString() + ")();";  
  // var disablerScriptElement = document.createElement("script");
  // disablerScriptElement.textContent = disablerCode;  
  // document.documentElement.appendChild(disablerScriptElement);
  // disablerScriptElement.parentNode.removeChild(disablerScriptElement); 
  // wrap in a function and call


/*  //Set - Clear - Get - Chrome Storage
var theValue = "somValue";
chrome.storage.local.set({ value: theValue }, function() {
  console.log("Value is set to " + theValue);
});

chrome.storage.local.clear();

chrome.storage.local.get(["value"], function(data) {
  console.log("lets see the value after clear " + data.value);
});
// Storing Array //
chrome.storage.local.set({"targetList": targetList});
chrome.storage.local.get("targetList", callback);
function callback(result) {
  targetList = result.targetList;
}
 */




// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = mm + '/' + dd + '/' + yyyy;
// console.log(today);

// var date1 = '01/12/2018';
// var date2 = '12/12/2018';
// date1 = new Date(date1);
// date2 = new Date(date2);
// date1 > date2;  //false
// date1 < date2;  //true
// date1 >= date2; //false
// date1 <= date2; //true