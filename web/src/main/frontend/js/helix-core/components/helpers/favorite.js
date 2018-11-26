import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  EnumCatalog
} from '../../model';

const catalogs = Object.keys(EnumCatalog).map(k => EnumCatalog[k]);

class Favorite extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    active: PropTypes.bool.isRequired,
    catalog: PropTypes.oneOf(catalogs).isRequired,
    description: PropTypes.string,
    handle: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  onClick(e) {
    e.preventDefault();

    const { catalog, handle, title, description, url } = this.props;

    this.props.onClick({
      catalog,
      description,
      handle,
      title,
      url,
    });
  }

  render() {
    const { active } = this.props;

    return (
      <div className={`btn-favorite ${active ? 'active' : ''}`}>
        <a onClick={(e) => this.onClick(e)} data-toggle="tooltip" data-placement="bottom" title="" >
          <img className="" src="/images/png/favorite.png" />
        </a>
      </div>
    );
  }
}

export default Favorite;
