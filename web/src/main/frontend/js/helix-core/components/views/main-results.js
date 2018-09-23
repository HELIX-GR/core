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
  toggleAdvanced,
  togglePill,
  toggleCkanFacet,
  setResultVisibility,
} from '../../ducks/ui/views/main';

import {
  EnumCatalog,
  EnumCkanFacet,
} from '../../model';

import {
  Pagination,
} from './main-results-parts';

const MIN_FACET_VALUES = 3;

class MainResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      more: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = false; return result; }, {}),
    };

    this.textInput = React.createRef();
  }

  static contextTypes = {
    intl: PropTypes.object,
  };

  toggleMore(e, key) {
    e.preventDefault();
    this.setState({
      more: {
        ...this.state.more,
        [key]: !this.state.more[key],
      }
    });
  }

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

  onFacetChanged(facet, value) {
    this.props.toggleCkanFacet(facet, value);
    this.search();
  }

  onSearch(e) {
    e.preventDefault();

    this.search();
  }

  onPageChange(index) {
    const {
      search: { result: { catalogs: { [EnumCatalog.CKAN]: { pageIndex } } } }
    } = this.props;

    if (index !== pageIndex) {
      this.search(index);
    }
  }

  renderParameters(key, title, valueProperty, textProperty, prefix, minOptions, showAll) {
    const { ckan: { facets } } = this.props.search;
    const { ckan } = this.props.config;

    const items = ckan[key];
    const size = Array.isArray(items) ? showAll ? items.length : Math.min(items.length, minOptions) : 0;
    if (size === 0) {
      return null;
    }

    return (
      <div className={`${key} param-box`}>
        <h5 className="title">{title}</h5>

        <div className="switches">
          {
            items.slice(0, size).map((value, index) => {
              const resolvedValue = valueProperty ? value[valueProperty] : value;
              const checked = !!facets[key].find(value => value === resolvedValue);

              return (
                <label htmlFor={`switch-${prefix}-${index}`} key={`switch-${prefix}-${index}`}>
                  <input
                    type="checkbox"
                    id={`switch-${prefix}-${index}`}
                    name={`switch-${prefix}-${index}`}
                    value={resolvedValue}
                    onChange={() => { this.onFacetChanged(key, resolvedValue); }}
                    checked={checked}
                  />
                  {textProperty ? value[textProperty] : value}
                </label>
              );
            })
          }

          {items.length > minOptions &&
            <div className="more-link">
              <a onClick={(e) => this.toggleMore(e, key)}>{showAll ? "View Less" : "View More"}</a>
            </div>
          }
        </div>

      </div>
    );
  }

  renderResults(data) {
    if (data.count === 0) {
      return null;
    }

    const { ckan: { host } } = this.props.config;

    return data.results.map(r => {
      const formats = r.resources.reduce((result, value) => {
        if (!result.includes(value.format)) {
          return [...result, value.format];
        }
        return result;
      }, []);

      const age = moment.duration(moment() - moment(r.metadata_modified));
      const date = age.asHours() < 24 ?
        moment(r.metadata_modified).fromNow() :
        <FormattedDate value={r.metadata_modified} day='numeric' month='numeric' year='numeric' />;

      return (
        <div className="result-item data" key={r.id} >
          <div className="date-of-entry">
            {date}
          </div>
          <h3 className="title">
            <a href={`${host}/dataset/${r.id}`} target="_blank">
              {r.title}
            </a>
            <div className="pill data">
              DATA
            </div>
          </h3>
          <div className="service">
            <a href="#">{r.organization.title}</a>
          </div>

          <div className="tag-list">
            {formats.length !== 0 &&
              formats.filter(format => !!format).map(format => {
                return (
                  <a href="#" className="tag-box" key={format}>
                    <div>
                      {format}
                    </div>
                  </a>
                );
              })
            }
          </div>
        </div >
      );
    });
  }

  render() {
    const {
      more: {
        [EnumCkanFacet.Group]: showAllGroups,
        [EnumCkanFacet.Organization]: showAllOrganizations,
        [EnumCkanFacet.License]: showAllLicenses,
        [EnumCkanFacet.Format]: showAllFormats,
        [EnumCkanFacet.Tag]: showAllTags
      },
    } = this.state;
    const {
      search: { result: { catalogs: { [EnumCatalog.CKAN]: results = { count: 0, pageSize: 10 } } }, loading, text }
    } = this.props;
    const _t = this.context.intl.formatMessage;

    return (
      <div className="results-main">
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
                      placeholder={_t({ id: 'search.placeholder' })}
                      value={text}
                      onChange={(e) => this.onTextChanged(e.target.value)}
                      ref={this.textInput}
                    />

                    <div className="domain-pills">
                      <div className="filter-pill pill-data selected">
                        DATA
                      </div>
                      <div className="filter-pill pill-pubs">
                        PUBS
                      </div>
                      <div className="filter-pill pill-lab">
                        LAB
                      </div>

                    </div>
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
                  Σύνθετη Αναζήτηση
                </h4>


                <div className="border-bottom-bar">

                </div>
              </div>

              <div className="location param-box">
                <h5 className="title">LOCATION</h5>

                <div className="map-container">
                  <img className="temp-map" src="../images/jpg/map.png" alt="" />
                </div>

              </div>

              {this.renderParameters(EnumCkanFacet.Organization, 'ORGANIZATIONS', 'name', 'title', 'org', MIN_FACET_VALUES, showAllOrganizations)}

              {this.renderParameters(EnumCkanFacet.Group, 'TOPICS', 'name', 'title', 'grp', MIN_FACET_VALUES, showAllGroups)}

              {this.renderParameters(EnumCkanFacet.Tag, 'TAGS', 'name', 'display_name', 'tag', MIN_FACET_VALUES, showAllTags)}

              {this.renderParameters(EnumCkanFacet.Format, 'FORMATS', null, null, 'fmt', MIN_FACET_VALUES, showAllFormats)}

              {this.renderParameters(EnumCkanFacet.License, 'LICENSES', 'id', 'title', 'lic', MIN_FACET_VALUES, showAllLicenses)}

            </section>


            <section className="results-main-result-set">

              <Pagination
                className="top"
                pageIndex={results.pageIndex}
                pageCount={Math.ceil(results.count / results.pageSize)}
                pageChange={(pageIndex) => this.onPageChange(pageIndex)}
              />

              <div className="main-results-border-bottom">
                <label className="order-by" htmlFor="order-by">Ταξινόμηση κατά
                  <select name="order-by" id="order-by" value="">
                    <option value="1">
                      Σχετικότητα
                    </option>
                  </select>
                </label>
                <div className="main-results-result-count">
                  Βρέθηκαν {results.count} σύνολα δεδομένων
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
  search: state.ui.main,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchAll,
  setText,
  toggleAdvanced,
  togglePill,
  toggleCkanFacet,
  setResultVisibility,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainResults);
