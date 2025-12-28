import { Page, Locator } from '@playwright/test';

export async function getLocator(page: Page, dataTest: string, fallback: string, timeout = 15000): Promise<Locator> {
  const dataTestSelector = `[data-test="${dataTest}"]`;
  // Prefer data-test selector when present, but wait for visibility to avoid races
  if (await page.locator(dataTestSelector).count() > 0) {
    await page.waitForSelector(dataTestSelector, { state: 'visible', timeout });
    return page.locator(dataTestSelector);
  }

  // Fallback to the provided selector and wait for it to be visible
  await page.waitForSelector(fallback, { state: 'visible', timeout });
  return page.locator(fallback);
}
