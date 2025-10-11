const cards = Array.from(document.querySelectorAll(".card"));
const selectedFromLabel = document.getElementById("selected-from");
const selectedToLabel = document.getElementById("selected-to");
const fromBadge = document.getElementById("from-badge");
const toBadge = document.getElementById("to-badge");

let fromGen = null;
let toGen = null;

function updateSelectionVisuals() {
  cards.forEach((card) => {
    const gen = card.dataset.gen;
    card.removeAttribute("data-selected-from");
    card.removeAttribute("data-selected-to");
    if (fromGen === gen) card.setAttribute("data-selected-from", "true");
    if (toGen === gen) card.setAttribute("data-selected-to", "true");
  });

  selectedFromLabel.textContent = fromGen ? capitalize(fromGen) : "—";
  selectedToLabel.textContent = toGen ? capitalize(toGen) : "—";
  fromBadge.textContent = fromGen ? capitalize(fromGen) : "—";
  toBadge.textContent = toGen ? capitalize(toGen) : "—";
}

function capitalize(s) {
  if (!s) return s;
  if (s.toLowerCase() === "genz") return "Gen Z";
  return s[0].toUpperCase() + s.slice(1);
}

// Set From / To buttons
cards.forEach((card) => {
  const gen = card.dataset.gen;
  const btnFrom = card.querySelector(".set-from");
  const btnTo = card.querySelector(".set-to");

  btnFrom.addEventListener("click", () => {
    fromGen = fromGen === gen ? null : gen;
    if (fromGen && toGen === fromGen) toGen = null;
    updateSelectionVisuals();
  });

  btnTo.addEventListener("click", () => {
    toGen = toGen === gen ? null : gen;
    if (toGen && fromGen === toGen) fromGen = null;
    updateSelectionVisuals();
  });
});

// --- Emoji picker ---
const emojiToggle = document.getElementById("emoji-toggle");
const emojiPop = document.getElementById("emoji-pop");
const textInput = document.getElementById("text-input");

// --- Emoji window picker ---
const emojiBtn = document.getElementById("emoji-btn");

emojiBtn.addEventListener("click", () => {
  // Open a small popup window
  const emojiWindow = window.open(
    "",
    "emojiPicker",
    "width=400,height=500,resizable=yes,scrollbars=yes",
  );

  emojiWindow.document.write(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Emoji Picker</title>
      <style>
        body { font-family: sans-serif; display:flex; flex-wrap: wrap; gap:0.5rem; padding:1rem; background:#1c1c2b; color:white; }
        .emoji { font-size: 2rem; cursor:pointer; padding:0.5rem; border-radius:0.5rem; background: rgba(255,255,255,0.05); transition: background 0.2s; }
        .emoji:hover { background: rgba(181,126,220,0.3); }
      </style>
    </head>
    <body>
      <script>
        const emojis = [ '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
  '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗',
  '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥',
  '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝',
  '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁',
  '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩',
  '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡',
  '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠',
  '🤡', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓', '😈',
  '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟',
  '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎',
  '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏',
  '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
  '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
  '✨', '💫', '⭐', '🌟', '💥', '💯', '🔥', '⚡', '☄️', '💨',
  '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚽', '🏀',
  '🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇',
  '🥞', '🧈', '🍞', '🥐', '🥨', '🥯', '🥖', '🧀', '🥗', '🥙',
  '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃',];
        const textarea = opener.document.getElementById('text-input');
        emojis.forEach(e => {
          const btn = document.createElement('div');
          btn.textContent = e;
          btn.className = 'emoji';
          btn.addEventListener('click', () => {
            // Insert emoji at cursor
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;
            textarea.value = value.slice(0,start) + e + value.slice(end);
            textarea.setSelectionRange(start+1,start+1);
            textarea.focus();
            window.close();
          });
          document.body.appendChild(btn);
        });
      </script>
    </body>
    </html>
  `);
});

// --- Translation ---
const translatorForm = document.getElementById("translator-form");
const outputEl = document.getElementById("emoji-output");
const translateBtn = document.getElementById("translate-btn");
const directTranslate = document.getElementById("direct-translate");

translatorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  runTranslate();
});

directTranslate.addEventListener("click", runTranslate);

function runTranslate() {
  const raw = (textInput.value || "").trim();
  if (!raw) {
    setOutput('<p class="placeholder">Enter a message to decode.</p>');
    return;
  }
  if (!fromGen || !toGen) {
    setOutput(
      '<p class="placeholder">Select both a "From" and "To" generation above.</p>',
    );
    return;
  }

  const translated = translateBetween(raw, fromGen, toGen);
  setOutput(escapeHtml(translated));
}

// --- Copy / Clear ---
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");

copyBtn.addEventListener("click", async () => {
  const text = outputEl.textContent.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "✅ Copied";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1400);
  } catch {
    copyBtn.textContent = "✖️";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1400);
  }
});

clearBtn.addEventListener("click", () => {
  setOutput(
    '<p class="placeholder">No translation yet — decode a message.</p>',
  );
});

// --- Swap From/To ---
const swapBtn = document.getElementById("swap-btn");
swapBtn.addEventListener("click", () => {
  [fromGen, toGen] = [toGen, fromGen];
  updateSelectionVisuals();
});

// --- Helpers ---
function insertAtCursor(input, text) {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  const before = input.value.substring(0, start);
  const after = input.value.substring(end);
  input.value = before + text + after;
  const pos = start + text.length;
  input.setSelectionRange(pos, pos);
}

function setOutput(htmlOrText) {
  if (typeof htmlOrText === "string") {
    outputEl.innerHTML = htmlOrText;
  } else {
    outputEl.textContent = htmlOrText;
  }
}

// --- Mock translation (demo) ---
function translateBetween(text, from, to) {
  const baseMap = {
    happy: "😊",
    love: "❤️",
    fire: "🔥",
    party: "🎉",
    sus: "🤨",
    lol: "😂",
    ok: "👌",
    thanks: "🙏",
    parents: "👨‍👩‍👧‍👦",
    kids: "🧒",
    hello: "Hello",
    yes: "Yes",
    no: "No",
  };

  const punctuation = /[.,!?;:]+$/;
  const tokens = text.split(/\s+/).map((token) => {
    const p = token.match(punctuation);
    const tail = p ? p[0] : "";
    const core = p ? token.slice(0, -tail.length) : token;
    return { raw: token, core, tail };
  });

  function mapWord(w) {
    const lw = w.toLowerCase();

    if (to === "genz") {
      if (baseMap[lw]) return baseMap[lw];
      if (lw === "hello" || lw === "hi") return "hey";
    }

    if (to === "boomer") {
      if (lw === "u") return "you";
      if (lw === "ur") return "your";
      if (lw === "idk") return "I don’t know";
      if (baseMap[lw] && /\p{Emoji}/u.test(baseMap[lw])) {
        if (baseMap[lw] === "🔥") return "exciting";
        if (baseMap[lw] === "❤️") return "love";
        if (baseMap[lw] === "😊") return "Happy";
      }
    }

    if (baseMap[lw]) return baseMap[lw];
    return w;
  }

  return tokens.map((t) => mapWord(t.core) + (t.tail || "")).join(" ");
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        s
      ],
  );
}

// --- Init ---
updateSelectionVisuals();
setOutput('<p class="placeholder">No translation yet — decode a message.</p>');
