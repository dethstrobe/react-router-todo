import { test, expect } from "@playwright/test"
import { screenshot } from "@test2doc/playwright/screenshots"

test.describe("REMIX TODO App", () => {
  test("The app title", async ({ page }, pageInfo) => {
    await test.step("When you navigate to `/todo`.", async () => {
      await page.goto("/todo")
    })

    await test.step("The page should display the title of the app.", async () => {
      const header = page.getByRole("heading", {
        name: "A very simple TODO app",
      })
      await screenshot(pageInfo, header, {
        annotation: { text: "This is the title", showArrow: true },
      })
      await expect(header).toBeVisible()
    })
  })
})
