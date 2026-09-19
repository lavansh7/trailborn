import { trek } from '../data/trek';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__brand">
          <img src="/assets/logo/logo.png" alt="TrailBorn" className="footer__logo-img" />
          <p className="footer__tagline">{trek.footerTagline}</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a className="footer__link" href="mailto:3_favours_glads@icloud.com">
              3_favours_glads@icloud.com
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} TrailBorn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
