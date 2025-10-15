import { translateText } from "./translateText.js";

(async () => {
  const result = await translateText("Hello, how are you doing today?", "boomer", "genz");
  console.log("Translated:", result);
})();
