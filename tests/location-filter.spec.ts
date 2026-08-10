import { test, expect } from "@playwright/test";

test("selecting a location filters chips per card and announces the change", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("main [data-locations]")).toHaveCount(9);

  const adultsCard = page.locator("[data-card]").filter({ hasText: "Възрастни" });
  await expect(adultsCard.locator("[data-locations]")).toHaveCount(3);
  await expect(adultsCard.locator("[data-empty-state]")).toBeHidden();

  await page.getByRole("radio", { name: "Витоша 91" }).click();

  // The Възрастни card is Buxton-only in the source data: all three chips hide.
  await expect(adultsCard.locator("[data-locations]:visible")).toHaveCount(0);
  await expect(adultsCard.locator("[data-empty-state]")).toBeVisible();
  await expect(adultsCard.locator("[data-empty-state]")).toHaveText("Няма класове на тази локация");
  await expect(adultsCard.locator("[data-card-footer]")).toBeHidden();

  // Break dance is Buxton-only too, so it hides on the Деца card.
  await expect(page.getByText("Break dance")).toBeHidden();

  await expect(page.getByText("Показани са класовете в Витоша 91")).toBeAttached();

  await page.getByRole("radio", { name: "Всички" }).click();
  await expect(page.locator("main [data-locations]:visible")).toHaveCount(9);
  await expect(adultsCard.locator("[data-empty-state]")).toBeHidden();
  await expect(page.getByText("Показани са всички класове")).toBeAttached();
});
