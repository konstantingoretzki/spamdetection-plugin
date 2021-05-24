// imports are currently not possible?
// changeDOM, parseHTML and uploadFile are available because 
// the helper.js script is side loaded

// solution from neil
// https://bugzilla.mozilla.org/show_bug.cgi?id=1607859
// or use the solution from mozilla (could not get it to work?)
// https://developer.thunderbird.net/add-ons/updating/tb78#replacing-options
// window.browser = window.browser.extension.getBackgroundPage().browser;
// not needed anymore????

browser.tabs.query({
  active: true,
  currentWindow: true,
}).then(tabs => {
  let tabId = tabs[0].id;
  browser.messageDisplay.getDisplayedMessage(tabId).then((message) => {

    // debug
    // console.log(`message`, message);
    // console.log(`message.subject`, message.subject)

    browser.messages.getRaw(message.id).then(function (result) {
      console.log(`result`, result);

      // get url from the options field
      const gettingStoredSettings = browser.storage.local.get();
      gettingStoredSettings
        .then(storage => {
          console.log(`result.url`, storage.url);

          if (storage.url === undefined) {
            changeDOM("Server url is not set!");
          } else {
            // upload file to endpoint
            // uploadFile('http://localhost:8000', result);
            uploadFile(storage.url + "/predict", result)
              .then(result => {
                // parse response (HTML string)
                bodyText = parseHTML(result);
                return bodyText;
              })
              .then(bodyText => {
                // change the text of the body
                // also change the bg color depending on the context
                changeDOM(bodyText);
              })
              .catch(() => {
                // fileUpload failed --> connection error
                changeDOM("Could not reach server!");
              })
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });

    });

  });
});