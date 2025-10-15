/**
 * Emoji Transformer!
 * Transforms text to emojis and emojis to text
 * 
 */

// -------------------------------------------
// Configuration & Constants
// -------------------------------------------

/**
 * Transform mode labels mapping
 * @const {Object}
 */
const TRANSFORM_LABELS = {
  'text-to-emoji': 'Text',
  'emoji-to-text': 'Emoji'
};

// -------------------------------------------
// Emoji Categories for Picker
// -------------------------------------------
const EMOJI_CATEGORIES = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
  gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  objects: ['💼', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '⏱️', '⏲️', '⏰'],
  symbols: ['💯', '🔥', '💫', '⭐', '🌟', '✨', '⚡', '💥', '💢', '💨', '💦', '💤', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️']
};

// -------------------------------------------
// DOM Element References
// -------------------------------------------
/**
 * Cached DOM elements for performance
 * @const {Object}
 */
const elements = {
  // Transform selectors
  transformModeSelect: document.getElementById('transform-mode'),
  swapButton: document.querySelector('.swap-button'),
  
  // Input/Output elements
  inputText: document.getElementById('input-text'),
  outputText: document.getElementById('output-text'),
  inputCount: document.getElementById('input-count'),
  outputCount: document.getElementById('output-count'),
  inputBadge: document.getElementById('input-badge'),
  outputBadge: document.getElementById('output-badge'),
  
  // Action buttons
  translateBtn: document.getElementById('translate-btn'),
  copyBtn: document.querySelector('.copy-btn'),
  clearBtns: document.querySelectorAll('.clear-btn'),
  emojiBtns: document.querySelectorAll('.emoji-btn'),
  
  // Examples
  exampleBtns: document.querySelectorAll('.example-btn'),
  toggleExamplesBtn: document.getElementById('toggle-examples'),
  examplesSection: document.getElementById('examples-section'),
  
  // Emoji picker
  emojiPicker: document.getElementById('emoji-picker'),
  emojiGrid: document.getElementById('emoji-grid'),
  categoryBtns: document.querySelectorAll('.category-btn'),
  emojiPickerClose: document.querySelector('.emoji-picker .close-btn'),
  emojiPickerBackdrop: document.querySelector('.emoji-picker-backdrop'),
  
  // Toast notification
  toast: document.getElementById('toast')
};

// -------------------------------------------
// Core Transform Functions
// -------------------------------------------

/**
 * Transforms text to emojis or emojis to text
 * 
 * @param {string} text - The input text to transform
 * @param {string} mode - Transform mode ('text-to-emoji' or 'emoji-to-text')
 * @returns {Promise<string>} - The transformed text
 */
async function transformText(text, mode) {
  if (!text || !text.trim()) return text.trim();

  try {
    // Try API first
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, mode })
    });

    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.log('API failed, using fallback:', error);
  }

  // Fallback to local transformation
  if (mode === 'text-to-emoji') {
    return textToEmoji(text);
  } else {
    return emojiToText(text);
  }
}

function textToEmoji(text) {
  const emojiMap = {
    'love': '❤️', 'heart': '❤️', 'like': '👍',
    'pizza': '🍕', 'coffee': '☕', 'tea': '🍵',
    'happy': '😊', 'sad': '😢', 'angry': '😠',
    'sun': '☀️', 'rain': '🌧️', 'snow': '❄️',
    'party': '🎉', 'cake': '🎂', 'balloon': '🎈',
    'car': '🚗', 'house': '🏠', 'tree': '🌳',
    'cat': '🐱', 'dog': '🐶', 'bird': '🐦',
    'fire': '🔥', 'water': '💧', 'star': '⭐',
    'music': '🎵', 'book': '📚', 'phone': '📱'
  };
  
  let result = text.toLowerCase();
  for (const [word, emoji] of Object.entries(emojiMap)) {
    result = result.replace(new RegExp(`\\b${word}\\b`, 'gi'), emoji);
  }
  return result;
}

function emojiToText(text) {
  const textMap = {
    '❤️': 'love', '👍': 'like', '🍕': 'pizza',
    '☕': 'coffee', '🍵': 'tea', '😊': 'happy',
    '😢': 'sad', '😠': 'angry', '☀️': 'sun',
    '🌧️': 'rain', '❄️': 'snow', '🎉': 'party',
    '🎂': 'cake', '🎈': 'balloon', '🚗': 'car',
    '🏠': 'house', '🌳': 'tree', '🐱': 'cat',
    '🐶': 'dog', '🐦': 'bird', '🔥': 'fire',
    '💧': 'water', '⭐': 'star', '🎵': 'music',
    '📚': 'book', '📱': 'phone'
  };
  
  let result = text;
  for (const [emoji, word] of Object.entries(textMap)) {
    result = result.replace(new RegExp(emoji, 'g'), word);
  }
  return result;
}

