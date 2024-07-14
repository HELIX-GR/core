import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
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
} from '../../model';

import {
  toast,
} from 'react-toastify';

import {
  CollectionSelectModal,
} from './collection-parts';

import {
  FavoriteFilter,
  FavoriteList
} from './favorite-parts';

class Favorites extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pills: {
        [EnumCatalog.CKAN]: true,
        [EnumCatalog.LAB]: true,
      },
      text: '',
      collectionModal: {
        visible: false,
        favorite: null,
      },
    };

    this.onAddFavoriteToCollection = this.onAddFavoriteToCollection.bind(this);
    this.onCollectionSelect = this.onCollectionSelect.bind(this);
    this.onFavoriteDelete = this.onFavoriteDelete.bind(this);
    this.onPillChanged = this.onPillChanged.bind(this);
    this.onRemoveFavoriteFromCollection = this.onRemoveFavoriteFromCollection.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  onPillChanged(id) {
    const { pills } = this.state;

    const active = Object.keys(pills).filter(key => pills[key]);

    if ((active.length > 1) || (active[0] !== id)) {
      this.setState((state) => {
        return {
          pills: {
            ...state.pills,
            [id]: !state.pills[id],
          }
        };
      });
    }
  }

  onTextChanged(value) {
    this.setState({
      text: value,
    });
  }

  onFavoriteDelete(data) {
    const { profile } = this.props;

    const authenticated = (profile != null);
    const active = this.isFavoriteActive(data.catalog, data.handle);

    if (authenticated) {
      this.props.removeFavorite(data)
        .catch((err) => {
          if ((err.errors) && (err.errors[0].code.startsWith('FavoriteErrorCode.'))) {
            // Ignore
            return;
          }
          const type = data.catalog === EnumCatalog.CKAN ? 'dataset' : 'notebook';

          toast.dismiss();
          toast.error(<FormattedMessage id={`favorite.${active ? 'remove' : 'add'}-error-${type}`} />);
        });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
    }
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
    const {
      collectionModal,
      pills,
      text,
    } = this.state;

    const {
      collections,
      config,
      favorites,
    } = this.props;

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
          <section className="main-results-page-content">
            <div className="results-main-content">

              <FavoriteFilter
                onPillChanged={this.onPillChanged}
                onTextChanged={this.onTextChanged}
                pills={pills}
                text={text}
              />

              <FavoriteList
                collections={collections}
                config={config}
                favorites={favorites}
                onCollectionSelect={this.onCollectionSelect}
                onFavoriteDelete={this.onFavoriteDelete}
                pills={pills}
                text={text}
              />
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
  favorites: state.user.profile ? state.user.profile.favorites : [],
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

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Favorites);
