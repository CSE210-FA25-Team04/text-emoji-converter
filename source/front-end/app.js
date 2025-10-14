// Generational Translation Logic
const translations = {
  millennial: {
      genz: {
          patterns: [
              { from: /literally/gi, to: 'fr' },
              { from: /dying/gi, to: 'dead' },
              { from: /extra/gi, to: 'too much' },
              { from: /amazing/gi, to: 'bussin' },
              { from: /cool/gi, to: 'fire' },
              { from: /awesome/gi, to: 'slaps' },
              { from: /crazy/gi, to: 'wild' },
              { from: /😂/g, to: '💀' },
              { from: /💼/g, to: '💯' },
              { from: /I'm /gi, to: "I'm " }
          ],
          suffix: ' fr fr'
      },
      boomer: {
          patterns: [
              { from: /literally/gi, to: 'really' },
              { from: /extra/gi, to: 'excessive' },
              { from: /amazing/gi, to: 'wonderful' },
              { from: /cool/gi, to: 'neat' },
              { from: /awesome/gi, to: 'excellent' },
              { from: /😂/g, to: '😊' },
              { from: /💀/g, to: '😄' },
              { from: /💼/g, to: '📋' },
              { from: /no cap/gi, to: 'honestly' },
              { from: /fr fr/gi, to: 'really' }
          ]
      }
  },
  genz: {
      millennial: {
          patterns: [
              { from: /fr fr/gi, to: 'literally' },
              { from: /\bfr\b/gi, to: 'seriously' },
              { from: /no cap/gi, to: 'no lie' },
              { from: /bussin/gi, to: 'amazing' },
              { from: /slaps/gi, to: 'rocks' },
              { from: /fire/gi, to: 'awesome' },
              { from: /dead/gi, to: 'dying' },
              { from: /💀/g, to: '😂' },
              { from: /💯/g, to: '👍' }
          ]
      },
      boomer: {
          patterns: [
              { from: /fr fr/gi, to: 'really' },
              { from: /\bfr\b/gi, to: 'truly' },
              { from: /no cap/gi, to: 'honestly' },
              { from: /bussin/gi, to: 'excellent' },
              { from: /slaps/gi, to: 'is great' },
              { from: /fire/gi, to: 'wonderful' },
              { from: /dead/gi, to: 'laughing' },
              { from: /bruh/gi, to: 'buddy' },
              { from: /💀/g, to: '😊' },
              { from: /💯/g, to: '👍' },
              { from: /🔥/g, to: '⭐' }
          ]
      }
  },
  boomer: {
      millennial: {
          patterns: [
              { from: /the bee's knees/gi, to: 'amazing' },
              { from: /groovy/gi, to: 'cool' },
              { from: /excellent/gi, to: 'awesome' },
              { from: /wonderful/gi, to: 'great' },
              { from: /neat/gi, to: 'cool' },
              { from: /swell/gi, to: 'nice' },
              { from: /☎️/g, to: '📱' },
              { from: /📻/g, to: '💻' },
              { from: /📋/g, to: '💼' }
          ]
      },
      genz: {
          patterns: [
              { from: /the bee's knees/gi, to: 'bussin' },
              { from: /groovy/gi, to: 'fire' },
              { from: /excellent/gi, to: 'slaps' },
              { from: /wonderful/gi, to: 'fire' },
              { from: /neat/gi, to: 'cool' },
              { from: /honestly/gi, to: 'no cap' },
              { from: /really/gi, to: 'fr' },
              { from: /☎️/g, to: '📱' },
              { from: /📻/g, to: '💻' },
              { from: /😊/g, to: '💀' },
              { from: /👍/g, to: '💯' }
          ],
          suffix: ' fr'
      }
  }
};

// Emoji categories
const emojiData = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😶‍🌫️', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '💀', '☠️'],
  gestures: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄'],
  objects: ['💼', '📁', '📂', '📅', '📆', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '📏', '📐', '✂️', '🗃', '🗄', '🗑', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝', '🔨', '🪓', '⛏', '⚒', '🛠', '🗡', '⚔️', '🔫', '🏹', '🛡', '🔧', '🔩', '⚙️', '🗜', '⚖️', '🦯', '🔗', '⛓', '🧰', '🧲', '📱', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '💽', '💾', '💿', '📀', '🧮', '🎥', '🎬', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯', '💡', '🔦', '🏮', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄', '📰', '🗞', '📑', '🔖', '🏷'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', '🔠', '🔡', '🔢', '🔣', '🔤', '🆗', '🆙', '🆒', '🆕', '🆓', '🔟', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫']
};

// State
let currentEmojiTarget = null;

// DOM Elements
const fromGenSelect = document.getElementById('from-generation');
const toGenSelect = document.getElementById('to-generation');
const swapButton = document.querySelector('.swap-button');
const translateBtn = document.getElementById('translate-btn');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const inputBadge = document.getElementById('input-badge');
const outputBadge = document.getElementById('output-badge');
const inputCount = document.getElementById('input-count');
const outputCount = document.getElementById('output-count');
const copyBtn = document.querySelector('.copy-btn');
const clearBtn = document.querySelector('.clear-btn');
const emojiBtn = document.querySelector('.emoji-btn');
const exampleBtns = document.querySelectorAll('.example-btn');
const toggleExamplesBtn = document.getElementById('toggle-examples');
const examplesSection = document.getElementById('examples-section');
const emojiPicker = document.getElementById('emoji-picker');
const emojiGrid = document.getElementById('emoji-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const closeEmojiPickerBtn = document.querySelector('.close-btn');
const emojiPickerBackdrop = document.querySelector('.emoji-picker-backdrop');
const toast = document.getElementById('toast');

// Helper Functions
function getGenerationLabel(value) {
  const labels = {
      millennial: 'Millennial',
      genz: 'Gen Z',
      boomer: 'Boomer'
  };
  return labels[value] || value;
}

function translateText(text, fromGen, toGen) {
  if (!text.trim() || fromGen === toGen) {
      return text;
  }

  const translationMap = translations[fromGen]?.[toGen];
  if (!translationMap) {
      return text;
  }

  let result = text;
  
  // Apply pattern replacements
  if (translationMap.patterns) {
      translationMap.patterns.forEach(({ from, to }) => {
          result = result.replace(from, to);
      });
  }

  // Add suffix if defined
  if (translationMap.suffix && result.trim() && !result.endsWith(translationMap.suffix)) {
      result = result.trim() + translationMap.suffix;
  }

  return result;
}

function updateCharacterCount() {
  const text = inputText.value;
  inputCount.textContent = text.length;
  
  // Enable/disable translate button based on input
  translateBtn.disabled = !text.trim();
}

function performTranslation() {
  const text = inputText.value;
  const fromGen = fromGenSelect.value;
  const toGen = toGenSelect.value;

  if (!text.trim()) {
      outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
      outputCount.textContent = '0';
      copyBtn.disabled = true;
      translateBtn.disabled = true;
      return;
  }

  const translated = translateText(text, fromGen, toGen);
  outputText.textContent = translated;
  outputCount.textContent = translated.length;
  copyBtn.disabled = false;
  
  // Visual feedback
  showToast('Message decoded! 🔍');
}

function updateBadges() {
  const fromGen = fromGenSelect.value;
  const toGen = toGenSelect.value;
  
  inputBadge.textContent = getGenerationLabel(fromGen);
  outputBadge.textContent = getGenerationLabel(toGen);
}

function swapGenerations() {
  const temp = fromGenSelect.value;
  fromGenSelect.value = toGenSelect.value;
  toGenSelect.value = temp;
  
  updateBadges();
  
  // Clear output when swapping since translation needs to be manual
  outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  outputCount.textContent = '0';
  copyBtn.disabled = true;
}

function clearInput() {
  inputText.value = '';
  outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  outputCount.textContent = '0';
  inputCount.textContent = '0';
  copyBtn.disabled = true;
  translateBtn.disabled = true;
  inputText.focus();
}

async function copyToClipboard() {
  const text = outputText.textContent;
  
  try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard! 📋');
  } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
          document.execCommand('copy');
          showToast('Copied to clipboard! 📋');
      } catch (err) {
          showToast('Failed to copy text', true);
      }
      
      document.body.removeChild(textArea);
  }
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.remove('hidden', 'hiding');
  
  if (isError) {
      toast.style.background = 'var(--color-danger)';
      toast.style.color = 'var(--color-text-primary)';
  } else {
      toast.style.background = 'var(--color-amber)';
      toast.style.color = 'var(--color-noir-black)';
  }
  
  setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => {
          toast.classList.add('hidden');
          toast.classList.remove('hiding');
      }, 250);
  }, 3000);
}

