import * as React from 'react';

import { injectIntl } from 'react-intl';

import {
  Pagination,
} from '../shared-parts';

import {
  Favorite,
  FavoriteCollectionPicker,
} from '../../helpers';

import {
  EnumCatalog,
} from '../../../model';

const MAX_TITLE_LENGTH = 77;
const MAX_NOTES_LENGTH = 192;
const DEFAULT_PAGE_SIZE = 5;

const dateComparator = (f1, f2) => {
  const d1 = (new Date(f1.createdOn)).getTime();
  const d2 = (new Date(f2.createdOn)).getTime();

  if (d1 < d2) {
    return 1;
  }
  if (d1 > d2) {
    return -1;
  }

  return 0;
};

const titleComparator = (f1, f2) => {
  return f1.title.localeCompare(f2.title);
};

const filterFavorites = (
  favorites = [],
  pageIndex = 0,
  pageSize = DEFAULT_PAGE_SIZE,
  text = '',
  selectData = true,
  selectLab = true,
  orderBy = 'createdOn'
) => {
  const items = favorites.filter(f => {
    return (
      (f.catalog === EnumCatalog.CKAN && selectData) ||
      (f.catalog === EnumCatalog.LAB && selectLab)
    ) && (!text || f.title.indexOf(text) !== -1);
  });

  // Adjust page index if the page index if out of range after items have been filtered
  if (items.length <= pageIndex * pageSize) {
    pageIndex = Math.max(0, Math.ceil(items.length / pageSize) - 1);
  }

  items.sort(orderBy === 'createdOn' ? dateComparator : titleComparator);

  return {
    pageIndex,
    pageSize,
    items
  };
};

