function storageChanged(changes, areaName) {
    if (areaName === "local") {
        if (changes.result) {
            console.log(`changes.result`, changes.result);
            changeDOM(changes.result.newValue);
        }
    }
}

// sendRemoveListener on closed conduit error???
browser.storage.onChanged.addListener(storageChanged);

// awesome idea from wOxxOm
// https://stackoverflow.com/a/54715122
// get data passed via URL
let sharedData;
try {
    sharedData = new URLSearchParams(location.search).get('data');
} catch (e) {
    console.log(`e`, e);
}
// simplify the displayed URL in the address bar
console.log(`sharedData:`, sharedData);
console.log(`typeof(sharedData):`, typeof(sharedData));
// change from window.html to Thunderham - .....
document.title = "Thunderham";

if (sharedData === "") {
    console.log("sharedData passed data is empty - keep default text unchanged");
} else {
    changeDOM(sharedData);
}