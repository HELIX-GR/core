import * as React from 'react';

import {
  FavoriteList,
} from '../favorite-parts';

import {
  EnumCatalog,
} from '../../../model';

class CollectionItem extends React.Component {

  render() {
    const { collection: c, collections, config, favorites } = this.props;

    if(!c) {
      return null;
    }

    return (
      <div className="collection-item">
        <div className="collection-title">
          {c.title}
        </div>
        <div className="pills">
          {c.publicationCounter !== 0 &&
            <div className="pill pill-pubs">{`${c.publicationCounter} PUBS`}</div>
          }
          {c.datasetCounter !== 0 &&
            <div className="pill pill-data">{`${c.datasetCounter} DATA`}</div>
          }
          {c.notebookCounter !== 0 &&
            <div className="pill pill-lab">{`${c.notebookCounter} LAB`}</div>
          }
        </div>

        <FavoriteList
          collections={collections}
          config={config}
          favorites={favorites}
          onCollectionSelect={this.props.onCollectionSelect}
          onFavoriteDelete={this.props.onFavoriteDelete}
          pills={{
            [EnumCatalog.CKAN]: true,
            [EnumCatalog.OPENAIRE]: true,
            [EnumCatalog.LAB]: true,
          }}
          showBreadcrumb={false}
          showCounters={false}
          text={''}
        />
      </div >
    );
  }

}

export default CollectionItem;
