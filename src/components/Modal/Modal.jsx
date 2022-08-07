import css from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { modalImg, onClose } = this.props;
    return (
      <>
        <div onClick={onClose} className={css.Overlay}>
          <div className={css.Modal}>
            <img src={modalImg} alt="" />
          </div>
        </div>
      </>
    );
  }
}
