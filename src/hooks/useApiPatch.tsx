import { useContext, useState } from 'react';
import { CustomContext } from '@/context/customContext';

const useApiPatch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { PlayerGoldContext } = useContext(CustomContext);

  const postData = async (data: any) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const stringifiedData = JSON.stringify({
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
    }
  };

  return { postData, data, error, isLoading};
};

export default useApiPatch;