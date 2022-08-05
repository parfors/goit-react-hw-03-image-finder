import { ApiService, Button, Galery, GaleryItem } from 'components';
import { Component } from 'react';

export class App extends Component {
  state = {
    components: '',
  };

  componentDidMount() {}

  render() {
    const api = new ApiService();
    return (
      <>
        <Galery>
          <GaleryItem />
        </Galery>
        <Button />
      </>
    );
  }
}
