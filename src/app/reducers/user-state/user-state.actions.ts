import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user';

export const setUser = createAction(
  '[UserState] Load UserStates',  props<{ user: User }>()
);
