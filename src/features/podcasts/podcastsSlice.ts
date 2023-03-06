import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from '../../app/store';
import { PodcastEpisodesList, PodcastInfo, PodcastInfoDetailed } from '../../constants/types';
import { dateStringIsOlderThanADay } from '../../utils/dateStringIsOlderThanADay';
import { fetchEpisodes, fetchPodcast, fetchPodcasts } from './podcastsAPI';

export interface PodcastsState {
  list: PodcastInfo[];
  fetchedAtList: string | null;
  status: 'idle' | 'loading' | 'failed';
  detailedList: {
    [id: string]: PodcastInfoDetailed;
  },
  episodesList: {
    [id: string]: PodcastEpisodesList;
  }
}

const initialState: PodcastsState = {
  list: [],
  status: 'idle',
  fetchedAtList: null, // Create a date in 1970, so it's always older than any other date,
  detailedList: {},
  episodesList: {},
};

export const fetchPodcastsAsync = createAsyncThunk(
  'podcasts/fetchPodcasts',
  async () => {
    const fetchedAt = store.getState().podcasts.fetchedAtList
    if (!fetchedAt || dateStringIsOlderThanADay(fetchedAt)) {
      return store.getState().podcasts.list;
    }
    const response = await fetchPodcasts();
    return response.data;
  }
);

export const fetchPodcastAsync = createAsyncThunk(
  'podcasts/fetchPodcast',
  async (id: string) => {
    if (store.getState().podcasts.detailedList[id] && dateStringIsOlderThanADay(store.getState().podcasts.detailedList[id].fetchedAt)) {
      return store.getState().podcasts.detailedList[id];
    }
    const response = await fetchPodcast(id);
    return response.data;
  }
);

export const fetchEpisodesAsync = createAsyncThunk(
  'podcasts/fetchEpisodes',
  async (podcastId: string) => {
    if (store.getState().podcasts.episodesList[podcastId] && dateStringIsOlderThanADay(store.getState().podcasts.episodesList[podcastId].fetchedAt)) {
      return store.getState().podcasts.episodesList[podcastId];
    }
    const response = await fetchEpisodes(podcastId);
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
        state.fetchedAtList = new Date().toLocaleString();
      })
      .addCase(fetchPodcastsAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(fetchPodcastAsync.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(fetchPodcastAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const podcast = state.list.find((podcast) => podcast.id === action.payload.id)
        state.detailedList[action.payload.id] = {
          ...action.payload,
          title: podcast?.title,
          image: podcast?.image,
          author: podcast?.author,
          description: podcast?.description,
        }
      }
      )
      .addCase(fetchPodcastAsync.rejected, (state) => {
        state.status = 'failed';
      }
      );
    builder
      .addCase(fetchEpisodesAsync.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(fetchEpisodesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.episodesList[action.payload.podcastId] = action.payload;
      }
      )
      .addCase(fetchEpisodesAsync.rejected, (state) => {
        state.status = 'failed';
      }
      );
  },
});

export const selectPodcastsList = (state: RootState) => state.podcasts.list;
export const selectPodcastDetailed = (id: string) => (state: RootState) => state.podcasts.detailedList[id];
export const selectPodcastEpisodes = (id: string) => (state: RootState) => state.podcasts.episodesList[id]?.episodes;

export default podcastsSlice.reducer;
