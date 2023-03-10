const FOOTER_CLASS = ".ghx-card-footer";
const META_CLASS = ".ghx-extra-fields";
const HIGHLIGHT_CLASS = ".ghx-highlighted-fields";
const ISSUE_NUMBER_CLASS = ".ghx-key";
const AVATAR_CLASS = ".ghx-card-footer > .ghx-avatar";
const CARD_CLASS = ".ghx-issue";
const PARTY_MODE = "PARTY_MODE";

function toggle_hidden(selector, state) {
    const cards = document.querySelectorAll(CARD_CLASS);
    cards.forEach((card) => {
        card.querySelectorAll(selector).forEach((element) => {
            element.hidden = !state;
        });
    });
}

function toggle_party() {
    const elements = document.querySelectorAll(CARD_CLASS)
    elements.forEach((element) => {
        setInterval(() => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            element.style.backgroundColor = `#${randomColor}`;
            element.style.marginRight = Math.floor(Math.random() * 200 - 100) + "px";
          element.style.marginLeft = Math.floor(Math.random() * 200 - 100) + "px";
        }, Math.random() * 1000 + 500)
    })
}

function hasAvatarInContent(element) {
    const footer = element.parentNode;
    const card = footer.parentNode;
    return Array.from(card.childNodes).reduce(
        (acc, cur) => acc || cur.classList.contains("ghx-avatar"),
        false
    );
}

function pull_card_out_of_footer(selector) {
    const avatar_element = document.querySelectorAll(selector);
    avatar_element.forEach((element) => {
        if (hasAvatarInContent(element)) {
            return;
        }

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

// react to dom changes (new cards added and so on)
const observer = new MutationObserver(mutate_dom);
observer.observe(document, {
    childList: true,
    subtree: true,
});

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
        if (key === PARTY_MODE) {
            toggle_party()
        }
    });
});
