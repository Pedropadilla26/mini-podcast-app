import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import podcastsReducer from '../features/podcasts/podcastsSlice';
import storage from 'redux-persist/es/storage'
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
  reducer: {
    podcasts: persistReducer(persistConfig, podcastsReducer),
  },
});

persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
