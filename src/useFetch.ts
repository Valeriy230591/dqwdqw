import { useState, useEffect } from "react";
import useThrottle from "./useThrottle";

const cache: { [url: string]: any } = {};

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useFetch = <T>(url: string, delay: number = 300): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const throttledFetch = useThrottle((fetchUrl: string) => {
    if (cache[fetchUrl]) {
      setData(cache[fetchUrl]);
      setLoading(false);
    } else {
      setLoading(true);
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json() as Promise<T>;
        })
        .then((result) => {
          cache[fetchUrl] = result;
          setData(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, delay);

  useEffect(() => {
    if (url) {
      throttledFetch(url);
    }
  }, [url, throttledFetch]);

  return { data, loading, error };
};

export default useFetch;