// -------------------------------------------
// Utility Functions
// -------------------------------------------
/**
 * Converts transform mode value to human-readable label
 * 
 * @param {string} value - Transform mode identifier
 * @returns {string} Human-readable label
 */
function getTransformLabel(value) {
  return TRANSFORM_LABELS[value] || value;
}


/**
 * Updates the transform badge labels in the UI
 * Reflects current selected transform mode in input/output sections
 */
function updateBadges() {
  const mode = elements.transformModeSelect.value;
  
  if (mode === 'text-to-emoji') {
    elements.inputBadge.textContent = 'Text';
    elements.outputBadge.textContent = 'Emoji';
  } else {
    elements.inputBadge.textContent = 'Emoji';
    elements.outputBadge.textContent = 'Text';
  }
}

/**
 * Updates character count displays for input and output
 * @param {string} target - Either 'input' or 'output'
 * @param {number} count - Character count to display
 */
function updateCharCount(target, count) {
  if (target === 'input') {
    elements.inputCount.textContent = count;
  } else if (target === 'output') {
    elements.outputCount.textContent = count;
  }
}

/**
 * Shows a toast notification to the user
 * @param {string} message - Message to display
 * @param {string} type - Toast type ('success', 'error', 'info')
 */
function showToast(message, type = 'info') {
  elements.toast.textContent = message;
  elements.toast.className = `toast ${type}`;
  elements.toast.classList.remove('hidden');
  
  setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 3000);
}

/**
 * Clears the specified text area and updates related UI
 * @param {string} target - Either 'input' or 'output'
 */
function clearText(target) {
  if (target === 'input') {
    elements.inputText.value = '';
    updateCharCount('input', 0);
  } else if (target === 'output') {
    elements.outputText.innerHTML = '<p class="empty-state">Your transformed message will appear here...</p>';
    updateCharCount('output', 0);
    elements.copyBtn.disabled = true;
  }
}

// -------------------------------------------
// Main Action Functions
// -------------------------------------------

/**
 * Performs the transformation operation
 * Takes input text and transforms it based on selected mode
 * Updates the output display with results
 */
async function performTransformation() {
  const inputText = elements.inputText.value.trim();
  
  if (!inputText) {
    showToast('Please enter some text to transform', 'error');
    return;
  }

  const mode = elements.transformModeSelect.value;
  
  // Show loading state
  elements.translateBtn.disabled = true;
  elements.outputText.innerHTML = '<p class="loading-state">Transforming...</p>';
  
  try {
    const result = await transformText(inputText, mode);
    
    // Display result
    elements.outputText.innerHTML = `<p>${result}</p>`;
    updateCharCount('output', result.length);
    elements.copyBtn.disabled = false;
    
    showToast('Transformation complete!', 'success');
    
  } catch (error) {
    console.error('Transformation failed:', error);
    elements.outputText.innerHTML = '<p class="error-state">Transformation failed. Please try again.</p>';
    showToast(error.message || 'Transformation failed', 'error');
  } finally {
    elements.translateBtn.disabled = false;
  }
}

/**
 * Swaps the transformation mode
 * Clears the output as the transformation direction has changed
 */
function swapTransformMode() {
  const currentMode = elements.transformModeSelect.value;
  const newMode = currentMode === 'text-to-emoji' ? 'emoji-to-text' : 'text-to-emoji';
  
  elements.transformModeSelect.value = newMode;
  updateBadges();
  
  // Clear output when changing mode - user must re-transform
  clearText('output');
  
  showToast('Transform mode swapped', 'info');
}

/**
 * Copies the output text to clipboard
 */
async function copyToClipboard() {
  const outputElement = elements.outputText.querySelector('p');
  if (!outputElement || outputElement.classList.contains('empty-state')) {
    showToast('No text to copy', 'error');
    return;
  }
  
  const textToCopy = outputElement.textContent;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast('Copied to clipboard!', 'success');
  } catch (error) {
    console.error('Copy failed:', error);
    showToast('Failed to copy text', 'error');
  }
}

// -------------------------------------------
// Example Functions
// -------------------------------------------

/**
 * Loads a pre-defined example into the input field
 * Sets the appropriate transform mode and prepares for transformation
 * 
 * @param {string} text - Example text to load
 * @param {string} mode - Transform mode for the example
 */
function loadExample(text, mode) {
  elements.inputText.value = text;
  elements.transformModeSelect.value = mode;
  
  updateCharCount('input', text.length);
  updateBadges();
  clearText('output');
  
  showToast('Example loaded', 'info');
}

/**
 * Toggles the visibility of the examples section
 */
