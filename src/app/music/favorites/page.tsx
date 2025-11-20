'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import styles from '../musicLayout.module.css';
import { useEffect } from 'react';
import { loadFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/signin');
      return;
    }
    
    dispatch(loadFavoriteTracks());
  }, [dispatch, isAuth, router]);

  if (!isAuth) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Перенаправление...</div>
      </div>
    );
  }

  // ОБНОВЛЕНО: передаем isFavoritePage prop
  return <Centerblock tracks={favoriteTracks} title="Мои треки" isFavoritePage={true} />;
}