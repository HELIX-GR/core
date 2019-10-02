import * as React from 'react';

import {
  EnumPostCategory,
} from '../../model';

import {
  PostDetails,
} from './wordpress-parts';

class ActionDetails extends React.Component {

  render() {
    return (
      <PostDetails category={EnumPostCategory.Actions} match={this.props.match} />
    );
  }

}

export default ActionDetails;
