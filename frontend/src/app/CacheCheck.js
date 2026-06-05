// src/app/CacheCheck.js
'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function CacheCheck() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      const cache = queryClient.getQueryCache().getAll();
      console.log('Current Cache State:', cache.map(q => ({
        queryKey: q.queryKey,
        state: q.state.status,
        data: q.state.data
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, [queryClient]);

  return null; // Idhu UI-la ethum kaataathu, console-la mattum thaan kaatum
};