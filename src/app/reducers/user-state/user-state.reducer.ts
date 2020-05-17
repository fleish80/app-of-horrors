import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user';
import { setUser } from './user-state.actions';


export const userStateFeatureKey = 'userState';

export interface State {
  user: User
}

export const initialState: State = {
  user: undefined
};


export const reducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({...state, user: action.user}))
);

