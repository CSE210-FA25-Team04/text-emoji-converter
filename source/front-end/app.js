/**
 * Emoji Transformer!
 * Transforms text to emojis and emojis to text
 *
 */

"use strict";

// -------------------------------------------
// Different Configuration and Data
// -------------------------------------------

/**
 * Emoji data organized by categories for the emoji picker
 * @const {Object}
 */
const emojiData = {
  smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "😦",
    "😧",
    "😨",
    "😰",
    "😥",
    "😢",
    "😭",
    "😱",
    "😖",
    "😣",
    "😞",
    "😓",
    "😩",
    "😫",
    "🥱",
    "😤",
    "😡",
    "😠",
    "🤬",
    "💀",
    "☠️",
  ],
  gestures: [
    "👋",
    "🤚",
    "🖐",
    "✋",
    "🖖",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👍",
    "👎",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "👏",
    "🙌",
    "👐",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💅",
    "🤳",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "👂",
    "🦻",
    "👃",
    "🧠",
    "🦷",
    "🦴",
    "👀",
    "👁",
    "👅",
    "👄",
  ],
  objects: [
    "💼",
    "📁",
    "📂",
    "📅",
    "📆",
    "📇",
    "📈",
    "📉",
    "📊",
    "📋",
    "📌",
    "📍",
    "📎",
    "📏",
    "📐",
    "✂️",
    "🗃",
    "🗄",
    "🗑",
    "🔒",
    "🔓",
    "🔏",
    "🔐",
    "🔑",
    "🗝",
    "🔨",
    "🪓",
    "⛏",
    "⚒",
    "🛠",
    "🗡",
    "⚔️",
    "🔫",
    "🏹",
    "🛡",
    "🔧",
    "🔩",
    "⚙️",
    "🗜",
    "⚖️",
    "🦯",
    "🔗",
    "⛓",
    "🧰",
    "🧲",
    "📱",
    "💻",
    "⌨️",
    "🖥",
    "🖨",
    "🖱",
    "🖲",
    "💽",
    "💾",
    "💿",
    "📀",
    "🧮",
    "🎥",
    "🎬",
    "📷",
    "📸",
    "📹",
    "📼",
    "🔍",
    "🔎",
    "🕯",
    "💡",
    "🔦",
    "🏮",
    "📔",
    "📕",
    "📖",
    "📗",
    "📘",
    "📙",
    "📚",
    "📓",
    "📒",
    "📃",
    "📜",
    "📄",
    "📰",
    "🗞",
    "📑",
    "🔖",
    "🏷",
  ],
  symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉",
    "☸️",
    "✡️",
    "🔯",
    "🕎",
    "☯️",
    "☦️",
    "🛐",
    "⛎",
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
    "🆔",
    "⚛️",
    "🉑",
    "☢️",
    "☣️",
    "📴",
    "📳",
    "🈶",
    "🈚",
    "🈸",
    "🈺",
    "🈷️",
    "✴️",
    "🆚",
    "💮",
    "🉐",
    "㊙️",
    "㊗️",
    "🈴",
    "🈵",
    "🈹",
    "🈲",
    "🅰️",
    "🅱️",
    "🆎",
    "🆑",
    "🅾️",
    "🆘",
    "❌",
    "⭕",
    "🛑",
    "⛔",
    "📛",
    "🚫",
    "💯",
    "💢",
    "♨️",
    "🚷",
    "🚯",
    "🚳",
    "🚱",
    "🔞",
    "📵",
    "🚭",
    "❗",
    "❕",
    "❓",
    "❔",
    "‼️",
    "⁉️",
    "🔅",
    "🔆",
    "〽️",
    "⚠️",
    "🚸",
    "🔱",
    "⚜️",
    "🔰",
    "♻️",
    "✅",
    "🈯",
    "💹",
    "❇️",
    "✳️",
    "❎",
    "🌐",
    "💠",
    "🔠",
    "🔡",
    "🔢",
    "🔣",
    "🔤",
    "🆗",
    "🆙",
    "🆒",
    "🆕",
    "🆓",
    "🔟",
    "🔴",
    "🟠",
    "🟡",
    "🟢",
    "🔵",
    "🟣",
    "⚫",
    "⚪",
    "🟤",
    "🔺",
    "🔻",
    "🔸",
    "🔹",
    "🔶",
    "🔷",
    "🔳",
    "🔲",
    "▪️",
    "▫️",
    "◾",
    "◽",
    "◼️",
    "◻️",
    "🟥",
    "🟧",
    "🟨",
    "🟩",
    "🟦",
    "🟪",
    "⬛",
    "⬜",
    "🟫",
  ],
};

