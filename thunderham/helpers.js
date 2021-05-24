// show the text in the popup-html-page 
// (also change the page background color for convenience)
function changeDOM(bodyText) {
  console.log(`changeDOM:`, bodyText);
  document.body.textContent = bodyText;

  if (bodyText.includes("spam")) {
    document.body.style.backgroundColor = "red";
  } else if (bodyText.includes("ham")) {
    document.body.style.backgroundColor = "green";
  } else {
    // the case for a connection error / multimail selection
    document.body.style.backgroundColor = "yellow";
  }
}

// get and return the alert-div-text out of the htmlString
// the div-text contains the spam / ham probability
function parseHTML(htmlString) {
  let parser = new DOMParser();
  let htmlDoc = parser.parseFromString(htmlString, 'text/html');
  let alertBox = htmlDoc.getElementsByClassName("alert");
  return alertBox[0].innerText.trim();
}

// upload a string (here: raw email content) to the specified url
// returns promise containg the html-response or an error message
function uploadFile(url, fileContent) {

  return new Promise(function (resolve, reject) {

    const formData = new FormData();
    fileData = new Blob([fileContent], { type: 'text/plain' });
    formData.append('email_raw', fileData, "email.eml");

    const options = {
      method: 'POST',
      body: formData,
    };

    fetch(url, options)
      .then(response => response.text())
      .then(result => {
        console.log("Server response:", result);
        resolve(result);
      })
      .catch(error => {
        console.log('Server response:', error);
        reject(error);
      });

  });
}


// create a new window
function createWindow(windowText) {
  let createData = {
    type: "popup",
    // pass result (spam / ham with percent) via url parameter
    url: "window/window.html?data=" + encodeURIComponent(windowText),
    width: 250,
    height: 100
  };

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let window = browser.windows.create(createData);
  window.then(onCreated("Window"), onError);
}

// spawns a notification with the ham icon
// and the passed message as the text
function notify(message) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.runtime.getURL("icons/ham.svg"),
    "title": "Thunderham",
    "message": message
  });
}

// for manual parsing of the email multipart bodys
// not needed anymore because there is browser.messages.**getRaw** ...
let globalBody = "";
function buildBody(raw_mail) {

  // facepalm ...
  // there is a function that returns all mail contents (incl. headers) ..
  // alternative way with browser.messages.getFull(message.id)
  // let body = "";
  // body = buildBody(result);
  // console.log(`body`, body);

  for (const bodyPart of raw_mail.parts) {
    if (bodyPart.parts) {
      console.log("Multipart E-Mail");
      return buildBody(bodyPart);
    } else {
      if (bodyPart.body) {
        globalBody += "\n" + bodyPart.body;
      }
    }
  }
  return globalBody;
}
