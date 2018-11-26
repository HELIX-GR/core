import * as React from 'react';

import {
  EnumPostCategory,
} from '../../model';

import {
  PostDetails,
} from './wordpress-parts';

class EventsDetails extends React.Component {

  render() {
    return (
      <PostDetails category={EnumPostCategory.Events} match={this.props.match} />
    );
  }

}

export default EventsDetails;
