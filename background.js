const footer_class = ".ghx-card-footer";
const meta_class = ".ghx-extra-fields";
const highlight_class = ".ghx-highlighted-fields";
const issue_number_class = ".ghx-key";

chrome.runtime.onInstalled.addListener(() => {
    console.log("test");
    [
        meta_class,
        highlight_class,
        issue_number_class,
        footer_class,
      ].forEach(id => chrome.storage.local.get(id, (result) => {
        if (result[id] === undefined) {
          chrome.storage.local.set({[id]: true});
        }
      }));
    chrome.storage.local.set({test: 200});
});