import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../../context/useLanguage';
import roomsData from '../../data/roomsData';
import { getLikedRooms, saveLikedRooms } from '../../utils/likedRooms';
import './liked.css';

function hydrateLikedRooms(savedRooms) {
  return savedRooms
    .map((savedRoom) => {
      const currentRoom = roomsData.find((room) => room.id === savedRoom.id);
      return currentRoom ? { ...savedRoom, ...currentRoom } : savedRoom;
    })
    .filter((room) => room?.id);
}

export default function Liked() {
  const { t } = useLanguage();
  const [likedRooms, setLikedRooms] = useState(() => hydrateLikedRooms(getLikedRooms()));

  const removeLikedRoom = (roomId) => {
    const nextLikedRooms = likedRooms.filter((room) => room.id !== roomId);
    setLikedRooms(hydrateLikedRooms(saveLikedRooms(nextLikedRooms)));
  };

  return (
    <div className='liked-page'>
      <header className='liked-header'>
        <h2>{t('liked.pageTitle')}</h2>
        <p>{t('liked.pageSubtitle')}</p>
      </header>

      {likedRooms.length > 0 ? (
        <div className='liked-grid'>
          {likedRooms.map((room) => (
            <article key={room.id} className='liked-card'>
              <Link to={`/rooms/${room.id}`} className='liked-image-link'>
                <img src={room.image} alt={t(room.titleKey)} className='liked-room-image' />
                <span className='liked-price-badge'>
                  {room.price}<span> {t('rooms.perNight')}</span>
                </span>
              </Link>

              <div className='liked-card-content'>
                <div className='liked-card-heading'>
                  <h3>{t(room.titleKey)}</h3>
                  <button
                    type='button'
                    className='liked-remove-heart'
                    aria-label={`${t('liked.remove')} ${t(room.titleKey)}`}
                    onClick={() => removeLikedRoom(room.id)}
                  >
                    <span aria-hidden='true'>♥</span>
                  </button>
                </div>

                <p>{t(room.descriptionKey)}</p>

                <ul className='liked-features'>
                  {room.featureKeys.slice(0, 3).map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>

                <div className='liked-card-actions'>
                  <Link to={`/rooms/${room.id}`} className='liked-details-link'>
                    {t('liked.viewDetails')}
                    <span aria-hidden='true'>→</span>
                  </Link>

                  <button
                    type='button'
                    className='liked-remove-btn'
                    onClick={() => removeLikedRoom(room.id)}
                  >
                    {t('liked.remove')}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='liked-empty-state'>
          <div className='liked-empty-icon' aria-hidden='true'>♡</div>
          <h3>{t('liked.emptyMessage')}</h3>
          <Link to='/rooms' className='liked-back-link'>
            {t('liked.backToRooms')}
          </Link>
        </div>
      )}
    </div>
  );
}
