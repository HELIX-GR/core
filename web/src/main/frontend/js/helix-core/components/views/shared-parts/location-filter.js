import React from 'react';

import {
  FormattedMessage,
} from 'react-intl';


class LocationFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`location param-box ${this.props.className}`}>
        <h5 className="title">
          <FormattedMessage id="results.shared.search.location.title" />
        </h5>

        <div className="map-container">
          <img className="temp-map" src="/images/jpg/map.png" alt="" />
        </div>

      </div>
    );
  }

}

export default LocationFilter;
