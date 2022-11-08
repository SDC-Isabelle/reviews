

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  const res = http.get(`http://localhost:3000/reviews?page=1&count=5&product_id=1&sort=newest`);
  check(res, { 'status was 200': (r) => r.status == 200 } )
}