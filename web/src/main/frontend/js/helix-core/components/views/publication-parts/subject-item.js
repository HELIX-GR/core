import * as React from 'react';
import * as PropTypes from 'prop-types';

class SubjectItem extends React.Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    const { image, text } = this.props;

    return (
      <a href="#">
        <div className="subject-item">
          <div className="featured-pubs-icon">
            <img src={image} alt="" />
          </div>
          <h3 className="featured-pubs-title">
            <a href="#">
              {text}
            </a>
          </h3>
        </div>
      </a>
    );
  }
}

export default SubjectItem;
