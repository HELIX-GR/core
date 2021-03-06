import * as React from 'react';

import {
  EnumPostCategory,
} from '../../model';

import {
  PostDetails,
} from './wordpress-parts';

class NewsDetails extends React.Component {

  render() {
    return (
      <PostDetails category={EnumPostCategory.News} match={this.props.match} />
    );
  }

}

export default NewsDetails;
