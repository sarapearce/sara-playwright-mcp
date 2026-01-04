# sara-playwright-mcp

**Overview**
- **Description:**: A small Playwright Test project containing UI tests for the TodoMVC demo app at `https://demo.playwright.dev/todomvc/#/`.
- **Purpose:**: Example automation tests for adding, removing and filtering todos using Playwright (TypeScript).

**Repository Files**
- **`playwright.config.ts`**: Playwright configuration (projects, `baseURL`, reporter, etc.).
- **`tests/`**: Test specs. Key files added/used:
  - `tests/todo.add.spec.ts` — test for adding a todo
  - `tests/todo.remove.spec.ts` — test for removing a todo
  - `tests/todo.filter.spec.ts` — test for filtering todos

**Requirements / Prerequisites**
- **Node.js**: v16+ recommended. Confirm with `node -v`.
- **Dependencies**: Project uses `@playwright/test`. Install with `npm ci` or `npm install`.

**Setup**
- **Install project deps:**
```bash
cd /Users/sarahome/Projects/sara-playwright-mcp
npm install
```
- **Install Playwright browsers:**
```bash
npx playwright install
```

**Run tests**
- **Run all tests (default project list):**
```bash
npx playwright test
```
- **Run a single test file:**
```bash
npx playwright test tests/todo.add.spec.ts
```
- **Run a test in headed mode with inspector:**
```bash
PWDEBUG=1 npx playwright test tests/todo.add.spec.ts --headed
```
- **Show report after a run:**
```bash
npx playwright show-report
```

**Selector Guidance & Stability**
- The tests prefer Playwright-native locators: `page.locator`, `page.getByTestId`, and `page.getByRole`.
- For stable tests, add `data-testid` or `data-test` attributes to your app's HTML for these elements:
  - `data-testid="new-todo"` — the new todo input
  - `data-testid="todo-list"` — the list container
  - `data-testid="destroy"` — delete button for items
  - `data-testid="toggle"` — complete toggle input
  - `data-testid="todo-count"` — items-left counter
  - `data-testid="filter-all"`, `data-testid="filter-active"`, `data-testid="filter-completed"` — filters


**Possible Next Steps**
- Add `data-testid` attributes to app markup for stable selectors.
- Add a tiny CI workflow using the included GitHub Actions template (if one exists) or edit `.github/workflows/playwright.yml`.



