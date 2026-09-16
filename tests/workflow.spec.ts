import { expect, test } from "@playwright/test";

test("ranks a family-trip kit and locks a transparent brief", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Tell us the moment/i })).toBeVisible();
  await page.getByRole("button", { name: /Find my camera kit/i }).click();
  await expect(page.getByText("Pocket Storyteller")).toBeVisible();
  await page.getByRole("button", { name: /Pocket Storyteller/i }).click();
  await expect(page.getByText("Brief locked: Pocket Storyteller")).toBeVisible();
  await expect(page.getByText(/No interchangeable lenses/)).toBeVisible();
});

test("changes the recommendation for indoor low-light work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Kids indoors" }).click();
  await page.getByRole("button", { name: "Indoor light" }).click();
  await page.getByLabel("Maximum budget").fill("1500");
  await page.getByRole("button", { name: /Find my camera kit/i }).click();
  await expect(page.getByText("Memory Maker Kit")).toBeVisible();
  await expect(page.locator(".kit").first()).toContainText("Memory Maker Kit");
});

test("shows bounded validation and an honest no-match state", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Maximum budget").fill("100");
  await page.getByRole("button", { name: /Find my camera kit/i }).click();
  await expect(page.locator(".error")).toContainText("between $300 and $5,000");
  await page.getByLabel("Maximum budget").fill("500");
  await page.getByRole("button", { name: /Find my camera kit/i }).click();
  await expect(page.getByRole("heading", { name: "No honest match" })).toBeVisible();
  await expect(page.getByText(/Raise it above \$899/)).toBeVisible();
});

test("has no horizontal overflow on mobile before and after matching", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only assertion");
  await page.goto("/");
  const before = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  expect(before[0]).toBeLessThanOrEqual(before[1] + 1);
  await page.getByRole("button", { name: /Find my camera kit/i }).click();
  await expect(page.getByText("Pocket Storyteller")).toBeVisible();
  const after = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  expect(after[0]).toBeLessThanOrEqual(after[1] + 1);
});
