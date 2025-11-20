'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentPlaylist } from '@/store/features/trackSlice';
import { usePathname } from 'next/navigation'; // ДОБАВЛЕНО: для определения текущей страницы

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const { allTracks, favoriteTracks } = useAppSelector((state) => state.tracks);
  const pathname = usePathname(); // ДОБАВЛЕНО: получаем текущий путь
  const isFavoritePage = pathname.includes('/favorites'); // ДОБАВЛЕНО: проверяем страницу избранного

  // ОБНОВЛЕНО: используем разные наборы треков для разных страниц
  const availableTracks = isFavoritePage ? favoriteTracks : allTracks;

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // ОБНОВЛЕНО: эффект для поиска с учетом страницы
  useEffect(() => {
    if (!searchInput.trim()) {
      // Если поисковая строка пустая, показываем все доступные треки для текущей страницы
      dispatch(setCurrentPlaylist(availableTracks));
      return;
    }

    const searchTerm = searchInput.toLowerCase().trim();
    
    // Фильтруем треки по названию и исполнителю
    const filteredTracks = availableTracks.filter(track => 
      track.name.toLowerCase().includes(searchTerm) ||
      track.author.toLowerCase().includes(searchTerm)
    );

    dispatch(setCurrentPlaylist(filteredTracks));
  }, [searchInput, availableTracks, dispatch]);

  // ДОБАВЛЕНО: сбрасываем поиск при смене страницы
  useEffect(() => {
    setSearchInput('');
  }, [pathname]);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}