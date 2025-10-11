'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './filter.module.css';
import Button from '../UI/Button/Button';
import FilterItem from '../FilterItem/FilterItem';
import { data } from '@/data';
import { getUniqueValueBeKey } from '@/utils/helper';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const authors = getUniqueValueBeKey(data, 'author');
  const genres = getUniqueValueBeKey(data, 'genre');
  const years = Array.from(
    new Set(data.map((track) => track.release_date.slice(0, 4))),
  );

  const toggleFilter = (name: string) => {
    setActiveFilter((prev) => (prev === name ? null : name));
  };
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        setActiveFilter(null);
      }
    }

    if (activeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  return (
    <div className={styles.centerblock__filter} ref={popupRef}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__buttons}>
        <div style={{ position: 'relative' }}>
          <Button
            nameFilter="исполнителю"
            activeFilter={activeFilter}
            onClick={() => toggleFilter('исполнителю')}
          />
          {activeFilter === 'исполнителю' && (
            <FilterItem
              title="Исполнители"
              list={authors}
              onClose={() => setActiveFilter(null)}
            />
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <Button
            nameFilter="году выпуска"
            activeFilter={activeFilter}
            onClick={() => toggleFilter('году выпуска')}
          />
          {activeFilter === 'году выпуска' && (
            <FilterItem
              title="Годы"
              list={years} 
              onClose={() => setActiveFilter(null)}
            />
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <Button
            nameFilter="жанру"
            activeFilter={activeFilter}
            onClick={() => toggleFilter('жанру')}
          />
          {activeFilter === 'жанру' && (
            <FilterItem
              title="Жанры"
              list={genres}
              onClose={() => setActiveFilter(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}