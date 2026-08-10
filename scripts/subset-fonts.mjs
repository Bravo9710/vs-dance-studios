// One-off: subsets the vendored font files down to the characters this
// project's Bulgarian/English copy actually needs (full Cyrillic + Latin +
// digits + the punctuation used), instead of shipping the full default
// Cyrillic+Cyrillic-ext+Latin+Latin-ext charset. Re-run if new characters
// are ever needed in copy that this set doesn't cover.
import subsetFont from "subset-font";
import { readFile, writeFile } from "node:fs/promises";

const cyrillic = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯЍабвгдежзийклмнопрстуфхцчшщъьюяѝ";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const punctuation = " .,:;!?()–—-·→„“'\"%/#&";
const TEXT = cyrillic + latin + digits + punctuation;

const FILES = [
  "src/fonts/oswald/Oswald-Variable.woff2",
  "src/fonts/pt-sans/PTSans-Regular.woff2",
  "src/fonts/pt-sans/PTSans-Bold.woff2",
];

for (const file of FILES) {
  const original = await readFile(file);
  const subset = await subsetFont(original, TEXT, { targetFormat: "woff2" });
  await writeFile(file, subset);
  console.log(file, original.length, "->", subset.length, "bytes");
}