/**
 * Transform mode display labels mapping
 * @const {Object}
 */
const TRANSFORM_MODE_LABELS = {
  "text-to-emoji": "Text",
  "emoji-to-text": "Emoji",
};

/**
 * Toast notification duration in milliseconds
 * @const {number}
 */
const TOAST_DURATION = 3000;
/**
 * Toast hide animation duration in milliseconds
 * @const {number}
 */
const TOAST_HIDE_DURATION = 250;

// -------------------------------------------
// Application State
// -------------------------------------------

/**
 * Application state object
 * Tracks the current emoji picker target
 */
const state = {
  /** @type {string|null} Current target for emoji insertion ('input' or null) */
  currentEmojiTarget: null,
};

// -------------------------------------------
// DOM Elements
// -------------------------------------------
/**
 * Cache all DOM elements on initialization to avoid repeated queries
 * @const {Object}
 */
const elements =
  typeof document !== "undefined"
    ? {
        // Transform mode selector
        transformModeSelect: document.getElementById("transform-mode"),
        swapButton: document.querySelector(".swap-button"),

        // Main interaction elements
        translateBtn: document.getElementById("translate-btn"),
        inputText: document.getElementById("input-text"),
        outputText: document.getElementById("output-text"),

        // Badges
        inputBadge: document.getElementById("input-badge"),
        outputBadge: document.getElementById("output-badge"),

        // Character counters
        inputCount: document.getElementById("input-count"),
        outputCount: document.getElementById("output-count"),

        // Action buttons
        copyBtn: document.querySelector(".copy-btn"),
        clearBtn: document.querySelector(".clear-btn"),
        emojiBtn: document.querySelector(".emoji-btn"),

        // Example functionality
        exampleBtns: document.querySelectorAll(".example-btn"),
        toggleExamplesBtn: document.getElementById("toggle-examples"),
        examplesSection: document.getElementById("examples-section"),

        // Emoji picker elements
        emojiPicker: document.getElementById("emoji-picker"),
        emojiGrid: document.getElementById("emoji-grid"),
        categoryBtns: document.querySelectorAll(".category-btn"),
        closeEmojiPickerBtn: document.querySelector(".close-btn"),
        emojiPickerBackdrop: document.querySelector(".emoji-picker-backdrop"),

        // Toast notification
        toast: document.getElementById("toast"),
      }
    : {};

// -------------------------------------------
// Utility Functions
// -------------------------------------------
/**
 * Converts transform mode value to human-readable label
 *
 * @param {string} value - Transform mode identifier ('text-to-emoji' or 'emoji-to-text')
 * @returns {string} Human-readable label
 */
function getTransformModeLabel(value) {
  return TRANSFORM_MODE_LABELS[value] || value;
}

// Export functions for unit testing and external usage.
// When this file is included in a browser via <script>, these exports
// are harmless because they only exist in module contexts.
export { getTransformModeLabel };

/**
 * Updates the transform mode badge labels in the UI
 * Reflects current selected transform mode in input/output sections
 */
function updateBadges() {
  const mode = elements.transformModeSelect.value;

  if (mode === "text-to-emoji") {
    elements.inputBadge.textContent = "Text";
    elements.outputBadge.textContent = "Emoji";
  } else {
    elements.inputBadge.textContent = "Emoji";
    elements.outputBadge.textContent = "Text";
  }
}

/**
 * Updates the character count display for input text
 * Also manages translate button state based on input presence
 */
function updateCharacterCount() {
  const text = elements.inputText.value;
  elements.inputCount.textContent = text.length;

  // Enable translate button only when there's text to translate
  elements.translateBtn.disabled = !text.trim();
}

