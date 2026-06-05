import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    staleTime: 5000,
    refetchInterval: 10000,
  });
};
