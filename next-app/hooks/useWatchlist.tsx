import { db } from '@/constants/firebase';
import { useUserContext } from '@/providers/UserContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useWatchlist = () => {
  const user = useUserContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [watchlist, setWatchList] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid);
      const unSubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        } else {
          console.log('No Items In The Watchlist');
        }
      });

      return () => {
        unSubscribe();
      };
    }
  }, [user]);

  return watchlist;
};

export default useWatchlist;
