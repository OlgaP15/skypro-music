'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {user ? user.username : 'Гость'}
        </p>
        <div className={styles.sidebar__icon} onClick={handleLogout} title="Выйти">
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>

      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/1">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
