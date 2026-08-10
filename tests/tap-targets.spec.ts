import { test, expect } from "@playwright/test";

test("every interactive element is at least 44x44px", async ({ page }) => {
  await page.goto("/");
  const elements = await page.locator("a, button").all();
  expect(elements.length).toBeGreaterThan(0);

  for (const el of elements) {
    const box = await el.boundingBox();
    expect(box).not.toBeNull();
    if (!box) continue;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
