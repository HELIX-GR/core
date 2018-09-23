import React from 'react';
import * as PropTypes from 'prop-types';

import { default as ReactDatePicker } from 'react-datepicker';
import moment from '../../moment-localized';

const dateFormats = [
  "DD-MM-YYYY",
  "DD/MM/YYYY",
];

class DatePicker extends React.Component {

  constructor() {
    super();
  }

  static propTypes = {
    date: PropTypes.any,
    onChange: PropTypes.func,
  }

  handleChange(date) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(date ? date.isValid() ? date.format('YYYY-MM-DD') : null : null);
    }
  }

  handleChangeRaw(value) {
    const date = value ? moment(value, dateFormats) : null;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(date ? date.isValid() ? date.format('YYYY-MM-DD') : null : null);
    }
  }
  render() {
    const { value, onChange, ...rest } = this.props;
    const date = value ? moment(value) : null;

    return (
      <ReactDatePicker
        {...rest}
        dateFormat="DD/MM/YYYY"
        isClearable={true}
        onChange={(e) => this.handleChange(e)}
        onChangeRaw={(e) => this.handleChangeRaw(e.target.value)}
        selected={date ? date.isValid() ? date : null : null}
      />
    );
  }

}

export default DatePicker;
