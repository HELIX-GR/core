import * as React from 'react';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import Select from 'react-select';

import {
  EnumStyle as EnumCitationStyle,
  getCitation,
} from '../../../service/citation';

const citationOptions = [
  { value: EnumCitationStyle.ACM, label: 'acm', },
  { value: EnumCitationStyle.BIBTEX, label: 'bibtex', },
  { value: EnumCitationStyle.IEEE, label: 'ieee', },
  { value: EnumCitationStyle.CHICAGO, label: 'chicago', },
];

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
    display: 'flex',
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: '15px',
    lineHeight: '24px',
    fontWeight: '300',
    color: '#707070',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    cursor: isSelected ? 'default' : 'pointer',
    backgroundColor: isFocused ? '#DDDDDD' : isSelected ? '#DDDDDD' : base.backgroundColor,
    opacity: isSelected ? 1 : isFocused ? 0.5 : 1,
    color: '#707070',
    ':active': {
      backgroundColor: isFocused ? '#DDDDDD' : isSelected ? '#DDDDDD' : base.backgroundColor,
    }
  }),
};

class Citation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      citation: null,
    };
  }

  static propTypes = {
    publication: PropTypes.object.isRequired
  }

  createCitation(option) {
    if (option) {
      const { publication } = this.props;
      const citation = getCitation(publication, option.value);
      this.setState({ citation });
    } else {
      this.setState({ citation: null });
    }
  }

  render() {
    const { citation } = this.state;
    const _t = this.props.intl.formatMessage;

    return (
      <React.Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select-citation"
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name="citation-style"
          options={citationOptions}
          onChange={(e) => this.createCitation(e)}
          styles={customStyles}
          placeholder={_t({ id: 'publication.select-citation-style' })}
        />
        {citation &&
          <div className="citation-text" dangerouslySetInnerHTML={{ __html: citation }}>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default injectIntl(Citation);
