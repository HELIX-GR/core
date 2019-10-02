import * as React from 'react';

import {
  EnumPostCategory,
} from '../../model';

import {
  Posts,
} from './wordpress-parts';

class Actions extends React.Component {

  render() {
    return (
      <Posts category={EnumPostCategory.Actions} />
    );
  }

}

export default Actions;
