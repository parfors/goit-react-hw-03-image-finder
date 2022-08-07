import css from './ImageGallery.module.css';
import { Component } from 'react';
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

  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    modalImg: '',
    isOpen: false,
  };

  // componentDidMount() {
  //   this.api.getFitData('cat').then(data => this.setState({ images: data }));
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      this.api
        .getImg(searchQuery, page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
          console.log(data);
        })
        .finally(this.setState({ loading: false }));
    }
  }

  onSubmit = data => {
    this.setState({
      searchQuery: data,
      images: [],
      page: 1,
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

  closeMadal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { images, loading, isOpen, modalImg } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />

        {images.length === 0 && (
          <p className={css.galleryText}>Hello try to find some images</p>
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

        {images.length > 0 && !loading && (
          <span className={css.galleryText}>
            <Button onClick={this.loadMore} />
          </span>
        )}
        {loading && (
          <span className={css.galleryText}>
            <Loader visible={loading} />
          </span>
        )}
        {isOpen && <Modal modalImg={modalImg} onClose={this.closeMadal} />}
      </>
    );
  }
}
