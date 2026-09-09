import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={style.footer}>
        <Link to={'/'}>
          <img
            className={style.footerimg}
            src="/img/Nice-Gadgets.svg"
            alt="Logo"
          />
        </Link>
        <ul className={style.footerlist}>
          <li className={style.footerListItem}>
            <Link
              className={style.footerLink}
              to={'https://github.com/LimeRider'}
            >
              Github
            </Link>
          </li>
          <li className={style.footerListItem}>
            <Link className={style.footerLink} to={'tel:+380123456789'}>
              Contacts
            </Link>
          </li>
          <li className={style.footerListItem}>
            <Link className={style.footerLink} to={'/'}>
              rights
            </Link>
          </li>
        </ul>
        <div className={style.backToTop}>
          <p className={style.backToTopText}>Back to top</p>
          <button
            className={style.buttonbackToTop}
            onClick={scrollToTop}
            title="Up"
          >
            ^
          </button>
        </div>
      </div>
    </>
  );
};
