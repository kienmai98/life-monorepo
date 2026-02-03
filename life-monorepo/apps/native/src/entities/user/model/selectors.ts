/**
 * @module entities/user/model/selectors
 * @description User entity selectors for state extraction
 */

import type { UserState } from './store';

/**
 * Select current user from state
 */
export const selectUser = (state: UserState): UserState['user'] => state.user;

/**
 * Check if user is authenticated
 */
export const selectIsAuthenticated = (state: UserState): boolean =>
  state.user !== null;

/**
 * Select current user ID
 * Returns undefined if not authenticated
 */
export const selectUserId = (state: UserState): string | undefined =>
  state.user?.id;

/**
 * Select current user email
 * Returns undefined if not authenticated
 */
export const selectUserEmail = (state: UserState): string | undefined =>
  state.user?.email;
