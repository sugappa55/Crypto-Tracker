import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <QData, ParamsType = object>(url: string, params?: ParamsType) => {
  const [data, setData] = useState<QData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
  }>();

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (e) {
        console.log(e);
        setError({ message: String(e) });
      } finally {
        setLoading(false);
      }
    })();
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;
