// tests/contracts/todos.pact.test.ts
import { PactV3, MatchersV3, V3MockServer } from '@pact-foundation/pact';
import fetch from 'node-fetch';

describe('Todo API – contract test', () => {
  let provider: PactV3;

  beforeEach(() => {
    provider = new PactV3({
      consumer: 'TodoUI',
      provider: 'TodoAPI',
      port: 1234,
    });
  });

  afterEach(() => {
    // PactV3 doesn't have finalize method, cleanup is handled automatically
  });

  it('GET /todos/1 returns the expected payload', async () => {
    // Setup the interaction
    provider
      .given('todo with id 1 exists')
      .uponReceiving('GET existing todo 1')
      .withRequest({
        method: 'GET',
        path: '/todos/1',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: {
          id:        1,
          userId:    1,
          title:     MatchersV3.string('any title'),
          completed: MatchersV3.boolean(false),
        },
      });

    // Execute the test
    await provider.executeTest(async (mockServer: V3MockServer) => {
      const mockServerURL = mockServer.url;
      console.log('Mock server URL:', mockServerURL); // Debug log
      
      // Validate URL
      if (!mockServerURL || typeof mockServerURL !== 'string') {
        throw new Error(`Invalid mock server URL: ${mockServerURL}`);
      }
      
      // ── Act ──
      const res = await fetch(`${mockServerURL}/todos/1`);
      const body = await res.json();

      // ── Assert ──
      expect(res.status).toBe(200);
      expect(body.id).toBe(1);
    });
  });
});