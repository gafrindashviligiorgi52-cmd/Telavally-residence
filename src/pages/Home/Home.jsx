import { useState, useEffect, useCallback, useRef } from "react";
import useLanguage from "../../context/useLanguage";
import "./Home.css";
import banner1 from "../../assets/images/bannerimg1.png";
import banner2 from "../../assets/images/bannerimg2.png";
import banner3 from "../../assets/images/bannerimg3.png";
import sauna from "../../assets/images/sauna.png";
import jacuzzi from "../../assets/images/jacuzzi.png";
import basketball from "../../assets/images/basketball.png";

const heroImages = [banner1, banner2, banner3];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroImages.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startTimer();
  };

  return (
    <div className="home-container">

      {/* ── HERO ── */}
      <section
        className="hero-section"
        aria-label={t("common.brandName")}
      >
        {heroImages.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt=""
            aria-hidden="true"
            className={`hero-image ${index === currentSlide ? "active" : ""}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        <div className="hero-overlay">
          <p>{t("home.welcomeSubtitle")}</p>
          <h2>{t("home.welcomeTitle")}</h2>

          <div
            className="slider-dots"
            role="tablist"
            aria-label="Slide navigation"
          >
            {heroImages.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                className={`dot ${index === currentSlide ? "active-dot" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery-section">
        <h3 className="section-title">{t("home.ourSpaces")}</h3>
        <div className="photos">
          <div className="photo-card">
            <img src={sauna}      alt={t("home.sauna")      || "Sauna"} loading="lazy" />
          </div>
          <div className="photo-card">
            <img src={jacuzzi}    alt={t("home.jacuzzi")    || "Jacuzzi"} loading="lazy" />
          </div>
          <div className="photo-card">
            <img src={basketball} alt={t("home.basketball") || "Basketball court"} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-section">
        <div className="footer-content">

          <div className="contact-info">
            <h4>{t("home.contactUs")}</h4>
            <p>
              <span aria-hidden="true">📍</span>
              {t("home.address")}
            </p>
            <p>
              <span aria-hidden="true">📞</span>
              <a href={`tel:${t("home.phone")}`} style={{ color: "inherit", textDecoration: "none" }}>
                {t("home.phone")}
              </a>
            </p>
            <p>
              <span aria-hidden="true">✉️</span>
              <a href={`mailto:${t("home.email")}`} style={{ color: "inherit", textDecoration: "none" }}>
                {t("home.email")}
              </a>
            </p>
          </div>

          <div className="social-links">
            <h4>{t("home.followUs")}</h4>
            <div className="social-buttons">
              <a
                href="https://www.instagram.com/telavalleyresidence/"
                target="_blank"
                rel="noreferrer noopener"
                className="social-item"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt=""
                  aria-hidden="true"
                />
                <span>{t("home.instagram")}</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100082167439226"
                target="_blank"
                rel="noreferrer noopener"
                className="social-item"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt=""
                  aria-hidden="true"
                />
                <span>{t("home.facebook")}</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── MAP ── */}
        <div className="footer-map">
          <div className="footer-map-header">
            <h4>{t("home.findUs")}</h4>
            <a
            href="https://www.google.com/maps/dir/?api=1&destination=41.9182525,45.5208489"
              target="_blank"
              rel="noreferrer noopener"
              className="directions-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              {t("home.getDirection")}
            </a>
          </div>
          <div className="map-wrapper">
            <iframe
              title="თელაველი რესიდენსი - ლოკაცია"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11896!2d45.5208489!3d41.9182525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4045cd3cec1cd631%3A0x87a9ec47d0b6ceaf!2sTelaValley%20Residence!5e0!3m2!1ska!2sge!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {t("common.brandName")}.{" "}
            {t("common.allRightsReserved")}.
          </p>
        </div>
      </footer>

    </div>
  );
}
