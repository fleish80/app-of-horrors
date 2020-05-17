import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user-state';

export interface State {
  router: fromRouter.RouterReducerState<any>,
  [fromUser.userStateFeatureKey]: fromUser.State
}

export const initialState: State = {
  router: undefined,
  [fromUser.userStateFeatureKey]: fromUser.initialState
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  [fromUser.userStateFeatureKey]: fromUser.reducer 
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');
 
export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

const selectUsersState = createFeatureSelector(fromUser.userStateFeatureKey)

export const getPlantType = createSelector(selectRouteParam('plantType'), (plantType) => plantType);

export const getUser = createSelector(selectUsersState, (state: fromUser.State) => state.user);

export const getPlantListingData = createSelector(getPlantType, getUser, (plantType, user) => ({plantType, user}));