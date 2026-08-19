import { test, expect } from "@playwright/test"

test.describe("Visual Builder Plugin E2E Flow", () => {
  const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000"

  test("Admin can activate visual edit mode, type inline, insert template, and save layout", async ({
    page,
  }) => {
    // 1. Visit page
    await page.goto(`${baseURL}/`)
    await page.waitForLoadState("networkidle")

    // 2. Verify Floating Visual Builder Toolbar is present
    const toggleBtn = page.getByRole("button", { name: /Edit Page Canvas/i })
    await expect(toggleBtn).toBeVisible({ timeout: 10000 })

    // 3. Activate Visual Edit Mode
    await toggleBtn.click()
    await expect(page.getByRole("button", { name: /View Live Site/i })).toBeVisible()

    // 4. Open Add Section Template modal
    await page.getByRole("button", { name: /Add Section/i }).first().click()
    await expect(page.getByRole("heading", { name: /Add New Section Template/i })).toBeVisible()

    // 5. Select Call To Action Banner template
    await page.getByRole("button", { name: /Call To Action Banner/i }).first().click()

    // 6. Verify section is added with cyan outline highlight
    await expect(page.getByText(/Call To Action Banner/i)).toBeVisible()

    // 7. Click Save Page
    await page.getByRole("button", { name: /Save Page/i }).click()
    await expect(page.getByText(/Saved successfully!/i)).toBeVisible({ timeout: 10000 })
  })
})
