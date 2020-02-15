sendData = function(str) {
  var query = str
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
        sendData(oldMsg);
        console.log("found a new message");
      }
    }
    await sleep(2000);
  }
}

checkText();