import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk, store } from '../../app/store';
import { PodcastInfo } from '../../constants/types';
import { fetchPodcasts } from './podcastsAPI';

export interface PodcastsState {
  list: PodcastInfo[];
  fetchedAtList: Date;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PodcastsState = {
  list: [],
  status: 'idle',
  fetchedAtList: new Date(0), // Create a date in 1970, so it's always older than any other date
};

export const fetchPodcastsAsync = createAsyncThunk(
  'podcasts/fetchPodcasts',
  async () => {
    if (store.getState().podcasts.fetchedAtList > new Date(Date.now() - 1000 * 60 * 60)) {
      return store.getState().podcasts.list;
    }
    const response = await fetchPodcasts();
    return response.data;
  }
);

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcastsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPodcastsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchPodcastsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPodcastsList = (state: RootState) => state.podcasts.list;

export default podcastsSlice.reducer;
