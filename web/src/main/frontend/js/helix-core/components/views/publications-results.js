import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { injectIntl } from 'react-intl';

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
  setOpenaireFilter,
  setText,
  setResultVisibility,
  toggleAdvanced,
  toggleOpenaireProvider,
} from '../../ducks/ui/views/pubs';

import {
  addFavorite,
  addFavoriteToCollection,
  removeFavorite,
  removeFavoriteFromCollection,
} from '../../ducks/user';

import {
  buildPath,
  DynamicRoutes,
  EnumCatalog,
  EnumMimeType,
  ServerError,
} from '../../model';

import {
  FormattedMessage,
} from 'react-intl';

import {
  toast,
} from 'react-toastify';

import {
  Favorite,
  FavoriteCollectionPicker,
} from '../helpers';

import {
  LocationFilter,
  Pagination,
  PubsAdvancedOptions,
} from './shared-parts';

import {
  CollectionSelectModal,
} from './collection-parts';

const MAX_TITLE_LENGTH = 77;
const MAX_NOTES_LENGTH = 192;

class PublicationsResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collectionModal: {
        visible: false,
        catalog: null,
        item: null,
        favorite: null,
      },
    };

    this.onAddFavoriteToCollection = this.onAddFavoriteToCollection.bind(this);
    this.onProviderToggle = this.onProviderToggle.bind(this);
    this.onRemoveFavoriteFromCollection = this.onRemoveFavoriteFromCollection.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);

    this.textInput = React.createRef();
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

  onProviderToggle(id) {
    this.props.toggleOpenaireProvider(id);
    this.search();
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

  onCollectionSelect(catalog, item, favorite = null) {
    this.showModal(catalog, item, favorite);
  }

  onAddFavoriteToCollection(collection, favorite = null) {
    const { profile } = this.props;
    const authenticated = (profile != null);

    if (authenticated) {
      const { collectionModal: { item } } = this.state;
      const data = this.getFavoriteProperties(item);

      const create = favorite ? Promise.resolve(favorite) : this.props.addFavorite(data);

      create.then((favorite) => {
        // Refresh favorite
        this.setState(state => ({
          collectionModal: {
            ...state.collectionModal,
            favorite,
          }
        }));

        this.props.addFavoriteToCollection(collection.id, favorite.id)
          .catch(err => {
            if (err instanceof ServerError) {
              toast.error(
                <div>
                  {err.errors.map((e) => (
                    <FormattedMessage key={e.code} id={e.code} />
                  ))}
                </div>
              );
            } else {
              toast.error(
                <FormattedMessage id={'collections.add-favorite.failure'} />
              );
            }
          });
      });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
    }
  }

  onRemoveFavoriteFromCollection(collection, favorite) {
    const { profile } = this.props;
    const authenticated = (profile != null);

    if (authenticated) {
      this.props.removeFavoriteFromCollection(collection.id, favorite.id)
        .catch(err => {
          if (err instanceof ServerError) {
            toast.error(
              <div>
                {err.errors.map((e) => (
                  <FormattedMessage key={e.code} id={e.code} />
                ))}
              </div>
            );
          } else {
            toast.error(
              <FormattedMessage id={'collections.remove-favorite.failure'} />
            );
          }
        });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
    }
  }

  isFavoriteActive(handle) {
    return !!this.props.favorites.find(f => f.catalog === EnumCatalog.OPENAIRE && f.handle === handle);
  }

  getFavorite(handle) {
    return this.props.favorites.find(f => f.catalog === EnumCatalog.OPENAIRE && f.handle === handle) || null;
  }

  showModal(catalog, item, favorite) {
    this.setState({
      collectionModal: {
        visible: true,
        catalog,
        item,
        favorite,
      },
    });
  }

  hideModal() {
    this.setState({
      collectionModal: {
        visible: false,
        catalog: null,
        item: null,
        favorite: null,
      },
    });
  }

  getFavoriteProperties(item) {
    const { openaire: { host } } = this.props.config;

    return {
      catalog: EnumCatalog.OPENAIRE,
      description: item.description[0] || null,
      handle: item.objectIdentifier,
      title: item.title,
      url: `${host}/search/publication?articleId=${item.objectIdentifier}`,
    };
  }

  toggleFavorite(data) {
    const authenticated = (this.props.profile != null);
    const active = this.isFavoriteActive(data.handle);

    if (authenticated) {
      (active ? this.props.removeFavorite(data) : this.props.addFavorite(data))
        .catch((err) => {
          if ((err.errors) && (err.errors[0].code.startsWith('FavoriteErrorCode.'))) {
            // Ignore
            return;
          }
          toast.dismiss();
          toast.error(<FormattedMessage id={`favorite.${active ? 'remove' : 'add'}-error-publication`} />);
        });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
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

    const authenticated = (this.props.profile != null);
    const { openaire: { host } } = this.props.config;

    return data.results.map(p => {
      const resource = this.resolveResource(p);

      const modifiedAt = moment(p.dateOfAcceptance).parseZone();
      const age = moment.duration(moment() - modifiedAt);
      const date = age.asHours() < 24 ?
        moment(modifiedAt).fromNow() :
        <FormattedDate value={p.dateOfAcceptance} day='numeric' month='numeric' year='numeric' />;

      const favorite = this.getFavorite(p.objectIdentifier);

      return (
        <div className="result-item pubs" key={p.originalId} >
          <div className="date-of-entry">
            {date}
          </div>
          {authenticated &&
            <React.Fragment>
              <Favorite
                active={this.isFavoriteActive(p.objectIdentifier)}
                catalog={EnumCatalog.OPENAIRE}
                description={p.description[0] || null}
                handle={p.objectIdentifier}
                onClick={this.toggleFavorite}
                title={p.title}
                url={`${host}/search/publication?articleId=${p.objectIdentifier}`}
              />
              {this.props.collections.length !== 0 &&
                <FavoriteCollectionPicker
                  favorite={favorite}
                  onClick={() => this.onCollectionSelect(EnumCatalog.OPENAIRE, p, favorite)}
                />
              }
            </React.Fragment>
          }
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
                className="tag-box link"
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
    });
  }

  render() {
    const {
      collectionModal,
    } = this.state;
    const {
      collections,
      search: { result: { catalogs: { [EnumCatalog.OPENAIRE]: results = { count: 0, pageSize: 10 } } }, loading, text }
    } = this.props;
    const _t = this.props.intl.formatMessage;

    return (
      <>
        {collectionModal.visible &&
          <CollectionSelectModal
            addFavoriteToCollection={this.onAddFavoriteToCollection}
            collections={collections}
            favorite={collectionModal.favorite}
            removeFavoriteFromCollection={this.onRemoveFavoriteFromCollection}
            toggle={() => this.hideModal()}
            visible={collectionModal.visible}>
          </CollectionSelectModal>
        }
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

                {true === false &&
                  <LocationFilter />
                }

                <PubsAdvancedOptions
                  filters={this.props.search.openaire}
                  metadata={this.props.config.openaire}
                  setOpenaireFilter={this.props.setOpenaireFilter}
                  toggleProvider={this.onProviderToggle}
                  readOnly={loading}
                />

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
                      onChange={() => null}
                    >
                      <option value="1">
                        {_t({ id: 'results.shared.search.order-by.options.relevance' })}
                      </option>
                    </select>
                  </label>
                  {!loading &&
                    <div className="main-results-result-count">
                      {_t({ id: 'results.shared.count.pubs' }, { count: results.count })}
                    </div>
                  }
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
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  collections: state.user.profile ? state.user.profile.collections : [],
  config: state.config,
  favorites: state.user.profile ? state.user.profile.favorites : [],
  profile: state.user.profile,
  search: state.ui.pubs,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavorite,
  addFavoriteToCollection,
  removeFavorite,
  removeFavoriteFromCollection,
  searchAll,
  setOpenaireFilter,
  setText,
  setResultVisibility,
  toggleAdvanced,
  toggleOpenaireProvider,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicationsResults));
