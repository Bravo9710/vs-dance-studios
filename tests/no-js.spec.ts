import { test, expect } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("all three cards and every link render and work without JavaScript", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header a")).toHaveCount(2);
  await expect(page.locator('main ul[id="class-finder-cards"] > li > a')).toHaveCount(3);

  const cardHrefs = await page
    .locator('main ul[id="class-finder-cards"] > li > a')
    .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
  for (const href of cardHrefs) {
    expect(href).toMatch(/^https:\/\/vs\.dance\//);
  }

  // nothing is hidden: every style chip stays visible without the filter's JS
  await expect(page.locator("main [data-locations]")).toHaveCount(9);
  for (const chip of await page.locator("main [data-locations]").all()) {
    await expect(chip).toBeVisible();
  }

  // including styles that only exist at one studio (data-locations="buxton")
  await expect(page.getByText("Break dance")).toBeVisible();

  // the filter's own controls still render, even though they're inert
  await expect(page.getByRole("radio")).toHaveCount(3);
});
