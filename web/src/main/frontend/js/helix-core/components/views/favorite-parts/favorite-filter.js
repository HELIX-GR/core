import * as React from 'react';

import { injectIntl } from 'react-intl';

import {
  Pill,
} from '../../helpers';

import {
  EnumCatalog,
} from '../../../model';

class FavoriteFilter extends React.Component {

  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  get isEnabled() {
    const { pills } = this.props;
    return !!Object.keys(pills).find(key => !!pills[key]);
  }

  render() {
    const {
      pills,
      text,
    } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <section className="results-main-sidebar">

        <div className="search-form-wrapper">

          <form className="landing-search-form">

            <div className="main-form-content">
              <input
                type="text"
                autoComplete="off"
                className="landing-search-text"
                disabled={!this.isEnabled}
                name="landing-search-text"
                placeholder={_t({ id: 'favorites.text.placeholder' })}
                value={text}
                onChange={(e) => this.props.onTextChanged(e.target.value)}
                ref={this.textInput}
              />

              <div className="domain-pills">
                <Pill
                  id={EnumCatalog.CKAN}
                  text="pills.data"
                  className="pill-data"
                  selected={pills[EnumCatalog.CKAN]}
                  onChange={this.props.onPillChanged}
                />
                <Pill
                  id={EnumCatalog.OPENAIRE}
                  text="pills.pubs"
                  className="pill-pubs"
                  selected={pills[EnumCatalog.OPENAIRE]}
                  onChange={this.props.onPillChanged}
                />
                <Pill
                  id={EnumCatalog.LAB}
                  text="pills.lab"
                  className="pill-lab"
                  selected={pills[EnumCatalog.LAB]}
                  onChange={this.props.onPillChanged}
                />
              </div>

            </div>

          </form>
        </div>

      </section>
    );
  }

}

export default injectIntl(FavoriteFilter);
