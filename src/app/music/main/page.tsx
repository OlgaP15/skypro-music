"use client";

import { getTracks } from '@/app/services/tracks/tracksApi';
import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { TrackTypes } from '@/SharedTypes/sharedTypes';

export default function Home() {
  const [tracks, setTracks] = useState<TrackTypes[]>([]);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        console.error('Error fetching tracks:', error);
        // Можно добавить обработку ошибок, например, показать уведомление
      });
  }, []); // Добавлен пустой массив зависимостей

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}