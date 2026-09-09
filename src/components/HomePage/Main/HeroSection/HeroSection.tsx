import { HeroCarousel } from './HeroCarousel';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.contentContainer}>
          <h1 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h1>

          <HeroCarousel />
        </div>
      </div>
    </>
  );
};
