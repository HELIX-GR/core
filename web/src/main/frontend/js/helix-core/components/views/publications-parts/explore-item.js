import * as React from 'react';
import * as PropTypes from 'prop-types';

class ExploreItem extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    const { description, image, text } = this.props;

    return (
      <div className="explore-item">
        <div className="featured-pubs-icon">
          <img src={image} alt="" />
        </div>
        <h3 className="featured-pubs-title">
          <a href='' onClick={(e) => e.preventDefault()} >
            {text}
          </a>
        </h3>
        <div className="explore-description">
          {description}
        </div>
      </div>
    );
  }
}

export default ExploreItem;
