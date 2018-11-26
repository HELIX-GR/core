import * as React from 'react';

import {
  EnumPostCategory,
} from '../../model';

import {
  Posts,
} from './wordpress-parts';

class Events extends React.Component {

  render() {
    return (
      <Posts category={EnumPostCategory.Events} />
    );
  }

}

export default Events;
