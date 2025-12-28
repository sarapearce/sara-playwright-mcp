import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.reload();
});

test('adds a todo', async ({ page }) => {
  // Prefer data-testid when available, otherwise fallback to CSS selectors
  const hasNewTodoTestId = await page.locator('[data-testid="new-todo"]').count() > 0;
  const input = hasNewTodoTestId ? page.getByTestId('new-todo') : page.locator('input.new-todo');
  await expect(input).toBeVisible();
  await input.fill('Buy milk');
  await input.press('Enter');

  const hasTodoListTestId = await page.locator('[data-testid="todo-list"]').count() > 0;
  const todoList = hasTodoListTestId ? page.getByTestId('todo-list') : page.locator('ul.todo-list');
  const todo = todoList.locator('li').filter({ hasText: 'Buy milk' });
  await expect(todo).toHaveCount(1);
  await expect(todo.locator('label')).toHaveText('Buy milk');

  await expect(todoList.locator('li')).toHaveCount(1);
  const hasCountTestId = await page.locator('[data-testid="todo-count"]').count() > 0;
  const count = hasCountTestId ? page.getByTestId('todo-count') : page.locator('span.todo-count');
  await expect(count).toHaveText(/1/);
});
