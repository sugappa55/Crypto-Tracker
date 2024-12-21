import { create } from 'zustand';

type SnackBarState = {
  open: boolean;
  message: string;
  type: 'success' | 'error';
};

type SnackBarStore = SnackBarState & {
  setStatus: (payload: Partial<SnackBarState>) => void;
};

const initialState: SnackBarState = {
  open: false,
  message: '',
  type: 'success'
};

export const useSnackBarStore = create<SnackBarStore>()(set => ({
  ...initialState,
  setStatus: newState => set(prev => ({ ...prev, ...newState }))
}));
