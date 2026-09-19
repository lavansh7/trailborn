import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a href="#" className="site-header__logo-link">
          <img src="/assets/logo/logo.png" alt="TrailBorn Logo" className="site-header__logo" />
        </a>
      </div>
    </header>
  );
}
