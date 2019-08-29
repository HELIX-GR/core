import * as React from 'react';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

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
    readOnly: PropTypes.bool.isRequired,
    toggleProvider: PropTypes.func.isRequired,
  }

  static defaultProps = {
    readOnly: false,
  }

  renderProviders() {
    const { filters, metadata: { providers } } = this.props;
    const _t = this.props.intl.formatMessage;

    return (
      <div className="providers param-box">
        <h5 className="title">{_t({ id: 'advanced-search.filters.pubs.providers' })}</h5>
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
                  readOnly={this.props.readOnly}
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
    const _t = this.props.intl.formatMessage;

    return (
      <div className="fields">
        <div className="fields-group">
          {this.renderProviders()}
        </div>
        <div className="fields-group">
          <div className="filters param-box">
            {true === false &&
              <React.Fragment>
                <h5 className="title">{_t({ id: 'advanced-search.filters.pubs.author' })}</h5>
                <FormGroup >
                  <KeywordEditor
                    onChange={authors => this.props.setOpenaireFilter(EnumOpenaireFilter.Authors, authors)}
                    placeholder={_t({ id: 'advanced-search.placeholder.author' })}
                    value={filters[EnumOpenaireFilter.Authors]}
                    readOnly={this.props.readOnly}
                  />
                  <FormText color="muted">{_t({ id: 'advanced-search.help.author' })}</FormText>
                </FormGroup>
              </React.Fragment>
            }
            <h5 className="title">{_t({ id: 'advanced-search.filters.pubs.acceptance-from' })}</h5>
            <FormGroup >
              <DatePicker
                autoComplete="off"
                className="form-control"
                id={EnumOpenaireFilter.FromDateAccepted}
                name={EnumOpenaireFilter.FromDateAccepted}
                onChange={date => this.props.setOpenaireFilter(EnumOpenaireFilter.FromDateAccepted, date)}
                value={filters[EnumOpenaireFilter.FromDateAccepted] || null}
                readOnly={this.props.readOnly}
              />
              <FormText color="muted">{_t({ id: 'advanced-search.help.acceptance-from' })}</FormText>
            </FormGroup>
            <h5 className="title">{_t({ id: 'advanced-search.filters.pubs.acceptance-to' })}</h5>
            <FormGroup >
              <DatePicker
                autoComplete="off"
                className="form-control"
                id={EnumOpenaireFilter.ToDateAccepted}
                name={EnumOpenaireFilter.ToDateAccepted}
                onChange={date => this.props.setOpenaireFilter(EnumOpenaireFilter.ToDateAccepted, date)}
                value={filters[EnumOpenaireFilter.ToDateAccepted] || null}
                readOnly={this.props.readOnly}
              />
              <FormText color="muted">{_t({ id: 'advanced-search.help.acceptance-to' })}</FormText>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }

}

export default injectIntl(PubsAdvancedOptions);
