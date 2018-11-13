import * as React from 'react';
import * as PropTypes from 'prop-types';

import { FormGroup, FormText, Label } from 'reactstrap';

import { EnumOpenaireFilter } from '../../../model';

import {
  Checkbox,
  DatePicker,
  KeywordEditor
} from '../../helpers';

class PubsAdvancedOptions extends React.Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    filters: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    toggleProvider: PropTypes.func.isRequired,
  }

  renderProviders() {
    const { filters, metadata: { providers } } = this.props;

    return (
      <div className="providers param-box">
        <h5 className="title">Providers</h5>
        <div className="switches">
          {
            providers.map((provider, index) => {
              const checked = !!filters.providers.find(id => id === provider.id);

              return (
                <Checkbox
                  key={`switch-provider-${index}`}
                  id={`switch-provider-${index}`}
                  name={`switch-provider-${index}`}
                  text={provider.name}
                  value={checked}
                  readOnly={false}
                  onChange={() => { this.props.toggleProvider(provider.id); }}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const { filters, } = this.props;

    return (
      <div className="fields">
        <div className="fields-group">
          {this.renderProviders()}
        </div>
        <div className="fields-group">
          <div className="filters param-box">
            <h5 class="title">Author</h5>
            <FormGroup >
              <KeywordEditor
                onChange={authors => this.props.setOpenaireFilter(EnumOpenaireFilter.Authors, authors)}
                placeholder="Enter a name and press enter ..."
                value={filters[EnumOpenaireFilter.Authors]}
              />
              <FormText color="muted">White-space separated list of names and/or surnames. Search for publications by authors.</FormText>
            </FormGroup>
            <h5 class="title">Date Accepted From</h5>
            <FormGroup >
              <DatePicker
                autoComplete="off"
                className="form-control"
                id={EnumOpenaireFilter.FromDateAccepted}
                name={EnumOpenaireFilter.FromDateAccepted}
                onChange={date => this.props.setOpenaireFilter(EnumOpenaireFilter.FromDateAccepted, date)}
                value={filters[EnumOpenaireFilter.FromDateAccepted] || null}
              />
              <FormText color="muted">Gets the publications whose date of acceptance is greater than or equal the given date.</FormText>
            </FormGroup>
            <h5 class="title">Date Accepted To</h5>
            <FormGroup >
              <DatePicker
                autoComplete="off"
                className="form-control"
                id={EnumOpenaireFilter.ToDateAccepted}
                name={EnumOpenaireFilter.ToDateAccepted}
                onChange={date => this.props.setOpenaireFilter(EnumOpenaireFilter.ToDateAccepted, date)}
                value={filters[EnumOpenaireFilter.ToDateAccepted] || null}
              />
              <FormText color="muted">Gets the publications whose date of acceptance is less than or equal the given date.</FormText>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }

}

export default PubsAdvancedOptions;
