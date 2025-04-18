import { test, expect } from "@playwright/test";

test.describe("Radiator Form", () => {
  test("should load the form correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("select#radiatorFamily")).toBeVisible();
    await expect(page.getByLabel("Radiator length from (mm)")).toBeVisible();
    await expect(page.getByLabel("Radiator length to (mm)")).toBeVisible();
    await expect(page.getByLabel("Clear")).toBeVisible();
    await expect(page.getByLabel("Search")).toBeVisible();
  });

  test("should fill and submit the form correctly", async ({ page }) => {
    await page.goto("/");

    await page.locator("select#radiatorFamily").selectOption("emmeline");
    await page.getByLabel("Radiator length from (mm)").fill("300");
    await page.getByLabel("Radiator length to (mm)").fill("600");

    await page.getByLabel("Search").click();

    const cards = page.locator('[data-testid="radiator-card"]');

    await expect(cards.first()).toBeVisible();
  });

  test("should reset the form when Clear is clicked", async ({ page }) => {
    await page.goto("/");

    await page.locator("select#radiatorFamily").selectOption("emmeline");
    await page.getByLabel("Radiator length from (mm)").fill("300");
    await page.getByLabel("Radiator length to (mm)").fill("600");

    await page.getByLabel("Clear").click();

    await expect(page.locator("select#radiatorFamily")).toHaveValue("");
    await expect(page.getByLabel("Radiator length from (mm)")).toHaveValue("0");
    await expect(page.getByLabel("Radiator length to (mm)")).toHaveValue("");
  });

  test("should show validation errors when field value is too high", async ({
    page,
  }) => {
    await page.goto("/");

    const input = page.getByLabel("Radiator length from (mm)");
    await input.click();
    await page.keyboard.type("20001");
    await page.keyboard.press("Tab");
    const errorMessage = page.locator("#error-radiatorLengthFrom");

    await expect(errorMessage).toHaveText(
      "Length cannot be greater than 10000"
    );
  });
});
