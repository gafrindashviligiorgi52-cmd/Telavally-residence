import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../../context/useLanguage';
import roomsData from '../../data/roomsData';
import { getLikedRooms, toggleLikedRoom } from '../../utils/likedRooms';
import './Rooms.css';

export default function Rooms() {
  const { t } = useLanguage();
  const [likedRooms, setLikedRooms] = useState(() => getLikedRooms());

  const handleToggleLike = (event, room) => {
    event.preventDefault();
    event.stopPropagation();
    setLikedRooms(toggleLikedRoom(room));
  };

  return (
    <div className='rooms-page'>
      <div className='rooms-header'>
        <h2>{t('rooms.pageTitle')}</h2>
        <p>{t('rooms.pageSubtitle')}</p>
      </div>

      <div className='rooms-grid'>
        {roomsData.map((room) => {
          const liked = likedRooms.some((likedRoom) => likedRoom.id === room.id);

          return (
            <article key={room.id} className={`room-card ${liked ? 'liked' : ''}`}>
              <div className='room-image-wrapper'>
                <Link
                  to={`/rooms/${room.id}`}
                  className='room-image-link'
                  aria-label={t(room.titleKey)}
                >
                  <img src={room.image} alt={t(room.titleKey)} className='room-image' />
                  <div className='room-price-badge'>
                    {room.price}<span> {t('rooms.perNight')}</span>
                  </div>
                </Link>

                <button
                  type='button'
                  className={`room-like-btn ${liked ? 'liked' : ''}`}
                  aria-label={liked ? t('liked.unlikeRoom') : t('liked.addRoom')}
                  aria-pressed={liked}
                  title={liked ? t('liked.unlikeRoom') : t('liked.addRoom')}
                  onClick={(event) => handleToggleLike(event, room)}
                >
                  <span aria-hidden='true'>{liked ? '♥' : '♡'}</span>
                </button>
              </div>

              <div className='room-info'>
                <Link to={`/rooms/${room.id}`} className='room-title-link'>
                  <h3>{t(room.titleKey)}</h3>
                </Link>

                <ul className='room-features'>
                  {room.featureKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>

                <Link to={`/rooms/${room.id}`} className='room-details-link'>
                  {t('liked.viewDetails')}
                  <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
