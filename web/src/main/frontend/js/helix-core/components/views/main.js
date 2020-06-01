import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { injectIntl } from 'react-intl';

import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  getLatestPosts,
} from '../../ducks/ui/views/news';

import {
  search as searchAll,
  searchAutoComplete,
  setResultVisibility,
  setText,
  toggleAdvanced,
  togglePill,
  toggleDataFacet,
  toggleLabFacet,
} from '../../ducks/ui/views/main';

import {
  EnumCatalog,
  StaticRoutes,
} from '../../model';

import {
  Pill,
} from '../helpers';

import {
  AdvancedModal,
} from './shared-parts';

import {
  About,
  News,
  Result,
} from './main-parts';

const KEYSTROKE_INTERVAL = 800;

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.onPillChanged = this.onPillChanged.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.searchAutoComplete = _.debounce(this.props.searchAutoComplete, KEYSTROKE_INTERVAL);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    this.props.getLatestPosts(2);
    this.props.setResultVisibility(false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  get isEnabled() {
    const { pills } = this.props.search;
    return !!Object.keys(pills).find(key => !!pills[key]);
  }

  search(advanced = false, catalog = null) {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      (catalog ? this.props.searchAll(text, false, 0, 10, catalog) : this.props.searchAll(text, advanced))
        .then((data) => {
          const found = Object.keys(EnumCatalog).some((key) => {
            return (data.catalogs && data.catalogs[key] && data.catalogs[key].count !== 0);
          });

          if (found) {
            if (advanced) {
              this.props.toggleAdvanced();
            }
            this.props.history.push(StaticRoutes.MAIN_RESULTS);
          }
        });
    }
  }

  onPillChanged(id) {
    const { text, pills } = this.props.search;

    // Get all active sections (including the one that has been toggled)
    const active = Object.keys(pills).filter(key => pills[key]);
    if ((active.length > 1) || (active[0] !== id)) {
      this.props.togglePill(id);
      // At least one active section must be active
      if (this.isTextValid(text)) {
        this.searchAutoComplete(text);
      }
    }

    this.textInput.current.focus();
  }

  onTextChanged(value, refresh = true) {
    this.props.setText(value);

    if ((refresh) && (this.isTextValid(value))) {
      this.searchAutoComplete(value);
    }
  }

  onSearch(e) {
    e.preventDefault();

    this.search(false);
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.setResultVisibility(false);
    }
  }

  render() {
    const { data, lab } = this.props.config;
    const { advanced, partialResult: { visible, catalogs }, loading, pills, text } = this.props.search;
    const { latest: posts } = this.props.news;
    const _t = this.props.intl.formatMessage;

    const placeholderText = [
      pills.data ? _t({ id: 'main.search.placeholder.data' }) : null,
      pills.lab ? _t({ id: 'main.search.placeholder.lab' }) : null,
    ].filter(text => text).join(', ');

    return (

      <div>
        <section>
          <div className="landing-section">
            <div className="landing-section-background">

            </div>
            <div className="search-form-wrapper">
              <form className="landing-search-form">
                <div className="main-form-content">
                  <input
                    type="text"
                    autoComplete="off"
                    className="landing-search-text"
                    disabled={!this.isEnabled}
                    name="landing-search-text"
                    placeholder={_t({ id: 'main.search.placeholder.prefix' }, { catalogs: placeholderText })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    onFocus={() => this.props.setResultVisibility(true)}
                    ref={this.textInput}
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
                      disabled={loading}
                      text="pills.data"
                      className="pill-data"
                      selected={pills.data}
                      onChange={this.onPillChanged}
                    />
                    <Pill
                      id="lab"
                      disabled={loading}
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
                      onClick={() => this.props.toggleAdvanced()}
                    >
                      {_t({ id: 'main.search.advanced-search' })}
                    </div>
                  </div>

                  <Result
                    data={data}
                    hide={() => this.props.setResultVisibility(false)}
                    lab={lab}
                    navigate={(url) => this.props.history.push(url)}
                    pills={pills}
                    result={catalogs}
                    searchCatalog={(catalog) => this.search(false, catalog)}
                    visible={visible && !loading}
                  />

                </div>

                <button
                  type="submit"
                  name="landing-search-button"
                  className="landing-search-button"
                  disabled={loading || !this.isEnabled}
                  onClick={(e) => this.onSearch(e)}
                >
                  <i className={loading ? 'fa fa-spin fa-spinner' : 'fa fa-search'}></i>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="landing-page-content">

          <News posts={posts} />

          <About />

        </section>

        <AdvancedModal
          config={this.props.config}
          data={this.props.search.data}
          lab={this.props.search.lab}
          loading={this.props.search.loading}
          pills={this.props.search.pills}
          search={() => this.search(true)}
          setText={(text) => this.onTextChanged(text, false)}
          text={this.props.search.text}
          toggle={this.props.toggleAdvanced}
          toggleDataFacet={this.props.toggleDataFacet}
          toggleLabFacet={this.props.toggleLabFacet}
          visible={advanced}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  news: state.ui.news,
  search: state.ui.main,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getLatestPosts,
  searchAll,
  searchAutoComplete,
  setResultVisibility,
  setText,
  toggleAdvanced,
  togglePill,
  toggleDataFacet,
  toggleLabFacet,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main));