function loadExample(text, fromGen) {
  fromGenSelect.value = fromGen;
  inputText.value = text;
  updateBadges();
  updateCharacterCount();
  
  // Clear output - user needs to click translate
  outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  outputCount.textContent = '0';
  copyBtn.disabled = true;
  
  // Scroll to translator
  document.querySelector('.translator-section').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
  });
}

function toggleExamples() {
  const isHidden = examplesSection.classList.contains('hidden');
  
  if (isHidden) {
      examplesSection.classList.remove('hidden');
      toggleExamplesBtn.textContent = 'Hide Case Examples';
  } else {
      examplesSection.classList.add('hidden');
      toggleExamplesBtn.textContent = 'Show Case Examples';
  }
}

function openEmojiPicker(target) {
  currentEmojiTarget = target;
  emojiPicker.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Load default category
  loadEmojiCategory('smileys');
}

function closeEmojiPicker() {
  emojiPicker.classList.add('hidden');
  document.body.style.overflow = '';
  currentEmojiTarget = null;
}

function loadEmojiCategory(category) {
  const emojis = emojiData[category] || [];
  
  emojiGrid.innerHTML = '';
  
  emojis.forEach(emoji => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'emoji-btn-item';
      button.textContent = emoji;
      button.setAttribute('aria-label', `Insert ${emoji}`);
      button.addEventListener('click', () => insertEmoji(emoji));
      emojiGrid.appendChild(button);
  });
  
  // Update active category
  categoryBtns.forEach(btn => {
      if (btn.dataset.category === category) {
          btn.classList.add('active');
      } else {
          btn.classList.remove('active');
      }
  });
}

