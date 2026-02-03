/**
 * @module entities/user/model/store
 * @description User entity state (for reference, not a store)
 */

import type { User } from './types';

/**
 * User state interface
 * Used by other stores that manage user data
 */
export interface UserState {
  /** Current user or null if not authenticated */
  user: User | null;
  /** Loading state */
  isLoading: boolean;
}

/**
 * Initial user state
 */
export const initialUserState: UserState = {
  user: null,
  isLoading: true,
};
