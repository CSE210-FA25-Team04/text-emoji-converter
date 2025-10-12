/**
 * Family Language Detective!
 * Translate text between Genz <-> Boomer!
 */

'use strict';

// -----------------------------------------
// Constants
// -----------------------------------------

/** @const {string[]} Available emoji set for picker */
const EMOJI_SET = [
  '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
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
  '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃'
];

/** @const {number} Duration for temporary button state feedback (ms) */
const BUTTON_FEEDBACK_DURATION = 1400;

/** @const {string} Initial placeholder message for output */
const PLACEHOLDER_INITIAL = 'No translation yet — decode a message.';

/** @const {string} Empty input warning message */
const PLACEHOLDER_EMPTY_INPUT = 'Enter a message to decode.';

/** @const {string} Missing generation selection warning */
const PLACEHOLDER_MISSING_SELECTION = "Select both a 'From' and 'To' generation above.";

// -----------------------------------------
// UTILITY FUNCTIONS
// -----------------------------------------

/**
 * Escapes HTML special characters to prevent XSS attacks.

 * @param {string} str - Raw string that may contain HTML
 * @returns {string} Sanitized string safe for innerHTML
 * @security Critical for preventing injection attacks
 * 
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert("xss")&lt;/script&gt;'
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Translates text between generational communication styles.
 * 
 * @param {string} text - Input text to translate
 * @param {string} fromGen - Source generation identifier ('genz', 'boomer', etc.)
 * @param {string} toGen - Target generation identifier
 * @returns {string} Translated text
 * 
 * @todo Implement llm translation
 * @note Currently serves as passthrough
 */
function translateBetween(text, fromGen, toGen) {
  // Backend people should work with this!
  return text;
}

/**
 * Formats generation identifier strings for display.
 * Applies proper capitalization with special case handling for
 * compound identifiers (e.g., 'genz' -> 'Gen Z').
 * 
 * @param {string} s - Raw generation identifier
 * @returns {string} Display-ready formatted string
 * 
 * @example
 * capitalize('boomer') // Returns: 'Boomer'
 * capitalize('genz')   // Returns: 'Gen Z'
 */
function capitalize(s) {
  if (!s) return s;
  
  // Special case: Gen Z requires space separation
  if (s.toLowerCase() === 'genz') return 'Gen Z';
  
  // Standard title case transformation
  return s[0].toUpperCase() + s.slice(1);
}

// -----------------------------------------
// EMOJI PICKER MODULE
// -----------------------------------------

/**
 * Creates and manages the emoji picker interface.
 * 
 * @param {HTMLTextAreaElement} textInput - Target textarea for emoji insertion
 * @returns {HTMLElement} Configured emoji picker element
 */
function createEmojiPicker(textInput) {
  const picker = document.createElement('div');
  picker.id = 'emoji-picker';
  picker.style.cssText = `
    position: absolute;
    background: #1c1c2b;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.8rem;
    padding: 1rem;
    display: none;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.3rem;
    max-width: 400px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 0.8rem 2.2rem rgba(6,6,12,0.45);
    z-index: 1000;
  `;
  
  // Generate emoji button grid
  EMOJI_SET.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.type = 'button';
    btn.style.cssText = `
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0.3rem;
      border-radius: 0.4rem;
      background: rgba(255,255,255,0.05);
      border: none;
      transition: background 0.2s;
    `;
    
    // Hover effect handlers
    btn.addEventListener('mouseover', () => {
      btn.style.background = 'rgba(181,126,220,0.3)';
    });
    
    btn.addEventListener('mouseout', () => {
      btn.style.background = 'rgba(255,255,255,0.05)';
    });
    
    // Emoji insertion handler
    btn.addEventListener('click', () => {
      const start = textInput.selectionStart || textInput.value.length;
      const end = textInput.selectionEnd || textInput.value.length;
      const value = textInput.value;
      
      // Insert emoji at cursor position
      textInput.value = value.slice(0, start) + emoji + value.slice(end);
      
      // Reposition cursor after inserted emoji
      const newPosition = start + emoji.length;
      textInput.setSelectionRange(newPosition, newPosition);
      textInput.focus();
    });
    
    picker.appendChild(btn);
  });
  
  document.body.appendChild(picker);
  return picker;
}

