const FOOTER_CLASS = ".ghx-card-footer";
const META_CLASS = ".ghx-extra-fields";
const HIGHLIGHT_CLASS = ".ghx-highlighted-fields";
const ISSUE_NUMBER_CLASS = ".ghx-key";

chrome.runtime.onInstalled.addListener(() => {
  [META_CLASS, HIGHLIGHT_CLASS, ISSUE_NUMBER_CLASS, FOOTER_CLASS].forEach(
    (id) =>
      chrome.storage.local.get(id, (result) => {
        if (result[id] === undefined) {
          chrome.storage.local.set({ [id]: false });
        }
      })
  );
});
