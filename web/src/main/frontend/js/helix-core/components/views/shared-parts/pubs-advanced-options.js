import * as React from 'react';
import * as PropTypes from 'prop-types';

import { FormGroup, FormText, Label } from 'reactstrap';

import { EnumOpenaireFilter } from '../../../model';
import {
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
                <label htmlFor={`switch-provider-${index}`} key={`switch-provider-${index}`}>
                  <input
                    type="checkbox"
                    id={`switch-provider-${index}`}
                    name={`switch-provider-${index}`}
                    value={provider.id}
                    onChange={() => { this.props.toggleProvider(provider.id); }}
                    checked={checked}
                  />
                  {provider.name}
                </label>
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
        <div className="row">
          <div className="col-4">
            {this.renderProviders()}
          </div>
          <div className="col-8">
            <div className="filters param-box">
              <FormGroup >
                <Label for={EnumOpenaireFilter.Authors} className="title-label">Author</Label>
                <KeywordEditor
                  onChange={authors => this.props.setOpenaireFilter(EnumOpenaireFilter.Authors, authors)}
                  placeholder="Enter a name and press enter ..."
                  value={filters[EnumOpenaireFilter.Authors]}
                />
                <FormText color="muted">White-space separated list of names and/or surnames. Search for publications by authors.</FormText>
              </FormGroup>
              <FormGroup >
                <Label for={EnumOpenaireFilter.FromDateAccepted} className="title-label">Date Accepted From</Label>
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
              <FormGroup >
                <Label for={EnumOpenaireFilter.ToDateAccepted} className="title-label">Date Accepted To</Label>
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
      </div>
    );
  }

}

export default PubsAdvancedOptions;