// -----------------------------------------
// MAIN APPLICATION
// -----------------------------------------

/**
 * Initializes application.
 * Sets up event handlers, state management, and UI synchronization.
 */
document.addEventListener('DOMContentLoaded', function() {
  
  // -----------------------------------------
  // DOM References
  // -----------------------------------------
  
  const cards = Array.from(document.querySelectorAll('.card'));
  const selectedFromLabel = document.getElementById('selected-from');
  const selectedToLabel = document.getElementById('selected-to');
  const fromBadge = document.getElementById('from-badge');
  const toBadge = document.getElementById('to-badge');
  const emojiBtn = document.getElementById('emoji-btn');
  const textInput = document.getElementById('text-input');
  const translatorForm = document.getElementById('translator-form');
  const outputEl = document.getElementById('emoji-output');
  const directTranslate = document.getElementById('direct-translate');
  const copyBtn = document.getElementById('copy-btn');
  const clearBtn = document.getElementById('clear-btn');
  const swapBtn = document.getElementById('swap-btn');
  
  // Emoji picker instance (lazy initialized)
  let emojiPicker = null;

  // -----------------------------------------
  // APPLICATION STATE
  // -----------------------------------------
  
  /**
   * @type {string|null} Source generation identifier
   * @invariant fromGen !== toGen when both are non-null
   */
  let fromGen = null;
  
  /**
   * @type {string|null} Target generation identifier
   * @invariant toGen !== fromGen when both are non-null
   */
  let toGen = null;

  // -----------------------------------------
  // VIEW LAYER - UI State Management
  // -----------------------------------------

  /**
   * Synchronizes DOM with application state.
   * 
   * @sideEffect Modifies DOM attributes and text content
   */
  function updateSelectionVisuals() {
    // Update card selection indicators
    cards.forEach((card) => {
      const gen = card.dataset.gen;
      card.removeAttribute('data-selected-from');
      card.removeAttribute('data-selected-to');
      
      if (fromGen === gen) {
        card.setAttribute('data-selected-from', 'true');
      }
      if (toGen === gen) {
        card.setAttribute('data-selected-to', 'true');
      }
    });

    // Update text labels with formatted generation names
    selectedFromLabel.textContent = fromGen ? capitalize(fromGen) : '—';
    selectedToLabel.textContent = toGen ? capitalize(toGen) : '—';
    fromBadge.textContent = fromGen ? capitalize(fromGen) : '—';
    toBadge.textContent = toGen ? capitalize(toGen) : '—';
  }

  /**
   * Renders content to output container.
   * 
   * 
   * @param {string|*} htmlOrText - Content to render
   * @security Caller must ensure HTML content is sanitized via escapeHtml()
   */
  function setOutput(htmlOrText) {
    if (typeof htmlOrText === 'string') {
      outputEl.innerHTML = htmlOrText;
    } else {
      outputEl.textContent = htmlOrText;
    }
  }

  // -----------------------------------------
  // EMOJI PICKER INTEGRATION
  // -----------------------------------------

  /**
   * Toggles emoji picker visibility with proper positioning.
   * Lazy initializes picker on first use.
   */
  emojiBtn.addEventListener('click', (e) => {
    // Lazy initialization
    if (!emojiPicker) {
      emojiPicker = createEmojiPicker(textInput);
    }
    
    // Toggle visibility
    if (emojiPicker.style.display === 'grid') {
      emojiPicker.style.display = 'none';
    } else {
      // Position relative to trigger button
      const rect = emojiBtn.getBoundingClientRect();
      emojiPicker.style.display = 'grid';
      emojiPicker.style.left = rect.left + 'px';
      emojiPicker.style.top = (rect.bottom + 5) + 'px';
    }
    
    e.stopPropagation();
  });
  
  /**
   * Closes emoji picker when clicking outside.
   * Implements click-away behavior pattern.
   */
  document.addEventListener('click', (e) => {
    if (emojiPicker && 
        !emojiPicker.contains(e.target) && 
        e.target !== emojiBtn) {
      emojiPicker.style.display = 'none';
    }
  });

  // -----------------------------------------
  // EVENT HANDLERS - Generation Selection
  // -----------------------------------------

  /**
   * Binds selection handlers to generation cards.
   * Implements toggle behavior with mutual exclusion constraint.
   */
  cards.forEach((card) => {
    const gen = card.dataset.gen;
    const btnFrom = card.querySelector('.set-from');
    const btnTo = card.querySelector('.set-to');

    /**
     * Handles source generation selection.
     * Maintains invariant: fromGen !== toGen
     */
    btnFrom.addEventListener('click', () => {
      // Toggle: deselect if already selected
      fromGen = fromGen === gen ? null : gen;
      
      // Enforce mutual exclusion
      if (fromGen && toGen === fromGen) {
        toGen = null;
      }
      
      updateSelectionVisuals();
    });

    /**
     * Handles target generation selection.
     * Maintains invariant: toGen !== fromGen
     */
    btnTo.addEventListener('click', () => {
      // Toggle: deselect if already selected
      toGen = toGen === gen ? null : gen;
      
      // Enforce mutual exclusion
      if (toGen && fromGen === toGen) {
        fromGen = null;
      }
      
      updateSelectionVisuals();
    });
  });

  // -----------------------------------------
  // TRANSLATION PIPELINE
  // -----------------------------------------

  /**
   * translation workflow.
   * 
   * 
   * @sideEffect Updates output display with translation or error message
   */
  function runTranslate() {
    const raw = (textInput.value || '').trim();
    
    // Guard: require non-empty input
    if (!raw) {
      setOutput(`<p class='placeholder'>${PLACEHOLDER_EMPTY_INPUT}</p>`);
      return;
    }
    
    // Guard: require both generations selected
    if (!fromGen || !toGen) {
      setOutput(`<p class='placeholder'>${PLACEHOLDER_MISSING_SELECTION}</p>`);
      return;
    }

    // Execute translation and sanitize for XSS protection
    const translated = translateBetween(raw, fromGen, toGen);
    setOutput(escapeHtml(translated));
  }

  // Bind translation triggers
  translatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    runTranslate();
  });

  directTranslate.addEventListener('click', runTranslate);

  // -----------------------------------------
  // OUTPUT CONTROLS - Copy/Clear/Swap Actions
  // -----------------------------------------

  /**
   * Copies translation result to system clipboard.
   * 
   * @async
   * @requires navigator.clipboard - Secure context needed
   */
  copyBtn.addEventListener('click', async () => {
    const text = outputEl.textContent.trim();
    
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      
      // Success feedback with auto-revert
      copyBtn.textContent = '✅ Copied';
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy';
      }, BUTTON_FEEDBACK_DURATION);
    } catch (error) {
      // Failure feedback (clipboard unavailable or permission denied)
      copyBtn.textContent = '✖️ Failed';
      setTimeout(() => {
        copyBtn.textContent = '📋 Copy';
      }, BUTTON_FEEDBACK_DURATION);
    }
  });

  /**
   * Resets input and output to initial state.
   * Returns focus to input for immediate reuse.
   */
  clearBtn.addEventListener('click', () => {
    textInput.value = '';
    setOutput(`<p class='placeholder'>${PLACEHOLDER_INITIAL}</p>`);
    textInput.focus();
  });

  /**
   * Swaps source and target generation selections.
   * Enables quick bidirectional translation testing.
   * 
   * @sideEffect Updates fromGen and toGen state
   * @sideEffect Triggers UI update via updateSelectionVisuals()
   */
  swapBtn.addEventListener('click', () => {
    [fromGen, toGen] = [toGen, fromGen];
    updateSelectionVisuals();
  });

  // -----------------------------------------
  // INITIALIZATION
  // -----------------------------------------

  // Bootstrap UI with initial state
  updateSelectionVisuals();
  setOutput(`<p class='placeholder'>${PLACEHOLDER_INITIAL}</p>`);
});