import _ from 'lodash';
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
  Link,
} from 'react-router-dom';

import {
  search as searchAll,
  setText,
  toggleAdvanced,
  togglePill,
  toggleDataFacet,
  setResultVisibility,
} from '../../ducks/ui/views/main';

import {
  addFavorite,
  removeFavorite,
} from '../../ducks/user';

import {
  buildPath,
  DynamicRoutes,
  EnumCatalog,
  EnumCkanFacet,
  EnumMimeType,
} from '../../model';

import {
  FormattedMessage,
} from 'react-intl';

import {
  toast,
} from 'react-toastify';

import {
  Checkbox,
  Favorite,
  Pill,
} from '../helpers';

import {
  LocationFilter,
  Pagination,
} from './shared-parts';

const MIN_FACET_VALUES = 3;
const MAX_TITLE_LENGTH = 77;
const MAX_NOTES_LENGTH = 192;

class MainResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataFacets: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = false; return result; }, {}),
      labFacets: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = false; return result; }, {}),
    };

    this.textInput = React.createRef();

    this.onPillChanged = this.onPillChanged.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  static contextTypes = {
    intl: PropTypes.object,
  };

  toggleMore(e, key) {
    e.preventDefault();
    this.setState({
      dataFacets: {
        ...this.state.dataFacets,
        [key]: !this.state.dataFacets[key],
      }
    });
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  get isEnabled() {
    const { pills } = this.props.search;
    return !!Object.keys(pills).find(key => !!pills[key]);
  }

  search(pageIndex) {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text, true, pageIndex);
    }
  }

  onPillChanged(id) {
    const { pills } = this.props.search;

    const active = Object.keys(pills).filter(key => pills[key]);
    if ((active.length > 1) || (active[0] !== id)) {
      this.props.togglePill(id);
      this.textInput.current.focus();
      this.search();
    }
  }

  onTextChanged(value) {
    this.props.setText(value);
  }

  onFacetChanged(facet, value) {
    this.props.toggleDataFacet(facet, value);
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

  isFavoriteActive(catalog, handle) {
    return !!this.props.favorites.find(f => f.catalog === catalog && f.handle === handle);
  }

  toggleFavorite(data) {
    const authenticated = (this.props.profile != null);
    const active = this.isFavoriteActive(data.catalog, data.handle);

    if (authenticated) {
      (active ? this.props.removeFavorite(data) : this.props.addFavorite(data))
        .catch((err) => {
          if ((err.errors) && (err.errors[0].code.startsWith('FavoriteErrorCode.'))) {
            // Ignore
            return;
          }
          const type = data.catalog === EnumCatalog.CKAN ? 'dataset' : data.catalog === EnumCatalog.OPENAIRE ? 'publication' : 'notebook';

          toast.dismiss();
          toast.error(<FormattedMessage id={`favorite.${active ? 'remove' : 'add'}-error-${type}`} />);
        });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
    }
  }

  renderParameters(key, title, valueProperty, textProperty, prefix, minOptions, showAll) {
    const { data: { facets } } = this.props.search;
    const { data } = this.props.config;

    const items = data[key];
    const size = Array.isArray(items) ? showAll ? items.length : Math.min(items.length, minOptions) : 0;
    if (size === 0) {
      return null;
    }

    return (
      <div className={`${key} param-box ${showAll ? '' : 'less'}`}>
        <h5 className="title">{title}</h5>
        <div className={`switches ${showAll ? 'more' : 'less'}`}>
          {
            items.slice(0, size).map((value, index) => {
              const resolvedValue = valueProperty ? value[valueProperty] : value;
              const checked = !!facets[key].find(value => value === resolvedValue);

              return (
                <Checkbox
                  key={`switch-${prefix}-${index}`}
                  id={`switch-${prefix}-${index}`}
                  name={`switch-${prefix}-${index}`}
                  text={textProperty ? value[textProperty] : value}
                  value={checked}
                  readOnly={false}
                  onChange={() => { this.onFacetChanged(key, resolvedValue); }}
                />
              );
            })
          }
        </div>
        {items.length > minOptions &&
          <div className="more-link">
            <a onClick={(e) => this.toggleMore(e, key)}>{showAll ? "View Less" : "View More"}</a>
          </div>
        }
      </div>
    );
  }

  renderDataset(r, host) {
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
        <Favorite
          active={this.isFavoriteActive(EnumCatalog.CKAN, r.id)}
          catalog={EnumCatalog.CKAN}
          description={r.notes}
          handle={r.id}
          onClick={this.toggleFavorite}
          title={r.title}
          url={`${host}/dataset/${r.id}`}
        />
        <h3 className="title">
          <a href={`${host}/dataset/${r.id}`} target="_blank">
            {r.title.length > MAX_TITLE_LENGTH ? `${r.title.substring(0, MAX_TITLE_LENGTH)} ...` : r.title}
          </a>
          <div className="pill data ml-1">
            DATA
          </div>
        </h3>
        <div className="notes">
          {r.notes.length > MAX_NOTES_LENGTH ? `${r.notes.substring(0, MAX_NOTES_LENGTH)} ...` : r.notes}
        </div>
        <div className="service">
          <a href="" onClick={(e) => e.preventDefault()}>{r.organization.title}</a>
        </div>

        <div className="tag-list">
          {r.dataset_category &&
            r.dataset_category.map(category => (
              <a
                key={category}
                href=''
                onClick={(e) => e.preventDefault()}
                className="tag-box tag-box-category"
                target="blank"
              >
                <div>
                  {category}
                </div>
              </a>
            ))
          }
          {r.isopen &&
            <a
              href=''
              onClick={(e) => e.preventDefault()}
              className="tag-box tag-box-other"
              target="blank"
            >
              <div>
                OPEN
              </div>
            </a>
          }
          {formats.length !== 0 &&
            formats.filter(format => !!format).map((format, index) => {
              return (
                <a
                  href=''
                  onClick={(e) => e.preventDefault()}
                  className={`tag-box ${index === 0 ? 'first-tag' : ''}`} key={format}
                >
                  <div>
                    {format}
                  </div>
                </a>
              );
            })
          }
        </div>
      </div>
    );
  }

  resolvePublicationResource(publication) {
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

  renderPublication(p, host) {
    const resource = this.resolvePublicationResource(p);

    const age = moment.duration(moment() - moment(p.dateOfAcceptance));
    const date = age.asHours() < 24 ?
      moment(p.dateOfAcceptance).fromNow() :
      <FormattedDate value={p.dateOfAcceptance} day='numeric' month='numeric' year='numeric' />;

    return (
      <div className="result-item pubs" key={p.originalId} >
        <div className="date-of-entry">
          {date}
        </div>
        <Favorite
          active={this.isFavoriteActive(EnumCatalog.OPENAIRE, p.objectIdentifier)}
          catalog={EnumCatalog.OPENAIRE}
          description={p.description[0] || null}
          handle={p.objectIdentifier}
          onClick={this.toggleFavorite}
          title={p.title}
          url={`${host}/search/publication?articleId=${p.objectIdentifier}`}
        />
        <h3 className="title">
          <Link to={buildPath(DynamicRoutes.PUBLICATION_PAGE, [p.objectIdentifier])}>
            {p.title.length > MAX_TITLE_LENGTH ? `${p.title.substring(0, MAX_TITLE_LENGTH)} ...` : p.title}
          </Link>
          <div className="pill pubs ml-1">
            PUBS
          </div>
        </h3>
        <div className="notes">
          {p.description[0].length > MAX_NOTES_LENGTH ? `${p.description[0].substring(0, MAX_NOTES_LENGTH)} ...` : p.description[0]}
        </div>
        {p.publisher &&
          <div className="service">
            <a href="" onClick={(e) => e.preventDefault()}>{p.publisher}</a>
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
      </div>
    );
  }

  renderNotebook(n, host) {
    const formats = n.resources.reduce((result, value) => {
      if (!result.includes(value.format)) {
        return [...result, value.format];
      }
      return result;
    }, []);

    const age = moment.duration(moment() - moment(n.metadata_modified));
    const date = age.asHours() < 24 ?
      moment(n.metadata_modified).fromNow() :
      <FormattedDate value={n.metadata_modified} day='numeric' month='numeric' year='numeric' />;

    return (
      <div className="result-item lab" key={n.id} >
        <div className="date-of-entry">
          {date}
        </div>
        <Favorite
          active={this.isFavoriteActive(EnumCatalog.LAB, n.id)}
          catalog={EnumCatalog.LAB}
          description={n.notes}
          handle={n.id}
          onClick={this.toggleFavorite}
          title={n.title}
          url={`${host}/dataset/${n.id}`}
        />
        <h3 className="title">
          <Link to={buildPath(DynamicRoutes.NOTEBOOK_PAGE, [n.id])}>
            {n.title.length > MAX_TITLE_LENGTH ? `${n.title.substring(0, MAX_TITLE_LENGTH)} ...` : n.title}
          </Link>
          <div className="pill lab ml-1">
            LAB
          </div>
        </h3>
        <div className="notes">
          {n.notes.length > MAX_NOTES_LENGTH ? `${n.notes.substring(0, MAX_NOTES_LENGTH)} ...` : n.notes}
        </div>
        <div className="service">
          <a href='' onClick={(e) => e.preventDefault()}>{n.organization.title}</a>
        </div>

        <div className="tag-list">
          {formats.length !== 0 &&
            formats.filter(format => !!format).map(format => {
              return (
                <a href='' className="tag-box" key={format}>
                  <div>
                    {format}
                  </div>
                </a>
              );
            })
          }
        </div>
      </div>
    );
  }

  renderResults(datasets, publications, notebooks) {
    const data = _.zip(
      datasets.results.map(d => ({ ...d, __source: EnumCatalog.CKAN })),
      publications.results.map(p => ({ ...p, __source: EnumCatalog.OPENAIRE })),
      notebooks.results.map(n => ({ ...n, __source: EnumCatalog.LAB })))
      .flat()
      .filter(r => !!r);

    if (data.count === 0) {
      return null;
    }

    const { data: { host: dataHost }, openaire: { host: pubsHost }, lab: { host: labHost } } = this.props.config;

    return data
      .map(r => {
        switch (r.__source) {
          case EnumCatalog.CKAN:
            return this.renderDataset(r, dataHost);
          case EnumCatalog.OPENAIRE:
            return this.renderPublication(r, pubsHost);
          case EnumCatalog.LAB:
            return this.renderNotebook(r, labHost);
          default:
            return null;
        }
      })
      .filter(r => !!r);
  }

  render() {
    const {
      dataFacets: {
        [EnumCkanFacet.Group]: showAllGroups,
        [EnumCkanFacet.Organization]: showAllOrganizations,
        [EnumCkanFacet.License]: showAllLicenses,
        [EnumCkanFacet.Format]: showAllFormats,
        [EnumCkanFacet.Tag]: showAllTags
      },
    } = this.state;
    const {
      search: {
        result: {
          catalogs: {
            [EnumCatalog.CKAN]: datasets = { results: [], count: 0, pageSize: 10 },
            [EnumCatalog.OPENAIRE]: publications = { results: [], count: 0, pageSize: 10 },
            [EnumCatalog.LAB]: notebooks = { results: [], count: 0, pageSize: 10 },
          },
        },
        loading, pills, text
      }
    } = this.props;
    const _t = this.context.intl.formatMessage;

    const pageIndex = datasets.pageIndex || publications.pageIndex || notebooks.pageIndex || 0;
    const pageSize = datasets.count !== 0 ? datasets.pageSize : publications.count !== 0 ? publications.pageSize : notebooks.count !== 0 ? notebooks.pageSize : 10;
    const rowCount = datasets.count + publications.count + notebooks.count;
    const pageCount = Math.ceil(rowCount / pageSize);

    const catalogNames = [
      pills.data ? _t({ id: 'results.main.search.placeholder.data' }) : null,
      pills.pubs ? _t({ id: 'results.main.search.placeholder.pubs' }) : null,
      pills.lab ? _t({ id: 'results.main.search.placeholder.lab' }) : null,
    ].filter(text => text).join(', ');

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
                      disabled={!this.isEnabled}
                      name="landing-search-text"
                      placeholder={_t({ id: 'results.main.search.placeholder.prefix' }, { catalogs: catalogNames })}
                      value={text}
                      onChange={(e) => this.onTextChanged(e.target.value)}
                      ref={this.textInput}
                    />

                    <div className="domain-pills">
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
                        disabled={loading}
                        text="pills.lab"
                        className="pill-lab"
                        selected={pills.lab}
                        onChange={this.onPillChanged}
                      />
                    </div>

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

              <div className="main-results-advanced-search">

                <h4 className="header">
                  {_t({ id: 'results.shared.search.advanced-search' })}
                </h4>


                <div className="border-bottom-bar">

                </div>
              </div>

              {true === false &&
                <LocationFilter />
              }

              <div className="fields">

                <div className="fields-group">
                  {this.renderParameters(EnumCkanFacet.Organization, _t({ id: 'advanced-search.filters.ckan.organizations' }), 'name', 'title', 'org', MIN_FACET_VALUES, showAllOrganizations)}
                </div>
                <div className="fields-group">
                  {this.renderParameters(EnumCkanFacet.Group, _t({ id: 'advanced-search.filters.ckan.topics' }), 'name', 'title', 'grp', MIN_FACET_VALUES, showAllGroups)}
                </div>
                <div className="fields-group">
                  {this.renderParameters(EnumCkanFacet.Tag, _t({ id: 'advanced-search.filters.ckan.tags' }), 'name', 'display_name', 'tag', MIN_FACET_VALUES, showAllTags)}
                </div>
                <div className="fields-group">
                  {this.renderParameters(EnumCkanFacet.Format, _t({ id: 'advanced-search.filters.ckan.formats' }), null, null, 'fmt', MIN_FACET_VALUES, showAllFormats)}
                </div>
                <div className="fields-group">
                  {this.renderParameters(EnumCkanFacet.License, _t({ id: 'advanced-search.filters.ckan.licenses' }), 'id', 'title', 'lic', MIN_FACET_VALUES, showAllLicenses)}
                </div>
              </div>

            </section>


            <section className="results-main-result-set">

              <Pagination
                className="top"
                pageIndex={pageIndex}
                pageCount={pageCount}
                pageChange={(pageIndex) => this.onPageChange(pageIndex)}
              />

              <div className="main-results-border-bottom">
                <label className="order-by " htmlFor="order-by">{_t({ id: 'results.shared.search.order-by.label' })}
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
                  {pills.data &&
                    <span>{_t({ id: 'results.shared.count.data' }, { count: datasets.count })}</span>
                  }
                  {pills.pubs &&
                    <React.Fragment>
                      {pills.data &&
                        <span className="pr-2 pl-2">|</span>
                      }
                      <span>{_t({ id: 'results.shared.count.pubs' }, { count: publications.count })}</span>
                    </React.Fragment>
                  }
                  {pills.lab &&
                    <React.Fragment>
                      {(pills.data || pills.pubs) &&
                        <span className="pr-2 pl-2">|</span>
                      }
                      <span>{_t({ id: 'results.shared.count.lab' }, { count: notebooks.count })}</span>
                    </React.Fragment>
                  }
                </div>
              </div>

              <div className="result-items">
                {this.renderResults(datasets, publications, notebooks)}
              </div>

              <div className="main-results-border-bottom">

              </div>

              <Pagination
                className="bottom"
                pageIndex={pageIndex}
                pageCount={pageCount}
                pageChange={(pageIndex) => this.onPageChange(pageIndex)}
              />

            </section>

          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  favorites: state.user.favorites,
  profile: state.user.profile,
  search: state.ui.main,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavorite,
  removeFavorite,
  searchAll,
  setText,
  toggleAdvanced,
  togglePill,
  toggleDataFacet,
  setResultVisibility,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainResults);
