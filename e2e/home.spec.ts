import { expect, test } from "@playwright/test";

test.describe("home route", (): void => {
  test("renders the Swifty Mario hero", async ({ page }): Promise<void> => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /swifty mario/i }),
    ).toBeVisible();
    await expect(page.getByText(/move:\s*arrow keys/i)).toBeVisible();
  });

  test("exposes player name input and leaderboard", async ({
    page,
  }): Promise<void> => {
    await page.goto("/");
    await expect(page.getByLabel(/player name/i)).toBeVisible();
    await expect(page.getByText(/top distance scores/i)).toBeVisible();
  });

  test("lets players switch to hell difficulty", async ({
    page,
  }): Promise<void> => {
    await page.goto("/");
    const hellButton = page.getByRole("button", { name: /hell/i });
    await hellButton.click();
    await expect(hellButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(/relentless hazard timing/i)).toBeVisible();
  });
});
