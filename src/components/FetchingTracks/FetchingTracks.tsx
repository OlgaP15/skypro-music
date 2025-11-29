'use client';

import { getTracks } from '@/app/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  loadFavoriteTracksAPI // ИЗМЕНЕНО: Используем API thunk
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);
  const { isAuth } = useAppSelector((state) => state.auth); // ДОБАВЛЕНО: Проверяем авторизацию

  useEffect(() => {
    // ИЗМЕНЕНО: Загружаем избранные треки через API только если пользователь авторизован
    if (isAuth) {
      dispatch(loadFavoriteTracksAPI());
    }

    if (allTracks.length === 0) {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(setFetchError(error.response.data));
          } else if (error.request) {
            dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
          } else {
            dispatch(setFetchError('Неизвестная ошибка'));
          }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, [allTracks.length, dispatch, isAuth]); // ДОБАВЛЕНО: isAuth в зависимостях
  
  return <></>;
}