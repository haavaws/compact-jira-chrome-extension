const footer_class = ".ghx-card-footer";
const meta_class = ".ghx-extra-fields";
const highlight_class = ".ghx-highlighted-fields";
const issue_number_class = ".ghx-key";


async function read_storage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result));
  });
}

let storage = {};

read_storage([
    meta_class,
    highlight_class,
    issue_number_class,
    footer_class,
  ]).then((result) => {
    storage = Object.entries(result).reduce((res, [key, val]) => ({...res, [key]: val}), {});
    Object.entries(storage).forEach(([key, value]) => {
      document.getElementById(key).checked = value;
    })
    console.log("popup.js", storage);
  });


document.getElementById("testbutton").addEventListener("click", () => {
    chrome.storage.local.set({test: Math.floor(Math.random() * 100)});
});

function toggleChangeHandler(event) {
  chrome.storage.local.set({[event.target.id]: event.target.checked});
}

document.querySelectorAll("input").forEach(element => element.addEventListener("change", toggleChangeHandler));