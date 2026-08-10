import { test, expect } from "@playwright/test";

test("focus is always visible while tabbing through every interactive element", async ({ page }) => {
  await page.goto("/");
  // The location filter uses roving tabindex (WAI-ARIA radiogroup pattern):
  // only the checked radio has tabindex="0", the other two are "-1" and are
  // reached via arrow keys, not Tab — so they're excluded from the Tab-stop count.
  const focusableCount = await page.locator('a, button:not([tabindex="-1"])').count();

  for (let i = 0; i < focusableCount; i++) {
    await page.keyboard.press("Tab");
    const tagName = await page.evaluate(() => document.activeElement?.tagName);
    expect(["A", "BUTTON"]).toContain(tagName);

    const focusStyle = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const style = getComputedStyle(el);
      return { outlineStyle: style.outlineStyle, boxShadow: style.boxShadow };
    });
    expect(
      focusStyle?.outlineStyle !== "none" || focusStyle?.boxShadow !== "none",
    ).toBeTruthy();
  }
});

test("location filter is operable with arrow keys and reflects aria-checked", async ({ page }) => {
  await page.goto("/");

  const all = page.getByRole("radio", { name: "Всички" });
  const vitosha = page.getByRole("radio", { name: "Витоша 91" });
  const buxton = page.getByRole("radio", { name: "Бъкстон" });

  await expect(all).toHaveAttribute("aria-checked", "true");

  await all.focus();
  await page.keyboard.press("ArrowRight");
  await expect(vitosha).toHaveAttribute("aria-checked", "true");
  await expect(all).toHaveAttribute("aria-checked", "false");
  await expect(vitosha).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(buxton).toHaveAttribute("aria-checked", "true");
  await expect(buxton).toBeFocused();

  // wraps back to the start
  await page.keyboard.press("ArrowRight");
  await expect(all).toHaveAttribute("aria-checked", "true");

  await page.keyboard.press("ArrowLeft");
  await expect(buxton).toHaveAttribute("aria-checked", "true");
});
