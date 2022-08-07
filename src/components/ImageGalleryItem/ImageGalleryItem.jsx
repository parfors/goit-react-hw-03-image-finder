import css from './ImageGalleryItem.module.css';
import { Component } from 'react';

export class GalleryItem extends Component {
  clickHandler = () => {
    this.props.onClick(this.props.largeImageURL);
  };

  render() {
    const { webUrl } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            onClick={this.clickHandler}
            className={css.ImageGalleryItemImage}
            src={webUrl}
            alt=""
          />
        </li>
      </>
    );
  }
}
