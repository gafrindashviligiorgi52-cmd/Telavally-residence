import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useLanguage from '../../context/useLanguage';
import './Header.css';
import pfpImage from '../../assets/avatar/pfp.png';
import georgiaFlag from '../../assets/icons/georgia.png';
import ukFlag from '../../assets/icons/united-kingdom.png';

// ─── Constants ────────────────────────────────────────────────────────────────

const NAVIGATION = [
  { path: '/',        labelKey: 'navbar.home',    end: true  },
  { path: '/rooms',   labelKey: 'navbar.rooms',   end: false },
  { path: '/gallery', labelKey: 'navbar.gallery', end: false },
  { path: '/liked',   labelKey: 'navbar.liked',   end: true  },
];

const LANGUAGES = [
  { code: 'ka', flag: georgiaFlag, label: 'KA', title: 'ქართული' },
  { code: 'en', flag: ukFlag,      label: 'EN', title: 'English'  },
];

// ─── Custom Hooks ─────────────────────────────────────────────────────────────

/**
 * Tracks scroll position and derives `scrolled` + `hidden` states.
 */
function useScrollBehaviour(scrollThreshold = 50, hideThreshold = 150) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > scrollThreshold);
      setHidden(y > lastScrollY.current && y > hideThreshold);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold, hideThreshold]);

  return { scrolled, hidden };
}

/**
 * Returns a normalised { x, y } mouse position relative to a DOM element,
 * ranging from -1 to +1 on each axis. Resets to { x:0, y:0 } on leave.
 */
function useMagneticTilt(elementRef) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rect,     setRect]     = useState(null);

  useEffect(() => {
    const updateRect = () => {
      if (elementRef.current) setRect(elementRef.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [elementRef]);

  const onMouseMove = (e) => {
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    });
  };

  const onMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return { mousePos, onMouseMove, onMouseLeave };
}

/**
 * Locks / unlocks body scroll based on a boolean flag.
 */
function useBodyScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Renders the two language-toggle buttons.
 * `onSelect`  – called with the language code on click.
 * `mobile`    – adds the `.mobile-lang` modifier class.
 */
function LangButtons({ language, onSelect, mobile = false }) {
  return (
    <>
      {LANGUAGES.map(({ code, flag, label, title }) => (
        <button
          key={code}
          className={[
            'lang-btn',
            language === code ? 'active' : '',
            mobile ? 'mobile-lang' : '',
          ].filter(Boolean).join(' ')}
          onClick={() => onSelect(code)}
          title={title}
        >
          <img src={flag} alt={label} className="lang-flag" />
          <span>{label}</span>
        </button>
      ))}
    </>
  );
}

/**
 * Single nav link shared between the desktop and mobile menus.
 * `index`   – used for the staggered CSS animation via `--i`.
 * `mobile`  – switches to mobile-specific class names and adds the number prefix.
 */
function NavItem({ path, labelKey, end, index, mobile = false, onClick }) {
  const { t } = useLanguage();
  const baseClass   = mobile ? 'mobile-nav-item' : 'nav-item';
  const activeClass = `${baseClass} active`;

  return (
    <li style={{ '--i': index }}>
      <NavLink
        to={path}
        end={end}
        className={({ isActive }) => isActive ? activeClass : baseClass}
        onClick={onClick}
      >
        {mobile && (
          <span className="mobile-nav-number">0{index + 1}</span>
        )}
        {!mobile && <span className="nav-text">{t(labelKey)}</span>}
        {!mobile && <span className="nav-bubble" aria-hidden="true" />}
        {mobile && t(labelKey)}
      </NavLink>
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef                          = useRef(null);
  const { scrolled, hidden }               = useScrollBehaviour();
  const { mousePos, onMouseMove, onMouseLeave } = useMagneticTilt(headerRef);

  useBodyScrollLock(menuOpen);

  const closeMenu = () => setMenuOpen(false);

  const tiltStyle = {
    transform: `
      perspective(1000px)
      rotateX(${-mousePos.y * 1.2}deg)
      rotateY(${ mousePos.x * 1.2}deg)
      ${scrolled ? 'scale(0.99)' : 'scale(1)'}
      ${hidden   ? 'translateY(-140%)' : 'translateY(0)'}
    `,
  };

  return (
    <>
      {/* ── Desktop Header ── */}
      <div
        ref={headerRef}
        className={`header ${scrolled ? 'scrolled' : ''}`}
        style={tiltStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="header-glow" aria-hidden="true" />

        {/* Logo */}
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src={pfpImage} alt="logo" className="logo" />
            <div className="logo-ring" aria-hidden="true" />
          </div>
          <h1 className="brand-name">{t('common.brandName')}</h1>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {NAVIGATION.map((item, i) => (
            <NavItem key={item.path} {...item} index={i} />
          ))}
        </ul>

        {/* Right side controls */}
        <div className="header-right">
          <div className="lang-buttons desktop-lang">
            <LangButtons language={language} onSelect={setLanguage} />
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="მენიუ"
            aria-expanded={menuOpen}
          >
            {['b1', 'b2', 'b3'].map(cls => (
              <span key={cls} className={`bar ${cls} ${menuOpen ? 'open' : ''}`} />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile Overlay ── */}
      <div
        className={`mobile-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={closeMenu}
      />

      {/* ── Mobile Slide Menu ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {NAVIGATION.map((item, i) => (
            <NavItem key={item.path} {...item} index={i} mobile onClick={closeMenu} />
          ))}
        </ul>

        <div className="mobile-lang-buttons">
          <LangButtons
            language={language}
            onSelect={(lang) => { setLanguage(lang); closeMenu(); }}
            mobile
          />
        </div>
      </div>
    </>
  );
}
