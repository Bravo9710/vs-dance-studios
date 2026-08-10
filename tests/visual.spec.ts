import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

for (const { width, height } of VIEWPORTS) {
  test(`visual snapshot @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page).toHaveScreenshot(`homepage-${width}.png`, { fullPage: true });
  });
}
