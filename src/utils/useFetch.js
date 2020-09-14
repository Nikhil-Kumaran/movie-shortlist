import { useEffect, useState } from 'react';

export const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        if (res.status >= 200 && res.status <= 299) {
          const json = await res.json();
          setResponse(json);
        } else {
          const err = await res.json();
          setError(err);
        }
        setIsLoading(false);
      } catch (err) {
        console.log('Network error', err);
        setError(err);
      }
    };
    fetchData();
  }, []);
  return [response, error, isLoading];
};
