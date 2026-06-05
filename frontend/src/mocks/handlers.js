// mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/stats", () => {
    // 10,000 records create panrom
    const largeData = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    }));

    return HttpResponse.json(largeData);
  }),
];