class FavoriteList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'createdOn',
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZE,
    };

    this.onFavoriteDelete = this.onFavoriteDelete.bind(this);
  }

  static defaultProps = {
    showCounters: true,
  }

  static getDerivedStateFromProps(props, state) {
    const { favorites, pills, text } = props;
    const { orderBy, pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE } = state;

    return filterFavorites(
      favorites,
      pageIndex,
      pageSize,
      text,
      pills[EnumCatalog.CKAN],
      pills[EnumCatalog.LAB],
      orderBy
    );
  }


  search(pageIndex = 0, pageSize = DEFAULT_PAGE_SIZE) {
    const { favorites, pills, text } = this.props;
    const { orderBy } = this.state;

    const updates = filterFavorites(
      favorites,
      pageIndex,
      pageSize,
      text,
      pills[EnumCatalog.CKAN],
      pills[EnumCatalog.LAB],
      orderBy
    );

    this.setState(updates);
  }

  onPageChange(index) {
    const { pageIndex = 0 } = this.state;

    if (index !== pageIndex) {
      this.search(index);
    }
  }

  onOrderChange(orderBy) {
    this.setState({
      orderBy,
    });

    // Update UI in the next tick
    setTimeout(() => this.search());
  }

  onFavoriteDelete(favorite) {
    const { onFavoriteDelete } = this.props;

    if (onFavoriteDelete) {
      onFavoriteDelete(favorite);
    }
  }

  renderDataset(r, host) {
    return (
      <div className="result-item data" key={`dataset-fav-${r.handle}`}>
        <Favorite
          active={true}
          activeClass="active-auto-hide"
          activeImage="/images/icons/various/delete.svg"
          catalog={EnumCatalog.CKAN}
          description={r.description}
          handle={r.handle}
          onClick={this.onFavoriteDelete}
          title={r.title}
          url={`${host}/dataset/${r.handle}`}
        />
        {this.props.onCollectionSelect && this.props.collections.length !== 0 &&
          <FavoriteCollectionPicker
            favorite={r}
            onClick={this.props.onCollectionSelect}
          />
        }
        <h3 className="title">
          <a href={`${host}/dataset/${r.handle}`} target="_blank">
            {r.title.length > MAX_TITLE_LENGTH ? `${r.title.substring(0, MAX_TITLE_LENGTH)} ...` : r.title}
          </a>
          <div className="pill data ml-1">
            DATA
          </div>
        </h3>
        <div className="notes">
          {r.description.length > MAX_NOTES_LENGTH ? `${r.description.substring(0, MAX_NOTES_LENGTH)} ...` : r.description}
        </div>
      </div>
    );
  }

  renderNotebook(n, host) {
    return (
      <div className="result-item lab" key={`notebook-fav-${n.handle}`}>
        <Favorite
          active={true}
          activeClass="active-auto-hide"
          activeImage="/images/icons/various/delete.svg"
          catalog={EnumCatalog.LAB}
          description={n.description}
          handle={n.handle}
          onClick={this.onFavoriteDelete}
          title={n.title}
          url={`${host}/dataset/${n.handle}`}
        />
        {this.props.onCollectionSelect && this.props.collections.length !== 0 &&
          <FavoriteCollectionPicker
            favorite={n}
            onClick={this.props.onCollectionSelect}
          />
        }
        <h3 className="title">
          <a href={`https://lab.hellenicdataservice.gr/notebook/${n.handle}`} target="_blank">
            {n.title.length > MAX_TITLE_LENGTH ? `${n.title.substring(0, MAX_TITLE_LENGTH)} ...` : n.title}
          </a>
          <div className="pill lab ml-1">
            LAB
          </div>
        </h3>
        <div className="notes">
          {n.description.length > MAX_NOTES_LENGTH ? `${n.description.substring(0, MAX_NOTES_LENGTH)} ...` : n.description}
        </div>
      </div>
    );
  }

  renderResults(favorites) {
    if (favorites.count === 0) {
      return null;
    }

    const { data: { host: dataHost }, lab: { host: labHost } } = this.props.config;

    return favorites
      .map(f => {
        switch (f.catalog) {
          case EnumCatalog.CKAN:
            return this.renderDataset(f, dataHost);
          case EnumCatalog.LAB:
            return this.renderNotebook(f, labHost);
          default:
            return null;
        }
      })
      .filter(r => !!r);
  }

  render() {
    const {
      orderBy,
      pageIndex,
      pageSize,
      items,
    } = this.state;

    const {
      showBreadcrumb = true,
      pills,
      showCounters,
    } = this.props;

    const _t = this.props.intl.formatMessage;

    const page = items.filter((f, index) => (index >= pageIndex * pageSize) && (index < (pageIndex + 1) * pageSize));

    const countData = items.filter(f => f.catalog === EnumCatalog.CKAN).length;
    const countLab = items.filter(f => f.catalog === EnumCatalog.LAB).length;

    const rowCount = items.length;
    const pageCount = Math.ceil(rowCount / pageSize);

    return (
      <section className="results-main-result-set">

        <Pagination
          breadcrumbPrefix="breadcrumb.favorites"
          className="top"
          showBreadcrumb={showBreadcrumb}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageChange={(pageIndex) => this.onPageChange(pageIndex)}
        />

        <div className="main-results-border-bottom">
          <label className="order-by " htmlFor="order-by">{_t({ id: 'favorites.order-by.label' })}
            <select
              name="order-by"
              id="order-by"
              value={orderBy}
              onChange={(e) => { this.onOrderChange(e.target.value); }}
            >
              <option value="createdOn">
                {_t({ id: 'favorites.order-by.options.date' })}
              </option>
              <option value="title">
                {_t({ id: 'favorites.order-by.options.title' })}
              </option>
            </select>
          </label>
          {showCounters === true &&
            <div className="main-results-result-count">
              {pills[EnumCatalog.CKAN] &&
                <span>{_t({ id: 'results.shared.count.data' }, { count: countData })}</span>
              }
              {pills[EnumCatalog.LAB] &&
                <React.Fragment>
                  {pills[EnumCatalog.CKAN] &&
                    <span className="pr-2 pl-2">|</span>
                  }
                  <span>{_t({ id: 'results.shared.count.lab' }, { count: countLab })}</span>
                </React.Fragment>
              }
            </div>
          }
        </div>

        <div className="result-items">
          {this.renderResults(page)}
        </div>

        <div className="main-results-border-bottom">

        </div>

        <Pagination
          breadcrumbPrefix="breadcrumb.favorites"
          className="bottom"
          showBreadcrumb={showBreadcrumb}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageChange={(pageIndex) => this.onPageChange(pageIndex)}
        />

      </section>
    );
  }

}

export default injectIntl(FavoriteList);
