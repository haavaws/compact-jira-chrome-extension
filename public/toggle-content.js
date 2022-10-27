const FOOTER_CLASS = ".ghx-card-footer";
const META_CLASS = ".ghx-extra-fields";
const HIGHLIGHT_CLASS = ".ghx-highlighted-fields";
const ISSUE_NUMBER_CLASS = ".ghx-key";
const AVATAR_CLASS = ".ghx-avatar";
const CARD_CLASS = ".ghx-issue";

function toggle_hidden(selector, state) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.hidden = !state;
  });
}

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

function mutate_dom() {
  read_storage([
    META_CLASS,
    HIGHLIGHT_CLASS,
    ISSUE_NUMBER_CLASS,
    FOOTER_CLASS,
  ]).then((result) => {
    Object.entries(result).forEach(([key, value]) => toggle_hidden(key, value));
  });

  pull_card_out_of_footer(AVATAR_CLASS);
}

// initial in mount
const timer = setInterval(() => {
  const card = document.querySelector(CARD_CLASS);
  if (card !== null) {
    clearInterval(timer);
    mutate_dom();
  }
}, 100);

// observe storage changes
chrome.storage.onChanged.addListener(function (changes) {
  Object.entries(changes).forEach(([key, value]) => {
    if (
      [META_CLASS, HIGHLIGHT_CLASS, ISSUE_NUMBER_CLASS, FOOTER_CLASS].includes(
        key
      )
    ) {
      toggle_hidden(key, value.newValue);
    }
  });
});
