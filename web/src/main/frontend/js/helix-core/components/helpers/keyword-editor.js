import React from 'react';
import * as PropTypes from 'prop-types';

import CreatableSelect from 'react-select/lib/Creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const customStyles = {
  control: (base, state) => {
    return {
      ...base,
      boxShadow: 'none',
      border: 'none',
      borderBottom: '2px solid #707070',
      borderRadius: '0px',
      backgroundColor: 'transparent',
      ':hover': {
        border: 'none',
        borderBottom: '2px solid #707070',
      },
    };
  },
  indicatorsContainer: (base, state) => ({
    ...base,
    display: 'inline',
  }),
  multiValueRemove: (base, state) => ({
    ...base,
    ':hover': {
      backgroundColor: 'none',
    },
    cursor: 'pointer',
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: '17px',
    lineHeight: '20px',
    fontWeight: '300',
    color: '#707070',
  }),
};

export default class KeywordEditor extends React.Component {

  constructor() {
    super();

    this.state = {
      inputValue: '',
    };

  }

  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    placeholder: '',
    value: [],
  }

  onChange(options) {
    const keywords = options.map(option => option.value);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(keywords);
    }
  }

  onInputChange(inputValue) {
    this.setState({
      inputValue
    });
  }

  onKeyDown(event) {
    const { value = [] } = this.props;
    const { inputValue } = this.state;

    if (!inputValue) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        // Reject duplicates
        if (!value.find(keyword => keyword === inputValue)) {
          this.setState({
            inputValue: '',
          });
          if (typeof this.props.onChange === 'function') {
            this.props.onChange([...this.props.value, inputValue]);
          }
        }
        event.preventDefault();
    }
  }

  render() {
    const { value } = this.props;
    const { inputValue } = this.state;

    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(e) => this.onChange(e)}
        onInputChange={(e) => this.onInputChange(e)}
        onKeyDown={(e) => this.onKeyDown(e)}
        placeholder={this.placeholder}
        styles={customStyles}
        value={value.map(v => createOption(v))}
      />
    );
  }
}
