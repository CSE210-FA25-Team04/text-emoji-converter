import test from "node:test";
import assert from "node:assert/strict";
import { getTransformModeLabel } from "../source/front-end/app.js";

test("getTransformModeLabel returns human-readable labels", () => {
  assert.strictEqual(getTransformModeLabel("text-to-emoji"), "Text");
  assert.strictEqual(getTransformModeLabel("emoji-to-text"), "Emoji");
  assert.strictEqual(getTransformModeLabel("unknown"), "unknown");
});
