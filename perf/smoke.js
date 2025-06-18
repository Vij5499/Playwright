// perf/smoke.js  — 30 s, 10 VU smoke test
import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],   // ✕ build if slower than 500 ms
    http_req_failed:   ['rate<0.01'],   // ✕ if >1 % errors
  },
};

// a custom trend lets you chart latency over time if you later export results
export const latency = new Trend('latency');

export default function () {
  const res = http.get('http://localhost:3000/todos/1');
  latency.add(res.timings.duration);
  check(res, {
    'status 200': (r) => r.status === 200,
  });
}
