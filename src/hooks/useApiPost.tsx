import { PLAYERDATATYPES } from '@/configs/enums';
import { CustomContext } from '@/context/customContext';
import { useContext, useState } from 'react';

const useApiPost = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { PlayerGoldContext } = useContext(CustomContext);

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

      switch (key) {
        case PLAYERDATATYPES.gold:
          PlayerGoldContext.setGold(responseData.gold);
          console.log('new gold amount is: ' + responseData.gold)
          break;
        default:
          console.log('no key')
      }

      setData(responseData);
    } catch (error: any) {
      setError(error);
    }
  };

  return { postData, data, error, isLoading};
};

export default useApiPost;