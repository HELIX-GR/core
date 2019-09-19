import * as React from 'react';

import {
  EnumCatalog,
} from '../../../model';

import {
  FavoriteList,
} from '../favorite-parts';

import {
  Pill,
} from '../../helpers';

class CollectionItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pills: {
        [EnumCatalog.CKAN]: true,
        [EnumCatalog.OPENAIRE]: true,
        [EnumCatalog.LAB]: true,
      },
    };

    this.onPillChanged = this.onPillChanged.bind(this);
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

  render() {
    const { pills } = this.state;
    const { collection: c, collections, config, favorites } = this.props;

    if (!c) {
      return null;
    }

    return (
      <div className="collection-item">
        <div className="collection-title">
          {c.title}
        </div>

        <div className="domain-pills">
          <Pill
            id={EnumCatalog.CKAN}
            counter={c.datasetCounter}
            text="pills.data"
            className="pill-data"
            selected={pills[EnumCatalog.CKAN]}
            onChange={this.onPillChanged}
          />
          <Pill
            id={EnumCatalog.OPENAIRE}
            counter={c.publicationCounter}
            text="pills.pubs"
            className="pill-pubs"
            selected={pills[EnumCatalog.OPENAIRE]}
            onChange={this.onPillChanged}
          />
          <Pill
            id={EnumCatalog.LAB}
            counter={c.notebookCounter}
            text="pills.lab"
            className="pill-lab"
            selected={pills[EnumCatalog.LAB]}
            onChange={this.onPillChanged}
          />
        </div>

        <FavoriteList
          collections={collections}
          config={config}
          favorites={favorites}
          onCollectionSelect={this.props.onCollectionSelect}
          onFavoriteDelete={this.props.onFavoriteDelete}
          pills={pills}
          showBreadcrumb={false}
          showCounters={false}
          text={''}
        />
      </div >
    );
  }

}

export default CollectionItem;
