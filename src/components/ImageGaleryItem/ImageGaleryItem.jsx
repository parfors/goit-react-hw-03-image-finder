import css from './ImageGaleryItem.module.css';

export const GaleryItem = ({ id, webUrl }) => {
  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          //   id={id}
          src={webUrl}
          alt=""
        />
      </li>
    </>
  );
};
