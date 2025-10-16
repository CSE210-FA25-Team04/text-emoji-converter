import test from "node:test";
import assert from "node:assert/strict";
import { translateText } from "../source/front-end/app.js";

test("translateText uses local mapping when no API key", async () => {
  const input = "That is amazing 😂";
  const out = await translateText(input, "millennial", "genz");
  // The local map should swap 'amazing' -> 'bussin' and '😂' -> '💀'
  assert.ok(/bussin|💀/.test(out), `unexpected output: ${out}`);
});
