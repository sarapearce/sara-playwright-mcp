import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.reload();
});

test('filters todos (All / Active / Completed)', async ({ page }) => {
  const hasNewTodoTestId = await page.locator('[data-testid="new-todo"]').count() > 0;
  const input = hasNewTodoTestId ? page.getByTestId('new-todo') : page.locator('input.new-todo');
  await expect(input).toBeVisible();
  await input.click();
  await input.fill('Task A');
  await input.press('Enter');
  await input.fill('Task B');
  await input.press('Enter');
  await input.fill('Task C');
  await input.press('Enter');

  const hasTodoListTestId = await page.locator('[data-testid="todo-list"]').count() > 0;
  const todoList = hasTodoListTestId ? page.getByTestId('todo-list') : page.locator('ul.todo-list');
  await expect(todoList.locator('li')).toHaveCount(3);

  // Complete Task B
  const taskB = todoList.locator('li').filter({ hasText: 'Task B' });
  const taskBToggle = taskB.locator('input.toggle');
  await taskBToggle.check();

  // Items left should show 2
  const hasCountTestId = await page.locator('[data-testid="todo-count"]').count() > 0;
  const count = hasCountTestId ? page.getByTestId('todo-count') : page.locator('span.todo-count');
  await expect(count).toHaveText(/2/);

  // All: show all 3
  const allFilter = (await page.locator('[data-testid="filter-all"]').count() > 0)
    ? page.getByTestId('filter-all')
    : page.getByRole('link', { name: 'All' });
  await allFilter.click();
  await expect(todoList.locator('li')).toHaveCount(3);

  // Active: show only Task A and Task C
  const activeFilter = (await page.locator('[data-testid="filter-active"]').count() > 0)
    ? page.getByTestId('filter-active')
    : page.getByRole('link', { name: 'Active' });
  await activeFilter.click();
  await expect(todoList.locator('li')).toHaveCount(2);
  await expect(todoList.locator('li:has-text("Task A")')).toBeVisible();
  await expect(todoList.locator('li:has-text("Task C")')).toBeVisible();
  await expect(todoList.locator('li:has-text("Task B")')).toHaveCount(0);

  // Completed: show only Task B
  const completedFilter = (await page.locator('[data-testid="filter-completed"]').count() > 0)
    ? page.getByTestId('filter-completed')
    : page.getByRole('link', { name: 'Completed' });
  await completedFilter.click();
  await expect(todoList.locator('li')).toHaveCount(1);
  await expect(todoList.locator('li:has-text("Task B")')).toBeVisible();
});
