import type { User } from './types';

export interface UserState {
  user: User | null;
  isLoading: boolean;
}

export const initialUserState: UserState = {
  user: null,
  isLoading: true,
};
