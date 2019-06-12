/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {Reducer} from 'redux';
import {OPEN_SNACKBAR, CLOSE_SNACKBAR, UPDATE_DRAWER_STATE} from '../actions/app';
import {RootAction} from '../store';

export interface AppState {
  drawerOpened: boolean;
  snackbarOpened: boolean;
}

const INITIAL_STATE: AppState = {
  drawerOpened: false,
  snackbarOpened: false,
};

const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened,
      };
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false,
      };
    default:
      return state;
  }
};

export default app;
