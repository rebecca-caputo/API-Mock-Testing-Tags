import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
  // Intercept request containing '/api/tags'
  await page.route(/.*\/api\/tags.*/, async route => {

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(tags),
    });
  });

  await page.goto('https://conduit.bondaracademy.com/');
});

test('mocked tags appear', async ({ page }) => {
  const tagList = page.locator('.tag-list');

  // checks that the mocked tags are located in the tag list
  await expect(tagList).toContainText('Automation');
  await expect(tagList).toContainText('Playwright');
});
