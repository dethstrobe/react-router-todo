import { test, expect } from "@playwright/test"

test.describe("REMIX TODO App", () => {
  test("has title", async ({ page }) => {
    await page.goto("/todo")

    await expect(
      page.getByRole("heading", { name: "A very simple TODO app" }),
    ).toBeVisible()
  })
})
