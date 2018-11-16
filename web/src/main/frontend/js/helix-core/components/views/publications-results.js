import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import moment from '../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  FormattedDate,
} from 'react-intl';

import {
  search as searchAll,
  setText,
  setResultVisibility,
  toggleAdvanced,
} from '../../ducks/ui/views/pubs';

import {
  EnumCatalog,
  EnumMimeType,
} from '../../model';

import {
  LocationFilter,
  Pagination,
} from './shared-parts';

class PublicationsResults extends React.Component {

  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  static contextTypes = {
    intl: PropTypes.object,
  };

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  search(pageIndex) {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text, true, pageIndex);
    }
  }

  onTextChanged(value) {
    this.props.setText(value);
  }

  onSearch(e) {
    e.preventDefault();

    this.search();
  }

  onPageChange(index) {
    const {
      search: { result: { catalogs: { [EnumCatalog.OPENAIRE]: { pageIndex } } } }
    } = this.props;

    if (index !== pageIndex) {
      this.search(index);
    }
  }

  resolveResource(publication) {
    const { format, fullTextUrl } = publication;

    if ((!format) || (!fullTextUrl)) {
      return null;
    }

    switch (format.toLowerCase()) {
      case EnumMimeType.PDF:
        return {
          text: 'PDF',
          url: fullTextUrl,
        };
      default:
        return null;
    }
  }

  renderResults(data) {
    if (data.count === 0) {
      return null;
    }

    const { openaire: { host } } = this.props.config;

    return data.results.map(p => {
      const resource = this.resolveResource(p);

      const age = moment.duration(moment() - moment(p.dateOfAcceptance));
      const date = age.asHours() < 24 ?
        moment(p.dateOfAcceptance).fromNow() :
        <FormattedDate value={p.dateOfAcceptance} day='numeric' month='numeric' year='numeric' />;

      return (
        <div className="result-item pubs" key={p.originalId} >
          <div className="date-of-entry">
            {date}
          </div>
          <div className="btn-favorite">
            <a href="" data-toggle="tooltip" data-placement="bottom" target="_blank" title="" data-original-title="Favorite">
              <img src="/images/png/favorite.png" />
            </a>
          </div>
          <h3 className="title">
            <a href={`${host}/search/publication?articleId=${p.objectIdentifier}`} target="_blank">
              {p.title}
            </a>
            <div className="pill pubs ml-1">
              PUBS
            </div>
          </h3>
          {p.publisher &&
            <div className="service">
              <a href="">{p.publisher}</a>
            </div>
          }

          <div className="tag-list">
            {resource &&
              <a
                href={resource.url}
                className="tag-box"
                target="blank"
              >
                <div>
                  {resource.text}
                </div>
              </a>
            }
          </div>
        </div >
      );
    });
  }

  render() {
    const {
      search: { result: { catalogs: { [EnumCatalog.OPENAIRE]: results = { count: 0, pageSize: 10 } } }, loading, text }
    } = this.props;
    const _t = this.context.intl.formatMessage;

    return (
      <div className="results-pubs">
        <section className="main-results-page-content">
          <div className="results-main-content">

            <section className="results-main-sidebar">

              <div className="search-form-wrapper">

                <form className="landing-search-form">

                  <div className="main-form-content">
                    <input
                      type="text"
                      autoComplete="off"
                      className="landing-search-text"
                      name="landing-search-text" value=""
                      placeholder={_t({ id: 'results.pubs.search.placeholder' })}
                      value={text}
                      onChange={(e) => this.onTextChanged(e.target.value)}
                      ref={this.textInput}
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

              <div className="main-results-advanced-search">

                <h4 className="header">
                  {_t({ id: 'results.shared.search.advanced-search' })}
                </h4>


                <div className="border-bottom-bar">

                </div>
              </div>

              <LocationFilter className="" />

            </section>

            <section className="results-main-result-set">

              <Pagination
                className="top"
                pageIndex={results.pageIndex}
                pageCount={Math.ceil(results.count / results.pageSize)}
                pageChange={(pageIndex) => this.onPageChange(pageIndex)}
              />

              <div className="main-results-border-bottom">
                <label className="order-by" htmlFor="order-by">{_t({ id: 'results.shared.search.order-by.label' })}
                  <select
                    name="order-by"
                    id="order-by"
                    value=""
                    onChange={(e) => { console.log(e.target.value); }}
                  >
                    <option value="1">
                      {_t({ id: 'results.shared.search.order-by.options.relevance' })}
                    </option>
                  </select>
                </label>
                <div className="main-results-result-count">
                  {_t({ id: 'results.shared.count.pubs' }, { count: results.count })}
                </div>
              </div>

              <div className="result-items">
                {this.renderResults(results)}
              </div>

              <div className="main-results-border-bottom">

              </div>

              <Pagination
                className="bottom"
                pageIndex={results.pageIndex}
                pageCount={Math.ceil(results.count / results.pageSize)}
                pageChange={(pageIndex) => this.onPageChange(pageIndex)}
              />

            </section>

          </div>
        </section>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  search: state.ui.pubs,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchAll,
  setText,
  setResultVisibility,
  toggleAdvanced,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicationsResults);
