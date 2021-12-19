import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../../api/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (id, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.deleteContacts(id);
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createContacts = createAsyncThunk(
  'contacts/createContacts',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.createContacts({ name, number });
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
