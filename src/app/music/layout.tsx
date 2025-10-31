'use client';

import { ReactNode } from 'react';
import styles from './musicLayout.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}