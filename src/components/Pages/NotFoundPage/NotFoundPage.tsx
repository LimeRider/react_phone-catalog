import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <h1 className={style.titleNFP}>Page not found</h1>;
      <img
        className={style.imgNFP}
        src="img/page-not-found.png"
        alt="Page not found"
      />
      ;
    </>
  );
};
