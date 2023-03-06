import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from '../../app/store';
import { PodcastEpisodesList, PodcastInfo, PodcastInfoDetailed } from '../../constants/types';
import { fetchEpisodes, fetchPodcast, fetchPodcasts } from './podcastsAPI';

export interface PodcastsState {
  list: PodcastInfo[];
  fetchedAtList: Date;
  status: 'idle' | 'loading' | 'failed';
  detailedList: {
    [id: string]: PodcastInfoDetailed;
  },
  episodesList: {
    [id: string]: PodcastEpisodesList;
  }
}

export interface FetchEpisodesArgs {
  podcastId: string;
  collectionId: string;
}

const initialState: PodcastsState = {
  list: [],
  status: 'idle',
  fetchedAtList: new Date(0), // Create a date in 1970, so it's always older than any other date,
  detailedList: {},
  episodesList: {},
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

export const fetchPodcastAsync = createAsyncThunk(
  'podcasts/fetchPodcast',
  async (id: string) => {
    if (store.getState().podcasts.detailedList[id] && store.getState().podcasts.detailedList[id].fetchedAt > new Date(Date.now() - 1000 * 60 * 60)) {
      return store.getState().podcasts.detailedList[id];
    }
    const response = await fetchPodcast(id);
    return response.data;
  }
);

export const fetchEpisodesAsync = createAsyncThunk(
  'podcasts/fetchEpisodes',
  async ({podcastId, collectionId}: FetchEpisodesArgs) => {
    if (store.getState().podcasts.episodesList[collectionId] && store.getState().podcasts.episodesList[collectionId].fetchedAt > new Date(Date.now() - 1000 * 60 * 60)) {
      return store.getState().podcasts.episodesList[collectionId];
    }
    const response = await fetchEpisodes({podcastId, collectionId});
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
    builder
      .addCase(fetchPodcastAsync.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(fetchPodcastAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.detailedList[action.payload.id] = action.payload;
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
export const selectPodcastEpisodes = (id: string) => (state: RootState) => state.podcasts.episodesList[id];

export default podcastsSlice.reducer;
