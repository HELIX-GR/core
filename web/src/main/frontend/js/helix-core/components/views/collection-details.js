import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators,
} from 'redux';

import {
  FormattedMessage,
} from 'react-intl';

import {
  addFavoriteToCollection,
  removeFavorite,
  removeFavoriteFromCollection,
} from '../../ducks/user';

import {
  EnumCatalog,
  ServerError,
  StaticRoutes
} from '../../model';

import {
  toast,
} from 'react-toastify';

import {
  AccountDetails,
  CollectionItem,
  CollectionSelectModal,
} from './collection-parts';

class CollectionDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collectionModal: {
        visible: false,
        favorite: null,
      },
    };

    this.onAddFavoriteToCollection = this.onAddFavoriteToCollection.bind(this);
    this.onCollectionSelect = this.onCollectionSelect.bind(this);
    this.onFavoriteDelete = this.onFavoriteDelete.bind(this);
    this.onRemoveFavoriteFromCollection = this.onRemoveFavoriteFromCollection.bind(this);
  }

  static getDerivedStateFromProps(props) {
    const { profile: { collections, favorites: allFavorites }, match: { params } } = props;
    const collection = collections.find(c => c.id === +params.id) || null;

    const favorites = !collection ? null : collection.items
      .map(id => allFavorites.find(f => f.id === id) || null)
      .filter(f => !!f);

    return {
      collection,
      favorites,
    };
  }

  componentDidMount() {
    const { collection } = this.state;
    const { history } = this.props;

    if (!collection) {
      history.replace(StaticRoutes.COLLECTIONS);
    }
  }

  onFavoriteDelete(data) {
    const { profile } = this.props;

    const authenticated = (profile != null);
    const active = this.isFavoriteActive(data.catalog, data.handle);

    if (authenticated) {
      return this.props.removeFavorite(data)
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

    return Promise.reject(null);
  }

  onCollectionSelect(favorite) {
    this.showModal(favorite);
  }

  onAddFavoriteToCollection(collection, favorite) {
    const { profile } = this.props;
    const authenticated = (profile != null);

    if (authenticated) {
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

  isFavoriteActive(catalog, handle) {
    return !!this.props.favorites.find(f => f.catalog === catalog && f.handle === handle);
  }

  showModal(favorite) {
    this.setState({
      collectionModal: {
        visible: true,
        favorite,
      },
    });
  }

  hideModal() {
    this.setState({
      collectionModal: {
        visible: false,
        favorite: null,
      },
    });
  }

  render() {
    const { collection, collectionModal, favorites } = this.state;
    const { collections, config, profile: { account } } = this.props;

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
        <div className="results-main">
          <section className="main-results-page-content collection-landing-page-content">
            <div className="results-main-content">

              <section className="results-main-sidebar">
                <AccountDetails
                  account={account}
                />
              </section>

              <section className="results-main-result-set">
                <CollectionItem
                  collection={collection}
                  collections={collections}
                  config={config}
                  favorites={favorites}
                  onCollectionSelect={this.onCollectionSelect}
                  onFavoriteDelete={this.onFavoriteDelete}
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
  collections: state.user.profile.collections,
  config: state.config,
  favorites: state.user.profile.favorites,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavoriteToCollection,
  removeFavorite,
  removeFavoriteFromCollection,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectionDetails);
