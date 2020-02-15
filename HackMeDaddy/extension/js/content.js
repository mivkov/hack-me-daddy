sendData = function(str) {
  var query = str
  js = JSON.stringify({"text": query})

  url = "https://hack-me-daddy.azurewebsites.net/api/text"
  $.ajax({
      url: url,
      method: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader( "Content-type", "application/json" );
      },
      jsonp: false,
      //dataType: "json",
      //dataType: "text",
      processData: false,
      // contentType: "text/plain; charset=utf-8",
      contentType: "application/json; charset=utf-8",
      //data: query,
      data: js,
      success: success,
      error: error,
      complete: complete
  });

}

complete = function(obj, status) {
  //console.log("Complete");
  //console.log(obj);
  //console.log(status);
}

success = function(data, status, obj) {
  //console.log("Success");
  //console.log(data[0].text);
  //console.log(data[0]);
  console.log(data);
  console.log(JSON.stringify(data));
  //the thing that does not work
  /*
  var text = document.getElementsByClassName('_1mf _1mj');
  if (text.length > 0) {
    oldText = text[0].innerHTML
    var index = innerHTML.indexOf(text);
    if (index >= 0) { 
      innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
      inputText.innerHTML = innerHTML;
    }*/
  
 // curMsg = text[0].innerText;
  //console.log(JSON.parse(data.message));
  //console.log(JSON.stringify(data.message));
  //console.log(data.message);
  //console.log(status);
  //console.log(obj);
}

error = function(obj, status, errThrow) {
  //console.log("oh FUCK");
  //console.log(obj);
  //console.log(status);
  //console.log(errThrow);
}
  /*
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {requested: "createDiv", data: res.data}, function(response) {
          console.log("Success");
      });
  });
  */


receiveData = function() {
  url = "https://hack-me-daddy.azurewebsites.net/api/text"

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("added a listener");
      console.log(request.data);
      console.log(sendResponse);
    });
}
/*
  $.get(url, function(data,status){
    console.log('${data}');
  });
}
  $.ajax({
    url: url,
    method: 'GET',
    success: function(result){
      console.log("yuhyuhyuh");
      console.log(result);
    },
    error: function(error){
      console.log(error);
    }
  });
}
*/

closeDiv = function(){
  this.parentNode.parentNode
  .removeChild(this.parentNode);
  return false;
};

createPopup = function(str) {
  var frag = document.getElementById("fragment-text")
  if(frag != null) {
      frag.innerHTML = str
      return;
  }

  var div = document.createElement("div")
  div.setAttribute('class', 'fragment')
  var close = document.createElement("span")
  close.innerHTML = "x"
  close.setAttribute('id', 'close')
  close.onclick = closeDiv

  var title = document.createElement("h3")
  title.innerHTML = "Simplification"
  var txt = document.createElement("p")
  txt.setAttribute('id', 'fragment-text')
  txt.innerHTML = str

  div.appendChild(close)
  div.appendChild(title)
  div.appendChild(txt)

  document.body.appendChild(div);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Function for continuously checking text
async function checkText() {
  // createPopup("HEllo fucker");
  var oldMsg = "";
  for(;;){
    var text = document.getElementsByClassName('_1mf _1mj');
    if (text.length > 0) {
      curMsg = text[0].innerText;
      if (curMsg != oldMsg) {
        oldMsg = curMsg;
        createPopup(oldMsg);
        // Sends the updated message to server
        console.log("found a new message");
        sendData(oldMsg);
        //await sleep(500);
        // Awaits response from server
        // receiveData();
        console.log(":(")
      }
    }
    await sleep(2000);
  }
}

checkText();