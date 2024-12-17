import { CurrencyType } from '@/type';
import { create } from 'zustand';

type NavStoreState = {
  currency: CurrencyType;
};

type NavStore = NavStoreState & {
  setCurrency: (currency: CurrencyType) => void;
};

const initialState: NavStoreState = {
  currency: 'INR'
};

export const useNavStore = create<NavStore>()(set => ({
  ...initialState,
  setCurrency: newState => set(prev => ({ ...prev, currency: newState }))
}));
