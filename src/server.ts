// src/server.ts
import express, { Request, Response } from 'express';

const app = express();

app.get('/todos/1', (_req: Request, res: Response) => {
  res.json({ id: 1, userId: 1, title: 'buy milk', completed: false });
});

app.listen(3000, () => console.log('Todo API listening on :3000'));
export default app;