function toggleExamples() {
  const isHidden = elements.examplesSection.classList.contains('hidden');
  
  if (isHidden) {
    elements.examplesSection.classList.remove('hidden');
    elements.toggleExamplesBtn.textContent = 'Hide Case Examples';
  } else {
    elements.examplesSection.classList.add('hidden');
    elements.toggleExamplesBtn.textContent = 'Show Case Examples';
  }
}

// -------------------------------------------
// Emoji Picker Functions
// -------------------------------------------

/**
 * Opens the emoji picker modal
 * @param {string} target - Target input field ('input' or 'output')
 */
function openEmojiPicker(target) {
  elements.emojiPicker.classList.remove('hidden');
  elements.emojiPicker.dataset.target = target;
  
  // Load default category
  loadEmojiCategory('smileys');
  
  // Focus management for accessibility
  elements.emojiPicker.focus();
}

/**
 * Closes the emoji picker modal
 */
function closeEmojiPicker() {
  elements.emojiPicker.classList.add('hidden');
  delete elements.emojiPicker.dataset.target;
}

/**
 * Loads emojis for a specific category into the picker grid
 * @param {string} category - Emoji category to load
 */
function loadEmojiCategory(category) {
  const emojis = EMOJI_CATEGORIES[category] || [];
  
  elements.emojiGrid.innerHTML = '';
  
  emojis.forEach(emoji => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'emoji-option';
    button.textContent = emoji;
    button.setAttribute('aria-label', `Insert ${emoji}`);
    button.addEventListener('click', () => insertEmoji(emoji));
    
    elements.emojiGrid.appendChild(button);
  });
  
  // Update active category button
  elements.categoryBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

/**
 * Inserts an emoji into the target input field
 * @param {string} emoji - Emoji to insert
 */
function insertEmoji(emoji) {
  const target = elements.emojiPicker.dataset.target;
  
  if (target === 'input') {
    const currentValue = elements.inputText.value;
    const newValue = currentValue + emoji;
    elements.inputText.value = newValue;
    updateCharCount('input', newValue.length);
    
    // Focus back to input
    elements.inputText.focus();
  }
  
  closeEmojiPicker();
  showToast(`${emoji} inserted`, 'success');
}

// -------------------------------------------
// Event Handlers
// -------------------------------------------

/**
 * Handler for transform mode selection changes
 * Resets output when user changes transformation parameters
 */
function handleTransformModeChange() {
  updateBadges();
  // Clear output when changing mode - user must re-transform
  clearText('output');
}

/**
 * Handler for input text changes
 * Updates character count as user types
 */
function handleInputChange() {
  const text = elements.inputText.value;
  updateCharCount('input', text.length);
}

/**
 * Handler for keyboard shortcuts
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
  // Ctrl/Cmd + Enter to transform
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    performTransformation();
  }
  
  // Escape to close emoji picker
  if (event.key === 'Escape' && !elements.emojiPicker.classList.contains('hidden')) {
    event.preventDefault();
    closeEmojiPicker();
  }
}

// -------------------------------------------
// Event Listeners Registration
// -------------------------------------------

/**
 * Registers all event listeners for the application
 * Called once during initialization
 */
function registerEventListeners() {
  // Transform mode selection changes
  elements.transformModeSelect.addEventListener('change', handleTransformModeChange);
  
  // Main action buttons
  elements.swapButton.addEventListener('click', swapTransformMode);
  elements.translateBtn.addEventListener('click', performTransformation);
  elements.copyBtn.addEventListener('click', copyToClipboard);
  
  // Input handling
  elements.inputText.addEventListener('input', handleInputChange);
  
  // Clear buttons
  elements.clearBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.clear-btn').dataset.target;
      clearText(target);
    });
  });
  
  // Emoji buttons
  elements.emojiBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.emoji-btn').dataset.target;
      openEmojiPicker(target);
    });
  });
  
  // Example buttons
  elements.exampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = e.target.dataset.text;
      const mode = e.target.dataset.mode;
      loadExample(text, mode);
    });
  });
  
  // Examples toggle
  elements.toggleExamplesBtn.addEventListener('click', toggleExamples);
  
  // Emoji picker events
  elements.emojiPickerClose.addEventListener('click', closeEmojiPicker);
  elements.emojiPickerBackdrop.addEventListener('click', closeEmojiPicker);
  
  // Emoji category buttons
  elements.categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.dataset.category;
      loadEmojiCategory(category);
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Prevent form submission on Enter in textarea
  elements.inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      performTransformation();
    }
  });
}

// -------------------------------------------
// Initialization
// -------------------------------------------

/**
 * Initializes the application
 * Sets up initial state and registers event listeners
 */
function initializeApp() {
  // Set initial UI state
  updateBadges();
  updateCharCount('input', 0);
  updateCharCount('output', 0);
  
  // Register all event listeners
  registerEventListeners();
  
  console.log('Emoji Transformer initialized successfully');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
