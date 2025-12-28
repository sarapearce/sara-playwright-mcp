import { test, expect } from '@playwright/test';
import { getLocator } from './test-utils';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('filters todos (All / Active / Completed)', async ({ page }) => {
  const input = await getLocator(page, 'new-todo', 'input.new-todo');
  expect(input).toBeVisible();
  input.click();
  await input.fill('Task A');
  await input.press('Enter');
  await input.fill('Task B');
  await input.press('Enter');
  await input.fill('Task C');
  await input.press('Enter');

  const todoList = await getLocator(page, 'todo-list', 'ul.todo-list');
  await expect(todoList.locator('li')).toHaveCount(3);

  // Complete Task B
  const taskB = todoList.locator('li').filter({ hasText: 'Task B' });
  // Prefer a toggle inside the task element; fallback to input.toggle
  const taskBToggle = taskB.locator('input.toggle');
  await taskBToggle.check();

  // Items left should show 2
  const count = await getLocator(page, 'todo-count', 'span.todo-count');
  await expect(count).toHaveText(/2/);

  // All: show all 3
  const allFilter = await getLocator(page, 'filter-all', 'text=All');
  await allFilter.click();
  await expect(todoList.locator('li')).toHaveCount(3);

  // Active: show only Task A and Task C
  const activeFilter = await getLocator(page, 'filter-active', 'text=Active');
  await activeFilter.click();
  await expect(todoList.locator('li')).toHaveCount(2);
  await expect(todoList.locator('li:has-text("Task A")')).toBeVisible();
  await expect(todoList.locator('li:has-text("Task C")')).toBeVisible();
  await expect(todoList.locator('li:has-text("Task B")')).toHaveCount(0);

  // Completed: show only Task B
  const completedFilter = await getLocator(page, 'filter-completed', 'text=Completed');
  await completedFilter.click();
  await expect(todoList.locator('li')).toHaveCount(1);
  await expect(todoList.locator('li:has-text("Task B")')).toBeVisible();
});
