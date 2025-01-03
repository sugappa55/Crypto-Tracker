'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Container, MenuItem, Select, Toolbar } from '@mui/material';
import { Title } from './style';
import { useNavStore } from '@/store/useNavStore';
import { CurrencyType } from '@/type';
import AuthModal from '../AuthModal';
import UserSidebar from '../SideBar';
import { useUserContext } from '@/providers/UserContext';

const Header = () => {
  const router = useRouter();
  const { currency, setCurrency } = useNavStore();
  const user = useUserContext();

  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Title
            onClick={() => {
              router.push('/');
            }}
            variant='h6'>
            Crypto Tracker
          </Title>
          <Select
            variant='outlined'
            style={{
              width: 100,
              height: 40,
              marginRight: 15
            }}
            value={currency}
            onChange={e => setCurrency(e.target.value as CurrencyType)}>
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='INR'>INR</MenuItem>
          </Select>
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
