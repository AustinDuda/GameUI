import { useState } from 'react';

const useApiPost = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (data: any, key: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const stringifiedData = JSON.stringify({
        key: key,
        data: data
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: stringifiedData,
        headers: {
            'Content-type':  'application-json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error: any) {
      setError(error);
    } finally {
      console.log(data) //maybe handle context update here?
      setIsLoading(false);
    }
  };

  return { postData, data, error, isLoading};
};

export default useApiPost;