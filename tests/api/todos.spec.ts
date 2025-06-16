import { test, expect, request } from '@playwright/test';

test('GET /todos/:id returns 200 & expected payload', async () => {
  // Create a new isolated APIRequestContext
  const apiContext = await request.newContext();

  // Perform GET request
  const response = await apiContext.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(response.ok()).toBeTruthy();                       // status 200-299

  // Validate JSON body
  const body = await response.json();
  expect(body).toMatchObject({
    id: 1,
    userId: 1,
    title: expect.any(String),
    completed: expect.any(Boolean)
  });
});
