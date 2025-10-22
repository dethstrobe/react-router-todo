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
        annotation: { text: "This is the title" },
      })
      await expect(header).toBeVisible()
    })
  })

  test("Add a new TODO item", async ({ page }, pageInfo) => {
    await page.goto("/todo")

    await test.step("Clicking the create button will open the create form.", async () => {
      const button = page.getByRole("link", { name: "Create a new todo" })
      await screenshot(pageInfo, button, {
        annotation: { text: "This is the create button" },
      })
      await button.click()
    })

    await test.step("The create form should be visible.", async () => {
      const form = page.getByRole("form", { name: "Add a todo" })
      await expect(form).toBeVisible()
      await screenshot(pageInfo, form, {
        annotation: { text: "This is the create TODO form" },
      })
    })

    const todoTitle = `Count to ${Date.now()}!`

    await test.step("Enter a name for the todo item.", async () => {
      const titleInput = page.getByLabel("Task Name")
      await titleInput.fill(todoTitle)
      await screenshot(pageInfo, titleInput, {
        annotation: { text: "Filling in the task name" },
      })
    })

    await test.step("Enter a description for the todo item.", async () => {
      const descriptionInput = page.getByLabel("Description")
      await descriptionInput.fill(
        "Just count to a big number. How hard can it be?",
      )
      await screenshot(pageInfo, descriptionInput, {
        annotation: { text: "Filling in the description" },
      })
    })

    await test.step("Submit the form.", async () => {
      const submitButton = page.getByRole("button", { name: "Add" })
      await screenshot(pageInfo, submitButton, {
        annotation: { text: "Click here to submit the form" },
      })
      await submitButton.click()
    })

    await test.step("The new TODO item should be visible on the page and it should take you to the todo details.", async () => {
      const todoItem = page.getByRole("link", {
        name: todoTitle,
      })
      const todoDetails = page.getByRole("article", { name: todoTitle })
      await expect(todoItem).toBeVisible()
      await screenshot(pageInfo, [
        {
          target: todoItem,
          options: {
            annotation: { text: "The new TODO item is visible here" },
          },
        },
        {
          target: todoDetails,
          options: {
            annotation: { text: "The details of the TODO item are shown here" },
          },
        },
      ])
    })
  })
})
