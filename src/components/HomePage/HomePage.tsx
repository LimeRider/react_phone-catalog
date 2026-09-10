import '../../App.scss';
import { HeroSection } from './Main/HeroSection';
import { HotPrice } from './Main/HotPrice';
import { NewModel } from './Main/NewModels';
import { Categories } from './Main/Categories';

export const HomePage = () => {
  return (
    <>
      <main className="main">
        <h1 className="visuallyHidden">Product Catalog</h1>
        <HeroSection />
        <NewModel />
        <Categories />
        <HotPrice />
      </main>
    </>
  );
};
