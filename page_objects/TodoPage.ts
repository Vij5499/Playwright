// page_objects/TodoPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;

  constructor(private readonly page: Page) {
    // Now `page` is already defined, so these succeed
    this.newTodoInput = page.locator('.new-todo');
    this.todoItems    = page.locator('.todo-list li');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
    await expect(this.newTodoInput).toBeVisible();
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async shouldHaveItems(expected: string[]) {
    await expect(this.todoItems).toHaveCount(expected.length);
    await expect(this.todoItems).toHaveText(expected);
  }
}
