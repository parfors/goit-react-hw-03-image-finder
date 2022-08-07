import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = ({ visible }) => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#3f51b5"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass={css.Loader}
      visible={visible}
    />
  );
};