/**
 * Displays a temporary toast notification
 * Automatically hides after TOAST_DURATION milliseconds
 *
 * @param {string} message - Message to display in the toast
 * @param {boolean} [isError=false] - Whether this is an error message
 */
function showToast(message, isError) {
  if (isError === undefined) isError = false;

  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden", "hiding");

  // Set toast styling based on message type
  if (isError) {
    elements.toast.style.background = "var(--color-danger)";
    elements.toast.style.color = "var(--color-text-primary)";
  } else {
    elements.toast.style.background = "var(--color-amber)";
    elements.toast.style.color = "var(--color-noir-black)";
  }

  // Auto-hide toast after duration
  setTimeout(function () {
    elements.toast.classList.add("hiding");
    setTimeout(function () {
      elements.toast.classList.add("hidden");
      elements.toast.classList.remove("hiding");
    }, TOAST_HIDE_DURATION);
  }, TOAST_DURATION);
}

/**
 * Smoothly scrolls to the translator section
 * Used when loading examples to focus user attention
 */
function scrollToTranslator() {
  const translatorSection = document.querySelector(".translator-section");
  if (translatorSection) {
    translatorSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// -------------------------------------------
// Operations for Translation
// -------------------------------------------

/**
 * Transforms text using the backend API
 * @param {string} text - Text to transform
 * @param {string} mode - Transform mode ('text-to-emoji' or 'emoji-to-text')
 * @returns {Promise<string>} Transformed text
 */
async function transformText(text, mode) {
  const response = await fetch("/api/transform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, mode }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}

/**
 * Performs the transformation operation
 * Takes input text and transforms it between text and emoji formats
 * Updates the output display with results
 */
async function performTranslation() {
  const text = elements.inputText.value;
  const mode = elements.transformModeSelect.value;

  // Handle empty input case
  if (!text.trim()) {
    elements.outputText.innerHTML =
      '<p class="empty-state">Your transformed message will appear here...</p>';
    elements.outputCount.textContent = "0";
    elements.copyBtn.disabled = true;
    elements.translateBtn.disabled = true;
    return;
  }

  // Perform transformation
  try {
    const transformed = await transformText(text, mode);
    elements.outputText.textContent = transformed;
    elements.outputCount.textContent = transformed.length;
    elements.copyBtn.disabled = false;
    showToast("Message transformed! 🔍");
  } catch (err) {
    console.error("Transformation failed:", err);
    showToast("Transformation failed", true);
  }
}

/**
 * Swaps the transformation mode between text-to-emoji and emoji-to-text
 * Clears the output as the transformation direction has changed
 */
function swapOption() {
  const currentMode = elements.transformModeSelect.value;
  const newMode =
    currentMode === "text-to-emoji" ? "emoji-to-text" : "text-to-emoji";
  elements.transformModeSelect.value = newMode;

  updateBadges();

  // Clear output since transformation direction changed
  elements.outputText.innerHTML =
    '<p class="empty-state">Your transformed message will appear here...</p>';
  elements.outputCount.textContent = "0";
  elements.copyBtn.disabled = true;
}

/**
 * Clears all input and output fields
 * Resets the application to initial state
 */
function clearInput() {
  elements.inputText.value = "";
  elements.outputText.innerHTML =
    '<p class="empty-state">Your transformed message will appear here...</p>';
  elements.outputCount.textContent = "0";
  elements.inputCount.textContent = "0";
  elements.copyBtn.disabled = true;
  elements.translateBtn.disabled = true;
  elements.inputText.focus();
}

// -------------------------------------------
// Clipboard Operation
// -------------------------------------------
/**
 * Copies the translated output text to the system clipboard
 * Falls back to legacy execCommand for older browsers
 * Provides user feedback via toast notification
 *
 * @returns {Promise<void>}
 */
function copyToClipboard() {
  const text = elements.outputText.textContent;

  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        showToast("Copied to clipboard!");
      })
      .catch(function (err) {
        console.error("Clipboard write failed:", err);
        fallbackCopy(text);
      });
  } else {
    // Fallback for older browsers
    fallbackCopy(text);
  }
}

/**
 * Fallback clipboard copy implementation using execCommand
 * Used when modern Clipboard API is not available
 *
 * @param {string} text - Text to copy to clipboard
 */
function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
    showToast("Copied to clipboard! 📋");
  } catch (err) {
    console.error("Fallback copy failed:", err);
    showToast("Failed to copy text", true);
  }

  document.body.removeChild(textArea);
}

