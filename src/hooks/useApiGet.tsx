import { useState, useEffect } from 'react';

const useApiGet = (url: string, key: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getData, setGetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setGetData(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setGetData(responseData[key]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, error, getData };
};

export default useApiGet;