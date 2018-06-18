import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  getLatestPosts,
} from '../../ducks/ui/wordpress';

import {
  changeText,
  search as searchAll,
  toggleAdvanced,
  togglePill,
} from '../../ducks/ui/views/search';

import {
  Pill,
} from '../helpers';

import {
  SearchNews,
  SearchResult,
} from './';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.onPillChanged = this.onPillChanged.bind(this);
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  onPillChanged(id) {
    const { text } = this.props.search;

    this.props.togglePill(id);

    if (this.isTextValid(text)) {
      this.props.searchAll(text);
    }
  }

  onSearch(e) {
    e.preventDefault();

    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text);
    }
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  componentDidMount() {
    this.props.getLatestPosts(2);
  }

  render() {
    const { advanced, result: { composite }, loading, pills, text } = this.props.search;
    const { latest: posts } = this.props.wordpress;

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
                    className="landing-search-text"
                    name="landing-search-text" value=""
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.props.changeText(e.target.value)}
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

                  <SearchResult
                    result={composite}
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
  search: state.ui.search,
  profile: state.user.profile,
  wordpress: state.ui.wordpress,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeText,
  getLatestPosts,
  searchAll,
  toggleAdvanced,
  togglePill,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchPage);
