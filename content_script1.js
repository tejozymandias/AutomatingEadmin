chrome.runtime.onMessage.addListener(message);

function message(request, sender, sendResponse) {
  chrome.storage.local.clear();
  try {
    if ((request[0] === ("add_key")) || (request[0] === ("delete_key"))) {
      var tempArray = request.slice();
      chrome.storage.local.set({ "storageArray": tempArray });
      dispatchAll();

    } else if (request.passcode === "removeOutdated") {
		var key = "Out";
      runOutdatedFunction(key);
    } else if (request.passcode === "enableEP") {
      console.log('Enable EP Message received');
      chrome.storage.local.set({ "message": "ep" });
      dispatchAll();
    } else {
      console.log('Nothing has been received');
    }
  } catch (error) {
    console.log('probably on the wrong page');
    chrome.storage.local.clear();
  }
}
  



  
  // chrome.storage.local.clear();
  // chrome.storage.local.set({"storageArray": storageArray});

//   chrome.storage.local.get("storageArray", callback);




/* Add/remove Databases Function Content Script */
window.addEventListener('load', function () {
  try {
    chrome.storage.local.get("storageArray", chkAddOrDel);
    function chkAddOrDel(result) {
      if (result.storageArray) {
        overWriteConfirm();
        var trimmedArr = result.storageArray.map(s => s.trim());
        var gatherElementIds = window.document.querySelectorAll('span[id*="DisplayName_"]');
        var newArray = Array.prototype.slice.call(gatherElementIds);
        for (var i = 0; i < newArray.length; i++) {
          if (trimmedArr[0] == "add_key") {
            if (trimmedArr.indexOf(newArray[i].innerText) != -1) {
              newArray[i].parentElement.nextElementSibling.querySelectorAll('input[type=radio]')[0].click()
            }
          } else if (trimmedArr[0] == "delete_key") {
            if (trimmedArr.indexOf(newArray[i].innerText) != -1) {
              newArray[i].parentElement.nextElementSibling.querySelectorAll('input[type=radio]')[1].click()
            }
          }

        }
        nxtPage();

      } else {
        console.log("No Input from Database Buttons received");

      }
    }
  } catch (error) {
    console.log(error);
    chrome.storage.local.clear();
  }
})




function runOutdatedFunction(somekey){
	if(somekey=="Out"){
	overWriteConfirm();
	var presentDay = todayDate();
	var gatherEndDates = window.document.querySelectorAll('span[id*="AccessEndDate"]');
      var newEndDates = Array.prototype.slice.call(gatherEndDates);
      for (var i = 0; i < newEndDates.length; i++) {
        var tempDate = newEndDates[i].innerText.slice(0, 9)
        if (process(tempDate) < process(presentDay)) {
          newEndDates[i].parentElement.previousElementSibling.previousElementSibling.querySelectorAll('input[type=radio]')[1].click();
	  }}
	   chrome.storage.local.set({ "message": "outdated" });
		nxtPage();	  
}
else{console.log('key not found')};
}

/*Outdated Function Content Script */
window.addEventListener('load', function () {
  chrome.storage.local.get("message", checkOutdated);
  function checkOutdated(param) {
    if (param.message === "outdated") {
      overWriteConfirm();
      var presentDay = todayDate();
      var gatherEndDates = window.document.querySelectorAll('span[id*="AccessEndDate"]');
      var newEndDates = Array.prototype.slice.call(gatherEndDates);
      for (var i = 0; i < newEndDates.length; i++) {
        var tempDate = newEndDates[i].innerText.slice(0, 9)
        if (process(tempDate) < process(presentDay)) {
          newEndDates[i].parentElement.previousElementSibling.previousElementSibling.querySelectorAll('input[type=radio]')[1].click();
          console.log('Disable Database expression ' + tempDate);
        }
      }
      nxtPage();
    } 

  }
})


/*EpFunction Content Script */
window.addEventListener('load', function () {
	try{
  chrome.storage.local.get("message", checkEp);
  function checkEp(param) {
    if (param.message === "ep") {
      overWriteConfirm();
      console.log('Run EP Database Function');
      var dbNamesArray = window.document.querySelectorAll('span[id*="DisplayName_"]');
      var epArray = Array.prototype.slice.call(dbNamesArray);
      for (var i = 0; i < epArray.length; i++) {
        if (epArray[i].innerText.match(/\(([\w]){3}\)$/))
          epArray[i].parentElement.nextElementSibling.querySelectorAll('input[type=radio]')[0].click()
      }
      nxtPage()
      
    }
  }
	} catch(error){
		console.log('failed to run epMacro, Try Again')
		chrome.storage.local.clear();
	}
});





// var str1 = "Business Source Premier (buh)";
// if (str1.match(/\(([a-z]){3}\)$/)) {
//     console.log("match!");
// }


/*  // overwrite confirm box
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
*/
