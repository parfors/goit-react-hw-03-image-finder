import css from './ImageGallery.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import {
  ApiService,
  GalleryItem,
  SearchBar,
  Button,
  Loader,
  Modal,
} from 'components';
export class Gallery extends Component {
  api = new ApiService();
  modalEl = document.querySelector('#modal-root');

  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    showBtn: true,
    modalImg: '',
    isOpen: false,
    noImgError: false,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, images } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      this.api
        .getImg(searchQuery, page)
        .then(data => {
          if (data.totalHits === 0) {
            this.setState({ noImgError: true });
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showBtn: !(data.totalHits === images.length),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(this.setState({ loading: false }));
    }
  }

  onSubmit = data => {
    this.setState({
      searchQuery: data,
      loading: true,
      images: [],
      page: 1,
      noImgError: false,
      error: false,
      showBtn: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  clickImgHandler = data => {
    this.setState({
      modalImg: data,
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { images, loading, isOpen, modalImg, noImgError, error, showBtn } =
      this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        {!noImgError && !loading && images.length === 0 && (
          <p className={css.galleryText}>Hello try to find some images</p>
        )}
        {noImgError && (
          <p className={css.galleryText}>There is no images for this query</p>
        )}
        {error && (
          <p className={css.galleryText}>
            Something went wrong. Please try again later {error}
          </p>
        )}
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <GalleryItem
              key={id}
              webUrl={webformatURL}
              largeImageURL={largeImageURL}
              onClick={this.clickImgHandler}
            />
          ))}
        </ul>
        {images.length > 0 && !loading && showBtn && (
          <span className={css.galleryText}>
            <Button disabled={loading} onClick={this.loadMore} />
          </span>
        )}
        {loading && (
          <span className={css.galleryText}>
            <Loader visible={loading} />
          </span>
        )}
        {createPortal(
          isOpen && <Modal modalImg={modalImg} onClose={this.closeModal} />,
          this.modalEl
        )}
      </>
    );
  }
}
