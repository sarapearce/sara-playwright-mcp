import { test, expect } from '@playwright/test';
import { getLocator } from './test-utils';

test.beforeEach(async ({ page }) => {
  // Clear storage before navigation to ensure a clean app state
  await page.goto('about:blank');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
});

test('removes a todo', async ({ page }) => {
  const input = await getLocator(page, 'new-todo', 'input.new-todo');
  await expect(input).toBeVisible();
  await input.fill('Buy milk');
  await input.press('Enter');

  const todoList = await getLocator(page, 'todo-list', 'ul.todo-list');
  const todo = todoList.locator('li').filter({ hasText: 'Buy milk' });
  await expect(todo).toHaveCount(1);

  // Hover to reveal the destroy button, then click it
  await todo.hover();
  const destroy = await getLocator(page, 'destroy', 'button.destroy');
  await expect(destroy).toBeVisible();
  await destroy.click();

  await expect(todoList.locator('li:has-text("Buy milk")')).toHaveCount(0);
  await expect(todoList.locator('li')).toHaveCount(0);
  const count = await getLocator(page, 'todo-count', 'span.todo-count');
  await expect(count).toHaveText(/0/);
});
