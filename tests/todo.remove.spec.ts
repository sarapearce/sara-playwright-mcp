import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.reload();
});

test('removes a todo', async ({ page }) => {
  const hasNewTodoTestId = await page.locator('[data-testid="new-todo"]').count() > 0;
  const input = hasNewTodoTestId ? page.getByTestId('new-todo') : page.locator('input.new-todo');
  await expect(input).toBeVisible();
  await input.fill('Buy milk');
  await input.press('Enter');

  const hasTodoListTestId = await page.locator('[data-testid="todo-list"]').count() > 0;
  const todoList = hasTodoListTestId ? page.getByTestId('todo-list') : page.locator('ul.todo-list');
  const todo = todoList.locator('li').filter({ hasText: 'Buy milk' });
  await expect(todo).toHaveCount(1);

  // Hover to reveal the destroy button, then click it
  await todo.hover();
  const hasDestroyTestId = await page.locator('[data-testid="destroy"]').count() > 0;
  const destroy = hasDestroyTestId ? page.getByTestId('destroy') : todo.locator('button.destroy');
  await expect(destroy).toBeVisible();
  await destroy.click();

  await expect(todoList.locator('li:has-text("Buy milk")')).toHaveCount(0);
  await expect(todoList.locator('li')).toHaveCount(0);
  const hasCountTestId = await page.locator('[data-testid="todo-count"]').count() > 0;
  const count = hasCountTestId ? page.getByTestId('todo-count') : page.locator('span.todo-count');
  await expect(count).toHaveText(/0/);
});
