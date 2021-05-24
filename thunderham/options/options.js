/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings(e) {
    browser.storage.local.set({"url": document.querySelector("#url").value})
    .then(result => {
        console.log("Success:", result);
      })
      .catch(error => {
          console.error('Error:', error);
      });
      e.preventDefault();
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
    const selectURL = document.querySelector("#url")
    selectURL.value = restoredSettings.url;
  }
  
function onError(e) {
    console.error(e);
}


// solution from neil
// https://bugzilla.mozilla.org/show_bug.cgi?id=1607859
// or use the solution from mozilla (could not get it to work?)
// https://developer.thunderbird.net/add-ons/updating/tb78#replacing-options
// not needed anymore????
// window.browser = window.browser.extension.getBackgroundPage().browser;
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);