// -------------------------------------------
// Example Functionality
// -------------------------------------------
/**
 * Loads a pre-defined example into the input field
 * Sets the appropriate transform mode and prepares for transformation
 *
 * @param {string} text - Example text to load
 * @param {string} mode - Transform mode for the example
 */
function loadExample(text, mode) {
  elements.transformModeSelect.value = mode;
  elements.inputText.value = text;
  updateBadges();
  updateCharacterCount();

  // Clear output - user needs to click transform button
  elements.outputText.innerHTML =
    '<p class="empty-state">Your transformed message will appear here...</p>';
  elements.outputCount.textContent = "0";
  elements.copyBtn.disabled = true;

  // Scroll to translator for better UX
  scrollToTranslator();
}

/**
 * Toggles the visibility of the examples section
 * Updates button text to reflect current state
 */
function toggleExamples() {
  const isHidden = elements.examplesSection.classList.contains("hidden");

  if (isHidden) {
    elements.examplesSection.classList.remove("hidden");
    elements.toggleExamplesBtn.textContent = "Hide Case Examples";
  } else {
    elements.examplesSection.classList.add("hidden");
    elements.toggleExamplesBtn.textContent = "Show Case Examples";
  }
}

// -------------------------------------------
// Emoji Picker Functionality
// -------------------------------------------
/**
 * Opens the emoji picker modal
 * Sets the target for emoji insertion and loads default category
 *
 * @param {string} target - Target identifier for emoji insertion ('input')
 */
function openEmojiPicker(target) {
  state.currentEmojiTarget = target;
  elements.emojiPicker.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Load default emoji category
  loadEmojiCategory("smileys");
}

/**
 * Closes the emoji picker modal
 * Restores body scroll and clears the insertion target
 */
function closeEmojiPicker() {
  elements.emojiPicker.classList.add("hidden");
  document.body.style.overflow = "";
  state.currentEmojiTarget = null;
}

/**
 * Loads and displays emojis for a specific category
 * Renders emoji buttons in the grid and updates active category indicator
 *
 * @param {string} category - Category name ('smileys', 'gestures', 'objects', 'symbols')
 */
