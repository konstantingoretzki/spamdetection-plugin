// ########################################################
// default event handler
// ########################################################
/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(creationType) {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log(creationType + " created successfully");
    }
}


// ########################################################
// context menu entry and logic
// ########################################################
browser.menus.create({
    id: "thunderham",
    title: "Check with Thunderham",
    contexts: ["all"]
}, onCreated("Menu Entry"));


browser.menus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "thunderham":

            console.log("tab: ", tab);

            browser.tabs.query({
                active: true,
                currentWindow: true,
            }).then(tabs => {
                let tabId = tabs[0].id;
                browser.messageDisplay.getDisplayedMessage(tabId).then((message) => {

                    if (message) {
                        console.log(`message`, message);
                        browser.messages.getRaw(message.id).then(function (result) {
                            console.log(`result`, result);

                            // get url (set via options field) from the storage
                            const gettingStoredSettings = browser.storage.local.get();
                            gettingStoredSettings
                                .then(storage => {
                                    console.log(`result.url`, storage.url);

                                    if (storage.url === undefined) {
                                        notify("Server url is not set!");
                                    } else {

                                        // we could spawn here a notification and update it later
                                        // however firefox does not support notification.update() ...
                                        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/update

                                        // upload file to endpoint
                                        // uploadFile('http://localhost:8000', result);
                                        uploadFile(storage.url + "/predict", result)
                                            .then(result => {
                                                // parse response (HTML string)
                                                bodyText = parseHTML(result);
                                                return bodyText;
                                            })
                                            .then(bodyText => {
                                                // spawn notification containing the spam / ham prediction of the HTML response
                                                notify(bodyText)
                                            })
                                            .catch(() => {
                                                // fileUpload failed --> connection error
                                                notify("Could not reach server!");
                                            })
                                    }

                                })
                                .catch(error => {
                                    console.log('Error:', error);
                                });
                        });

                    } else {
                        console.log("multiple messages selected");
                        notify("Selecting multiple emails is not supported!");
                    }

                });
            });

    }
})