function insertEmoji(emoji) {
  if (currentEmojiTarget === 'input') {
      const start = inputText.selectionStart;
      const end = inputText.selectionEnd;
      const text = inputText.value;
      
      inputText.value = text.substring(0, start) + emoji + text.substring(end);
      
      // Set cursor position after emoji
      const newPosition = start + emoji.length;
      inputText.setSelectionRange(newPosition, newPosition);
      inputText.focus();
      
      updateCharacterCount();
  }
  
  closeEmojiPicker();
}

// Event Listeners
fromGenSelect.addEventListener('change', () => {
  updateBadges();
  // Clear output when changing generations - user needs to click translate
  outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  outputCount.textContent = '0';
  copyBtn.disabled = true;
});

toGenSelect.addEventListener('change', () => {
  updateBadges();
  // Clear output when changing generations - user needs to click translate
  outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  outputCount.textContent = '0';
  copyBtn.disabled = true;
});

swapButton.addEventListener('click', swapGenerations);

translateBtn.addEventListener('click', performTranslation);

inputText.addEventListener('input', updateCharacterCount);

copyBtn.addEventListener('click', copyToClipboard);

clearBtn.addEventListener('click', clearInput);

emojiBtn.addEventListener('click', () => openEmojiPicker('input'));

exampleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      const text = btn.dataset.text;
      const fromGen = btn.dataset.from;
      loadExample(text, fromGen);
  });
});

toggleExamplesBtn.addEventListener('click', toggleExamples);

closeEmojiPickerBtn.addEventListener('click', closeEmojiPicker);

emojiPickerBackdrop.addEventListener('click', closeEmojiPicker);

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      loadEmojiCategory(category);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Escape to close emoji picker
  if (e.key === 'Escape' && !emojiPicker.classList.contains('hidden')) {
      closeEmojiPicker();
  }
  
  // Ctrl/Cmd + K to open emoji picker (when focused on input)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k' && document.activeElement === inputText) {
      e.preventDefault();
      openEmojiPicker('input');
  }
  
  // Enter to translate (when focused on input and not empty)
  if (e.key === 'Enter' && document.activeElement === inputText && inputText.value.trim()) {
      e.preventDefault();
      performTranslation();
  }
});

// Initialize
updateBadges();
updateCharacterCount();
