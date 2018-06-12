import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import _ from 'lodash';
import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  changeLocale,
} from '../../ducks/i18n';

import {
  logout,
} from '../../ducks/user';

import {
  changeText,
  toggleAdvanced,
  togglePill,
} from '../../ducks/ui/views/search';

import {
  Pages
} from '../../model/routes';

import {
  Pill,
} from '../helpers';

import {
  About,
  Footer,
  Header,
  News,
  SearchResult,
} from './';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.onPillChanged = this.onPillChanged.bind(this);

    this.onTextChanged = _.debounce((value) => {
      this.props.changeText(value);
    }, 1000);

  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  onPillChanged(id) {
    this.props.togglePill(id);
  }


  render() {
    const { advanced, pills, text } = this.props.search;
    const _t = this.context.intl.formatMessage;

    return (

      <div>
        <Header
          changeLocale={this.props.changeLocale}
          locale={this.props.locale}
          logout={this.props.logout}
          profile={this.props.profile}
        />

        <section>
          <div className="landing-section">
            <div className="search-form-wrapper">
              <form className="landing-search-form">
                <div className="main-form-content">
                  <input
                    type="text"
                    className="landing-search-text"
                    name="landing-search-text" value=""
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                  />
                  <div
                    className={
                      classnames({
                        'domain-pills': true,
                        'short': advanced,
                      })
                    }
                  >
                    <Pill
                      id="data"
                      text="pills.data"
                      className="pill-data"
                      selected={pills.data}
                      onChange={this.onPillChanged}
                    />
                    <Pill
                      id="pubs"
                      text="pills.pubs"
                      className="pill-pubs"
                      selected={pills.pubs}
                      onChange={this.onPillChanged}
                    />
                    <Pill
                      id="lab"
                      text="pills.lab"
                      className="pill-lab"
                      selected={pills.lab}
                      onChange={this.onPillChanged}
                    />
                    <div
                      className={
                        classnames({
                          'advanced-search-link': true,
                          'hidden': advanced,
                        })
                      }
                      onClick={(e) => this.props.toggleAdvanced()}
                    >
                      ADVANCED SEARCH
                    </div>
                  </div>

                  {/* <div className="closable state-open"> */}
                  <div
                    className={
                      classnames({
                        'closable': true,
                        'visible': advanced,
                      })

                    }
                  >
                    <div
                      className="close-btn"
                      onClick={(e) => this.props.toggleAdvanced()}
                    >
                      CLOSE
                    </div>

                    <div className="search-options">
                      <label htmlFor="input-organizations"><span className="label-content">ORGANIZATIONS</span>
                        <input list="organizations" id="input-organizations" name="input-organizations" value="" placeholder="- SELECT -" />
                        <a href="#"> <i className="fa fa-search"></i> </a>
                        <datalist id="organizations">
                          <option value=""></option>
                        </datalist>
                      </label>
                      <label htmlFor="input-tags"><span className="label-content">TAGS</span>
                        <input list="tags" id="input-tags" name="input-tags" value="" placeholder="- SELECT -" />
                        <a href="#"> <i className="fa fa-search"></i> </a>
                        <datalist id="tags">
                          <option value=""></option>
                        </datalist>
                      </label>
                      <label htmlFor="input-licences"><span className="label-content">LICENCES</span>
                        <input list="licences" id="input-licences" name="input-licences" value="" placeholder="- SELECT -" />
                        <a href="#"> <i className="fa fa-search"></i> </a>
                        <datalist id="licences">
                          <option value=""></option>
                        </datalist>
                      </label>
                      <label htmlFor="input-topics"><span className="label-content">TOPICS</span>
                        <input list="topics" id="input-topics" name="input-topics" value="" placeholder="- SELECT -" />
                        <a href="#"> <i className="fa fa-search"></i> </a>
                        <datalist id="topics">
                          <option value=""></option>
                        </datalist>
                      </label>
                      <label htmlFor="input-formats"><span className="label-content">FORMATS</span>
                        <input list="formats" id="input-formats" name="input-formats" value="" placeholder="- SELECT -" />
                        <a href="#"> <i className="fa fa-search"></i> </a>
                        <datalist id="formats">
                          <option value=""></option>
                        </datalist>
                      </label>
                    </div>
                  </div>

                  <SearchResult />

                </div>

                <button type="button" name="landing-search-button" className="landing-search-button">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="landing-page-content">

          <News />

          <About />

        </section>

        <Footer />
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  search: state.ui.search,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeLocale,
  changeText,
  logout,
  toggleAdvanced,
  togglePill,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchPage);
