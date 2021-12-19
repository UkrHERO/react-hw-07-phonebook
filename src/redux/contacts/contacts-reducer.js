import actions from './contacts-actions';
import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  fetchContacts,
  deleteContacts,
  createContacts,
} from './contacts-operations';

const items = createReducer([], {
  [fetchContacts.fulfilled]: (state, { payload }) => payload,
  [createContacts.fulfilled]: (state, { payload }) => {
    return [...state, payload];
  },
  [deleteContacts.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [createContacts.pending]: () => true,
  [createContacts.fulfilled]: () => false,
  [createContacts.rejected]: () => false,
  [deleteContacts.pending]: () => true,
  [deleteContacts.fulfilled]: () => false,
  [deleteContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchContacts.pending]: () => null,
  [createContacts.rejected]: (_, action) => action.payload,
  [createContacts.pending]: () => null,
  [deleteContacts.rejected]: (_, action) => action.payload,
  [deleteContacts.pending]: () => null,
});

const filter = createReducer('', {
  [actions.changeFilter]: (state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  isLoading,
  error,
});
