import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {Router} from '@vaadin/router';
import {StateWithRouter} from '../router/connect';
import {convertSearchQueryToQueryParams, QueryParams, SelectedInfo} from '../router/utils';

export const ROUTER_CHANGED = 'ROUTER_CHANGED';
export const NAVIGATE_TO_PATH = 'NAVIGATE_TO_PATH';
export const UPDATE_QUERY_PARAMS = 'UPDATE_QUERY_PARAMS';

type ROUTER_CHANGED_TYPE = 'ROUTER_CHANGED';

export interface BreadcrumbItem extends SelectedInfo {
  href: string;
  path: string;
  label: string;
  disabled?: boolean;
}

export interface RouterActionRouterChanged extends Action<ROUTER_CHANGED_TYPE> {
  baseUrl: string;
  pathname: string;
  component?: string;
  params: Record<string, string>;
  title?: string;
  data: Record<string, any>;
  breadcrumbs: BreadcrumbItem[];
  queryParams?: Record<string, string[]>;
}

export interface RouterActionChangedPayload {
  baseUrl: string;
  pathname: string;
  component?: string;
  params: Record<string, string>;
  title?: string;
  data: Record<string, any>;
  breadcrumbs: BreadcrumbItem[];
  queryParams?: Record<string, string[]>;
}

export interface RouterActionNavigateToPath extends Action {
  type: 'NAVIGATE_TO_PATH';
}

export interface RouterActionNavigateToPathPayload {
  path: string;
}

export interface RouterActionUpdateQueryParams extends Action {
  type: 'UPDATE_QUERY_PARAMS';
  queryParams: Record<string, string[]>;
}

export interface RouterActionUpdateQueryParamsPayload {
  queryParams: string;
}

export type RouterAction = RouterActionRouterChanged | RouterActionNavigateToPath | RouterActionUpdateQueryParams;

type ThunkResult<R> = ThunkAction<R, StateWithRouter, undefined, RouterAction>;

const hasQueryParams = (queryParams?: QueryParams): boolean => !!queryParams && Object.keys(queryParams).length > 0;

type RouterChangedDispatch = ThunkDispatch<StateWithRouter, undefined, RouterActionRouterChanged>;
export const routerChanged = (payload: RouterActionChangedPayload): ThunkResult<RouterActionRouterChanged> => (
  dispatch: RouterChangedDispatch,
  getState: () => StateWithRouter,
): RouterActionRouterChanged => {
  const {
    router: {queryParams},
  } = getState();

  if (hasQueryParams(queryParams) && !hasQueryParams(payload.queryParams)) {
    window.history.replaceState({}, '', `${window.location.origin}${window.location.pathname}`);
  }

  return dispatch({
    type: 'ROUTER_CHANGED' as ROUTER_CHANGED_TYPE,
    ...payload,
  });
};

export const navigateToPath = (payload: RouterActionNavigateToPathPayload): RouterActionNavigateToPath => {
  Router.go(payload.path);
  return {type: NAVIGATE_TO_PATH};
};

export const updateQueryParams = (payload: RouterActionUpdateQueryParamsPayload): RouterActionUpdateQueryParams => {
  window.history.pushState({}, '', `${window.location.origin}${window.location.pathname}${payload.queryParams}`);
  const queryParams = convertSearchQueryToQueryParams(payload.queryParams);

  return {
    queryParams,
    type: UPDATE_QUERY_PARAMS,
  };
};
