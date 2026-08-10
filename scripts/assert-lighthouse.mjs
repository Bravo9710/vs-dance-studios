// Fails the process if a Lighthouse JSON report's Performance or
// Accessibility score drops below the threshold enforced locally and in CI.
import { readFileSync } from "node:fs";

const THRESHOLD = 95;
const [, , reportPath] = process.argv;
if (!reportPath) {
  console.error("Usage: node scripts/assert-lighthouse.mjs <report.json>");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const scores = {
  performance: Math.round(report.categories.performance.score * 100),
  accessibility: Math.round(report.categories.accessibility.score * 100),
};

console.log(`Lighthouse — Performance: ${scores.performance}, Accessibility: ${scores.accessibility}`);

const failing = Object.entries(scores).filter(([, score]) => score < THRESHOLD);
if (failing.length > 0) {
  for (const [category, score] of failing) {
    console.error(`✗ ${category} scored ${score}, below the required ${THRESHOLD}`);
  }
  process.exit(1);
}
