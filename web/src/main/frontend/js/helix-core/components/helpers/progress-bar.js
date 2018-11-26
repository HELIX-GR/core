import * as React from 'react';
import PropTypes from 'prop-types';

export class ProgressBar extends React.Component {

  static propTypes = {
    value: PropTypes.number,
    width: PropTypes.string,
    color: PropTypes.string,
    fill: PropTypes.string,
  }

  static defaultProps = {
    value: 0,
    width: '100%',
    color: '#67676A',
    fill: '#F95F85'
  }

  render() {
    const { color, fill, value, width } = this.props;
    const text = `${Math.round(value)}%`;

    return (
      <div style={{ color, width, border: `1px solid ${fill}` }} className="hx-progress-bar">
        <div className="hx-filled" style={{ background: fill, borderTop: `1px solid ${fill}`, width: `${Math.min(value, 100)}%` }}>
          <div className="hx-filled-text" style={{ width }}>
            {text}
          </div>
        </div>
        {text}
      </div>
    );
  }
}

export default ProgressBar;