function loadEmojiCategory(category) {
  const emojis = emojiData[category] || [];

  // Clear existing emoji grid
  elements.emojiGrid.innerHTML = "";

  // Create button for each emoji in category
  emojis.forEach(function (emoji) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "emoji-btn-item";
    button.textContent = emoji;
    button.setAttribute("aria-label", "Insert " + emoji);

    // Bind click handler for emoji insertion
    button.addEventListener("click", function () {
      insertEmoji(emoji);
    });

    elements.emojiGrid.appendChild(button);
  });

  // Update active category button styling
  elements.categoryBtns.forEach(function (btn) {
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * Inserts an emoji at the current cursor position in the input field
 * Maintains cursor position after insertion and updates character count
 *
 * @param {string} emoji - Emoji character to insert
 */
function insertEmoji(emoji) {
  if (state.currentEmojiTarget === "input") {
    const start = elements.inputText.selectionStart;
    const end = elements.inputText.selectionEnd;
    const text = elements.inputText.value;

    // Insert emoji at cursor position
    elements.inputText.value =
      text.substring(0, start) + emoji + text.substring(end);

    // Set cursor position after inserted emoji
    const newPosition = start + emoji.length;
    elements.inputText.setSelectionRange(newPosition, newPosition);
    elements.inputText.focus();

    updateCharacterCount();
  }

  closeEmojiPicker();
}

// -------------------------------------------
// Event Handlers
// -------------------------------------------
/**
 * Handler for transform mode selection changes
 * Resets output when user changes transformation parameters
 */
function handleOptionChange() {
  updateBadges();
  // Clear output when changing modes - user must re-transform
  elements.outputText.innerHTML =
    '<p class="empty-state">Your transformed message will appear here...</p>';
  elements.outputCount.textContent = "0";
  elements.copyBtn.disabled = true;
}

/**
 * Handler for example button clicks
 * Extracts example data and loads it into the application
 *
 * @param {Event} event - Click event
 */
function handleExampleClick(event) {
  const button = event.currentTarget;
  const text = button.dataset.text;
  const mode = button.dataset.mode;

  if (text && mode) {
    loadExample(text, mode);
  }
}

/**
 * Handler for category button clicks in emoji picker
 * Loads the selected emoji category
 *
 * @param {Event} event - Click event
 */
function handleCategoryClick(event) {
  const button = event.currentTarget;
  const category = button.dataset.category;

  if (category) {
    loadEmojiCategory(category);
  }
}

/**
 * Global keyboard event handler
 * Implements keyboard shortcuts for improved accessibility
 *
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
  // Escape key: Close emoji picker
  if (
    event.key === "Escape" &&
    !elements.emojiPicker.classList.contains("hidden")
  ) {
    closeEmojiPicker();
    return;
  }

  // Ctrl/Cmd + K: Open emoji picker (when focused on input)
  if (
    (event.ctrlKey || event.metaKey) &&
    event.key === "k" &&
    document.activeElement === elements.inputText
  ) {
    event.preventDefault();
    openEmojiPicker("input");
    return;
  }

  // Enter key: Translate (when focused on input with text)
  if (
    event.key === "Enter" &&
    document.activeElement === elements.inputText &&
    elements.inputText.value.trim()
  ) {
    event.preventDefault();
    performTranslation();
    return;
  }
}

// -------------------------------------------
// An Event Listener
// -------------------------------------------
/**
 * Registers all event listeners for the application
 */
function registerEventListeners() {
  // Transform mode selection changes
  elements.transformModeSelect.addEventListener("change", handleOptionChange);

  // Main action buttons
  elements.swapButton.addEventListener("click", swapOption);
  elements.translateBtn.addEventListener("click", performTranslation);
  elements.copyBtn.addEventListener("click", copyToClipboard);
  elements.clearBtn.addEventListener("click", clearInput);

  // Input field changes
  elements.inputText.addEventListener("input", updateCharacterCount);

  // Emoji picker controls
  elements.emojiBtn.addEventListener("click", function () {
    openEmojiPicker("input");
  });
  elements.closeEmojiPickerBtn.addEventListener("click", closeEmojiPicker);
  elements.emojiPickerBackdrop.addEventListener("click", closeEmojiPicker);

  // Emoji category buttons
  elements.categoryBtns.forEach(function (btn) {
    btn.addEventListener("click", handleCategoryClick);
  });

  // Example functionality
  elements.exampleBtns.forEach(function (btn) {
    btn.addEventListener("click", handleExampleClick);
  });
  elements.toggleExamplesBtn.addEventListener("click", toggleExamples);

  // Global keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

// -------------------------------------------
// Main Initialization
// -------------------------------------------
/**
 * Initializes the application
 * Sets up initial UI state and registers all event listeners
 * Called when DOM is fully loaded
 */
function initializeApp() {
  // Validate that all required elements exist
  const requiredElements = [
    "transformModeSelect",
    "swapButton",
    "translateBtn",
    "inputText",
    "outputText",
    "inputBadge",
    "outputBadge",
    "inputCount",
    "outputCount",
    "copyBtn",
    "clearBtn",
    "emojiBtn",
    "toggleExamplesBtn",
    "examplesSection",
    "emojiPicker",
    "emojiGrid",
    "closeEmojiPickerBtn",
    "emojiPickerBackdrop",
    "toast",
  ];

  const missingElements = requiredElements.filter(function (key) {
    return !elements[key];
  });

  if (missingElements.length > 0) {
    console.error("Missing required DOM elements:", missingElements);
    return;
  }

  // Set initial UI state
  updateBadges();
  updateCharacterCount();

  // Register all event listeners
  registerEventListeners();

  console.log("Emoji Transformer initialized successfully");
}

// -------------------------------------------
// Entry Point
// -------------------------------------------
/**
 * Entry point - Initialize app when DOM is ready
 * Uses DOMContentLoaded to ensure all elements are available
 */
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    // DOM is already loaded
    initializeApp();
  }
}
