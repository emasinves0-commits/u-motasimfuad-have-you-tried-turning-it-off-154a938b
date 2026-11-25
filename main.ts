// Have You Tried Turning It Off? — one funny tech-support line.
// The entry is a single line a hopeless support agent says to a desperate
// customer. Gate (RULES.txt): /output/entry.txt must be UTF-8 text of
// 1 to 199 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I see the issue, but to run the diagnostic tool, you'll need to log into the account that's currently locked out by the diagnostic tool.";

const MIN_CHARS = 1;
const MAX_CHARS = 199;
const OUTPUT_PATH = "/output/entry.txt";

// Returns the entry's character count so the caller can report it;
// throws when the gate (1-199 chars, not only whitespace) fails.
function validateEntry(text: string): number {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, gate needs ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return chars;
}

function main(): void {
  const chars = validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  console.log(`wrote ${OUTPUT_PATH} (${chars} chars)`);
}

main();
