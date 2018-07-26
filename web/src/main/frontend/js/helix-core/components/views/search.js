import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  getLatestPosts,
} from '../../ducks/ui/views/news';

import {
  changeText,
  search as searchAll,
  searchAutoComplete,
  toggleAdvanced,
  togglePill,
  setResultVisibility,
} from '../../ducks/ui/views/search';

import {
  EnumCatalog,
  StaticRoutes,
} from '../../model';

import {
  Pill,
} from '../helpers';

import {
  SearchAdvanced,
  SearchNews,
  SearchResult,
} from './search-parts';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.onPillChanged = this.onPillChanged.bind(this);
    this.searchAutoComplete = _.debounce(this.props.searchAutoComplete, 400);

    this.textInput = React.createRef();
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  search() {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text).then((data) => {
        const found = Object.keys(EnumCatalog).some((key) => {
          return (data.catalogs[key] && data.catalogs[key].count !== 0);
        });

        if (found) {
          this.props.history.push(StaticRoutes.RESULTS);
        }
      });
    }
  }

  onPillChanged(id) {
    const { text } = this.props.search;

    this.props.togglePill(id);
    if (this.isTextValid(text)) {
      this.searchAutoComplete(text);
    }

    this.textInput.current.focus();
  }

  onTextChanged(value) {
    this.props.changeText(value);

    if (this.isTextValid(value)) {
      this.searchAutoComplete(value);
    }
  }

  onSearch(e) {
    e.preventDefault();

    this.search();
  }

  componentDidMount() {
    this.props.getLatestPosts(2);
  }

  render() {
    const { advanced, partialResult: { visible, catalogs }, loading, pills, text } = this.props.search;
    const { latest: posts } = this.props.news;

    const _t = this.context.intl.formatMessage;

    return (

      <div>
        <section>
          <div className="landing-section">
            <div className="search-form-wrapper">
              <form className="landing-search-form">
                <div className="main-form-content">
                  <input
                    type="text"
                    autoComplete="off"
                    className="landing-search-text"
                    name="landing-search-text" value=""
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    onFocus={(e) => this.props.setResultVisibility(true)}
                    onBlur={(e) => this.props.setResultVisibility(false)}
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
                      id="pubs"
                      disabled={loading}
                      text="pills.pubs"
                      className="pill-pubs"
                      selected={pills.pubs}
                      onChange={this.onPillChanged}
                    />
                    <Pill
                      id="lab"
                      disabled={true}
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

                  <SearchAdvanced
                    visible={advanced}
                    toggle={this.props.toggleAdvanced}
                  />

                  {/* TODO: Use autoComplete result */}
                  <SearchResult
                    visible={visible && !loading}
                    result={catalogs}
                  />

                </div>

                <button
                  type="submit"
                  name="landing-search-button"
                  className="landing-search-button"
                  disabled={loading}
                  onClick={(e) => this.onSearch(e)}
                >
                  <i className={loading ? 'fa fa-spin fa-spinner' : 'fa fa-search'}></i>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="landing-page-content">

          <SearchNews posts={posts} />

        </section>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  news: state.ui.news,
  search: state.ui.search,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeText,
  getLatestPosts,
  searchAll,
  searchAutoComplete,
  toggleAdvanced,
  togglePill,
  setResultVisibility,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchPage);
