import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  FormattedMessage,
} from 'react-intl';

/**
 * A selectable label component
 *
 * @class Pill
 * @extends {React.Component}
 */
class Pill extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    counter: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    selected: false,
  }

  render() {
    const { counter, text } = this.props;

    return (
      <div
        className={
          classnames({
            "filter-pill": true,
            [this.props.className]: true,
            'selected': this.props.selected,
            'disabled': this.props.disabled,
          })
        }
        onClick={
          () => {
            if (!this.props.disabled) {
              this.props.onChange(this.props.id);
            }
          }
        }
      >
        {counter !== null &&
          <span>{counter} </span>
        }
        <FormattedMessage id={text} defaultMessage={text} />
      </div>
    );
  }
}

export default Pill;
