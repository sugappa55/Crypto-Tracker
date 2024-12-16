import React, { useState } from 'react';
import { signOut, User } from 'firebase/auth';
import { AiFillDelete } from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/constants/firebase';
import { Avatar, Drawer } from '@mui/material';
import { Coin, Container, Logout, Picture, Profile, Watchlist } from './styles';
import { numberWithCommas } from '@/utils/helpers';
import { useSnackBarStore } from '@/store/useSnackBarStore';
import { useNavStore } from '@/store/useNavStore';
import { symbols } from '@/constants';
import { useUserContext } from '@/providers/UserContext';
import useWatchlist from '@/hooks/useWatchlist';

export default function UserSidebar() {
  const user = useUserContext() as User;
  const { currency } = useNavStore();
  const { setStatus } = useSnackBarStore();
  const [openDrawer, setOpenDrawer] = useState(false);
  const watchlist = useWatchlist();

  const symbol = symbols[currency];

  const toggleDrawer = () => {
    setOpenDrawer(p => !p);
  };

  const logOut = () => {
    signOut(auth);
    setStatus({
      open: true,
      type: 'success',
      message: 'Logout Successful'
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (data: { id: string; name: string }) => {
    const coinRef = doc(db, 'watchlist', user?.uid);
    try {
      await setDoc(coinRef, { coins: watchlist.filter(e => e !== data?.id) }, { merge: true });
      setStatus({
        type: 'success',
        open: true,
        message: `${data.name} Removed from The Watchlist`
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setStatus({
        type: 'error',
        open: true,
        message: e.message as string
      });
    }
  };

  return (
    <div>
      <>
        <Avatar
          onClick={toggleDrawer}
          style={{
            height: 38,
            width: 38,
            cursor: 'pointer',
            backgroundColor: 'gold'
          }}
          src={user.photoURL || undefined}
          alt={user.displayName || user.email || undefined}
        />
        <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer}>
          <Container>
            <Profile>
              <Picture src={user.photoURL || undefined} alt={user.displayName || user.email || undefined} />
              <span
                style={{
                  width: '100%',
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bolder',
                  wordWrap: 'break-word'
                }}>
                {user.displayName || user.email}
              </span>
              <Watchlist>
                <span style={{ fontSize: 15, textShadow: '0 0 5px black' }}>Watchlist</span>
                {watchlist.map(coin => {
                  return (
                    <Coin key={coin.id}>
                      <span>{coin.name}</span>
                      <span style={{ display: 'flex', gap: 8 }}>
                        {symbol} {numberWithCommas(coin.current_price[currency.toLowerCase()].toFixed(2))}
                        <AiFillDelete
                          style={{ cursor: 'pointer' }}
                          fontSize='16'
                          onClick={() => removeFromWatchlist(coin)}
                        />
                      </span>
                    </Coin>
                  );
                })}
              </Watchlist>
            </Profile>
            <Logout variant='contained' onClick={logOut}>
              Logout
            </Logout>
          </Container>
        </Drawer>
      </>
    </div>
  );
}
