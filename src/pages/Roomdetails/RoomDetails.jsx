import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import useLanguage from '../../context/useLanguage';
import './RoomDetails.css';
import first1 from "../../assets/houses/firstHouse/first.jpeg"
import first2 from "../../assets/houses/firstHouse/second.jpeg"
import first3 from "../../assets/houses/firstHouse/third.jpeg"
import first4 from "../../assets/houses/firstHouse/fourth.jpeg"
import first5 from "../../assets/houses/firstHouse/fifth.jpeg"
import second1 from "../../assets/houses/secondHouse/first.jpeg"
import second2 from "../../assets/houses/secondHouse/second.jpeg"
import second3 from "../../assets/houses/secondHouse/third.jpeg"
import second4 from "../../assets/houses/secondHouse/fourth.jpeg"
import second5 from "../../assets/houses/secondHouse/fifght.jpeg"
import second6 from "../../assets/houses/secondHouse/Sixth.jpeg"
import second7 from "../../assets/houses/secondHouse/seventh.jpeg"
import third1 from "../../assets/houses/third/first.jpeg"
import third2 from "../../assets/houses/third/second.jpeg"
import third3 from "../../assets/houses/third/third.jpeg"
import third4 from "../../assets/houses/third/fourth.jpeg"
import third5 from "../../assets/houses/third/fifght.jpeg"
import third6 from "../../assets/houses/third/sisth.jpeg"
import third7 from "../../assets/houses/third/seventh.jpeg"

const roomPrices = {
  'standard-double':  '₾250',
  'deluxe-king-suite': '₾250',
  'family-apartment':  '₾250'
};

const roomImages = {
  'standard-double': [first1, first2, first3, first4, first5],
  'deluxe-king-suite': [second1, second2, second3, second4, second5, second6, second7],
  'family-apartment': [third1, third2, third3, third4, third5, third6, third7]
};

const emptyImages = [];

export default function RoomDetail() {
  const { id } = useParams();
  const { t } = useLanguage();

  const roomData = t(`roomDetails.rooms.${id}`);
  const images = roomImages[id] ?? emptyImages;
  const [selectedImages, setSelectedImages] = useState({});
  const selectedImg = selectedImages[id] || images[0] || '';

  if (typeof roomData !== 'object') {
    return (
      <div className="room-not-found">
        <h2>{t('roomDetails.notFound')}</h2>
        <Link to="/rooms" className="back-link">← {t('roomDetails.backBtn')}</Link>
      </div>
    );
  }

  const title       = t(`roomDetails.rooms.${id}.title`);
  const description = t(`roomDetails.rooms.${id}.description`);
  const amenities   = t(`roomDetails.rooms.${id}.amenities`);
  const price       = roomPrices[id];

  return (
    <div className="room-detail-page">
      <Link to="/rooms" className="back-to-list-btn">
        <span>←</span> {t('roomDetails.backBtn')}
      </Link>

      <div className="room-detail-container">
        <div className="media-section">
          <div className="main-image-container">
            <img src={selectedImg} alt={title} className="main-display-img" />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} ${index + 1}`}
                  className={`thumb-img ${selectedImg === img ? 'selected' : ''}`}
                  onClick={() => setSelectedImages((selected) => ({ ...selected, [id]: img }))}
                />
              ))}
            </div>
          )}
        </div>

        <div className="room-content-section">
          <h1 className="room-detail-title">{title}</h1>
          <div className="room-detail-price">
            {price}<span> / {t('roomDetails.perNight')}</span>
          </div>

          <p className="room-detail-description">{description}</p>

          <hr className="divider" />

          <div className="amenities-section">
            <h3>{t('roomDetails.amenitiesTitle')}</h3>
            <ul className="amenities-grid">
              {Array.isArray(amenities) && amenities.map((amenity, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span> {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
