import css from './ImageGalery.module.css';
import { Component } from 'react';
import { ApiService, GaleryItem } from 'components';

export class Galery extends Component {
  api = new ApiService();

  state = {
    images: null,
  };

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState !== this.state) {
  //       this.api.getFitData('cat').then(data => this.setState({ images: data }));
  //     }
  //   }
  componentDidMount() {
    this.api.getFitData('cat').then(data => this.setState({ images: data }));
  }

  render() {
    // const { children } = this.props;
    const { images } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {images ? (
            images.map(({ id, webformatURL }, index) => (
              <GaleryItem key={index} webUrl={webformatURL} id={id} />
            ))
          ) : (
            <p>Good</p>
          )}
        </ul>
      </>
    );
  }
}
