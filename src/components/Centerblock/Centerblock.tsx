'use client'; 

import styles from './centerblock.module.css';
import classnames from 'classnames';
import Search from '../Search/Search';
import { data } from '@/data';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { useAppDispatch } from '@/store/store';
import { setCurrentPlaylist } from '@/store/features/trackSlice';
import { useEffect } from 'react';

export default function Centerblock() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPlaylist(data));
  }, [dispatch]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track, index) => (
            <Track track={track} key={track._id} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}