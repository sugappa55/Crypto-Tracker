import { WATCHLIST } from '@/constants/apis';
import { db } from '@/constants/firebase';
import { useUserContext } from '@/providers/UserContext';
import { useSnackBarStore } from '@/store/useSnackBarStore';
import { User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

const useWatchlist = () => {
  const user = useUserContext() as User;
  const [watchlist, setWatchList] = useState<any[]>([]);

  const { setStatus: setAlert } = useSnackBarStore();

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

  const addToWatchlist = useCallback(
    async (data: { id: string; name: string; current_price: number }) => {
      try {
        const coinRef = doc(db, WATCHLIST, user?.uid);
        await setDoc(coinRef, { coins: watchlist ? [...watchlist, data] : [data] }, { merge: true });
        setAlert({
          type: 'success',
          open: true,
          message: `${data.name} Added to the Watchlist`
        });
      } catch (e: any) {
        setAlert({
          type: 'error',
          open: true,
          message: e.message
        });
      }
    },
    [watchlist]
  );

  const removeFromWatchlist = useCallback(
    async (data: { id: string; name: string }) => {
      try {
        const coinRef = doc(db, WATCHLIST, user?.uid);
        await setDoc(coinRef, { coins: watchlist.filter(e => e.id !== data?.id) }, { merge: true });
        setAlert({
          type: 'success',
          open: true,
          message: `${data.name} Removed from The Watchlist`
        });
      } catch (e: any) {
        setAlert({
          type: 'error',
          open: true,
          message: e.message
        });
      }
    },
    [watchlist]
  );

  return { watchlist, addToWatchlist, removeFromWatchlist };
};

export default useWatchlist;
