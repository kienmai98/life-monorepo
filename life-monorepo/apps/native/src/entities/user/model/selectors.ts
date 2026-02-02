import type { UserState } from './store';

export const selectUser = (state: UserState) => state.user;
export const selectIsAuthenticated = (state: UserState) => state.user !== null;
export const selectUserId = (state: UserState) => state.user?.id;
export const selectUserEmail = (state: UserState) => state.user?.email;
