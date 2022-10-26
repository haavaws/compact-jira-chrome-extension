const footer_class = ".ghx-card-footer";
const meta_class = ".ghx-extra-fields";
const highlight_class = ".ghx-highlighted-fields";
const issue_number_class = ".ghx-key";

function toggle_hidden(selector, state) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.hidden = state;
  });
}

const avatar_class = ".ghx-avatar";
function pull_card_out_of_footer(selector) {
  const avatar_element = document.querySelectorAll(selector);
  avatar_element.forEach((element) => {
    const footer = element.parentNode;
    const card = footer.parentNode;
    card.appendChild(element);
    card.style.minHeight = "32px";
  });
}

async function read_storage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result));
  });
}

const default_config = {
  [footer_class]: true,
  [meta_class]: true,
  [highlight_class]: true,
  [issue_number_class]: true,
};

chrome.storage.local.set(default_config);

function mutate_dom() {
  read_storage([
    meta_class,
    highlight_class,
    issue_number_class,
    footer_class,
  ]).then((result) => {
    Object.entries(result).forEach(([key, value]) => toggle_hidden(key, value));
  });

  pull_card_out_of_footer(avatar_class);
}

// initial in mount
const card_class = ".ghx-issue";
const timer = setInterval(() => {
  const card = document.querySelector(card_class);
  if (card !== null) {
    clearInterval(timer);
    mutate_dom();
  }
}, 100);

// observe storage changes
chrome.storage.onChanged.addListener(function (changes) {
  Object.entries(changes).forEach(([key, value]) => {
    if (
      [meta_class, highlight_class, issue_number_class, footer_class].includes(
        key
      )
    ) {
      toggle_hidden(key, value.newValue);
    }
  });
  
  console.log("toggle-content.js", changes);
});