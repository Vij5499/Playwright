// tests/ui/todo.spec.ts
import { test } from '@playwright/test';
import { TodoPage } from '../../page_objects/TodoPage';

test('user can add multiple todos', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTodo('Buy milk');
  await todo.addTodo('Write tests');

  await todo.shouldHaveItems(['Buy milk', 'Write tests']);
});
