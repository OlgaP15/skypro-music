"use client";

import { getTracks } from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { TrackTypes } from '@/SharedTypes/sharedTypes';
import styles from '../musicLayout.module.css';

export default function Home() {
  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        const tracksData = await getTracks();
        setTracks(tracksData);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Не удалось загрузить треки. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Загрузка треков...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error}</div>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return <Centerblock tracks={tracks} />;
}