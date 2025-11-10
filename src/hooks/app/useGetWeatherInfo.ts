"use client";

import { useRequest } from "ahooks";

export function useGetWeatherInfo({
  host
}: {
  host: string;
}) {
  const { data, error, loading, run, cancel, refresh, mutate } = useRequest(
    async () => {
      const response = await fetch(`${host}/weather?latitude=52.52&longitude=13.41`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      return res;
    },
    {
      manual: false,
      ready: !!host,
    }
  );

  return { data, error, loading, run, cancel, refresh, mutate };
}