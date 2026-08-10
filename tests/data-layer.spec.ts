import { test, expect } from "@playwright/test";

test("clicking the primary CTA pushes the required dataLayer event", async ({ page }) => {
  await page.goto("/");

  // Prevent the actual cross-origin navigation so dataLayer can be read back.
  await page.evaluate(() => {
    document.querySelectorAll("a[data-cta-event]").forEach((a) => {
      a.addEventListener("click", (e) => e.preventDefault());
    });
  });

  await page.getByRole("link", { name: "Вземи 3 безплатни класа" }).click();

  const dataLayer = await page.evaluate(() => window.dataLayer);
  expect(dataLayer).toEqual([
    {
      event: "cta_click",
      cta_id: "hero_primary",
      cta_text: "Вземи 3 безплатни класа",
      cta_location: "hero",
      cta_destination: "https://vs.dance/tantsovi-klasove/",
    },
  ]);
});

test("class-finder card clicks push the same event shape", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.querySelectorAll("a[data-cta-event]").forEach((a) => {
      a.addEventListener("click", (e) => e.preventDefault());
    });
  });

  await page.getByRole("heading", { name: "Деца · 7–12 г." }).click();

  const dataLayer = await page.evaluate(() => window.dataLayer);
  expect(dataLayer).toEqual([
    {
      event: "cta_click",
      cta_id: "class_finder_kids",
      cta_text: "Деца · 7–12 г.",
      cta_location: "class_finder",
      cta_destination: "https://vs.dance/tantsovi-klasove/#class",
    },
  ]);
});
