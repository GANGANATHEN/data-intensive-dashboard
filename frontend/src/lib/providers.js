// providers.js
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Providers({ children }) {
  // Using useState to ensure the client is created once
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute fresh
            gcTime: 2 * 60 * 1000, // 5 minutes-ku aprom memory-ah clear pannidu
          },
        },
      }),
  );
  if (typeof window !== "undefined") {
    const { worker } = require("../mocks/browser");
    worker.start();
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
