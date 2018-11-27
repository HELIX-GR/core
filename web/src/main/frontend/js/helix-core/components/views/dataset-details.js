import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import moment from '../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  search as searchAll,
} from '../../ducks/ui/views/main';

import {
  getDataset,
} from '../../ducks/ui/views/dataset';

import {
  addFavorite,
  removeFavorite,
} from '../../ducks/user';

import {
  EnumCatalog,
} from '../../model';

import {
  FormattedMessage,
} from 'react-intl';

import {
  toast,
} from 'react-toastify';

import {
  Favorite,
  Tag,
} from '../helpers';

import {
  Code,
} from 'react-content-loader';

const PARAM_ID = 'id';

class DatasetDetails extends React.Component {

  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  static contextTypes = {
    intl: PropTypes.object,
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.props.getDataset(params[PARAM_ID]);
  }

  get organizationLogo() {
    const {
      config: { data: { host } },
      dataset: { data: r },
    } = this.props;

    if (r.organization) {
      const image = r.organization.image_url;
      if (image) {
        const url = image.startsWith('http') ? image : `${host}/uploads/group/${image}`;

        return (
          <div className="image">
            <a href="/organization/helix">
              <img src={url} width="200" alt={r.organization.title} />
            </a>
          </div>
        );
      }
      return r.organization.title;
    }
    return null;
  }

  get isLoading() {
    const { dataset: { data: d }, loading } = this.props;
    return ((!d) || (loading));
  }

  isFavoriteActive(handle) {
    return !!this.props.favorites.find(f => f.catalog === EnumCatalog.CKAN && f.handle === handle);
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

  render() {
    const { config: { data: { host } }, dataset: { data: r } } = this.props;
    const _t = this.context.intl.formatMessage;

    if (this.isLoading) {
      return (
        <div className="results-data">
          <section className="main-results-page-content">
            <div className="results-main-content">
              <section className="results-main-sidebar">
                <Code />
                <Code />
                <Code />
              </section>
              <section className="results-main-result-set">
                <Code />
                <Code />
                <Code />
              </section>
            </div>
          </section>
        </div >
      );
    }

    return (
      <div className="results-data">
        <section className="main-results-page-content">
          <div className="results-main-content">

            <section className="results-main-sidebar">

              <h5 className="side-heading org-heading">{_t({ id: 'dataset.publisher' })}</h5>
              <section className="side-content">
                {this.organizationLogo}
              </section>

              <h5 className="side-heading">{_t({ id: 'dataset.subjects' })}</h5>
              <section className="side-tags">
                {r.closed_tag &&
                  r.closed_tag.sort().map(tag => (
                    <Tag key={tag} text={tag} onClick={(e, tag) => this.onSearchTag(e, tag)} />
                  ))
                }
              </section>

              {r.license_title &&
                <React.Fragment>
                  <h5 className="side-heading grayed">{_t({ id: 'dataset.license' })}</h5>
                  <section className="license">
                    <img className="facet-icon" src="/images/icons/various/license.svg" />
                    <a href={r.license_url} rel="dc:rights">{r.license_title}</a>
                    {r.isopen &&
                      < a href={r.license_url} title="This dataset satisfies the Open Definition.">
                        <img className="open-data" src="/images/png/open-data.png" alt="[Open Data]" />
                      </a>
                    }
                  </section>
                </React.Fragment>
              }

            </section>

            <section className="results-main-result-set">

              <div className="breadcrumbs-pagination top">
                <div className="breadcrumbs">
                  <a className="breadcrumbs-part">{r.organization.title}</a>
                  <a className="breadcrumbs-part">{r.title}</a>
                </div>
              </div>

              <div className="main-results-border-bottom">
              </div>

              <div className="result-items clearfix">
                <div className="nav-bar">
                  <div>
                    <h1 className="package-title">
                      <a href={`${host}/dataset/${r.id}`}>{r.title}</a>
                    </h1>
                  </div>
                  <div className="result-icons">
                    <Favorite
                      active={this.isFavoriteActive(r.id)}
                      catalog={EnumCatalog.CKAN}
                      description={r.notes}
                      handle={r.id}
                      onClick={this.toggleFavorite}
                      title={r.title}
                      url={`${host}/dataset/${r.id}`}
                    />
                    <div className="btn-favorite">
                      <a href="" data-toggle="tooltip" data-placement="bottom" title="" >
                        <img className="" src="/images/png/favorite.png" />
                      </a>
                    </div>
                    <div className="package-language">
                      <a href=''> {r.datacite.languagecode}</a>
                    </div>
                  </div>
                  <div className="dataset-dates">
                    <div className="title">{_t({ id: 'dataset.publication' })}</div>
                    <div className="date"> {moment(r.metadata_created).format('YYYY-MM-DD')}</div>
                    <div className="title">{_t({ id: 'dataset.last-revision' })}</div>
                    <div className="date"> {moment(r.metadata_modified).format('YYYY-MM-DD')}</div>
                  </div>
                  <div className="nav-menu">
                    <li className="active">
                      <a href={`${host}/dataset/${r.name}`}>
                        <i className="fa fa-sitemap"></i>{_t({ id: 'dataset.dataset' })}
                      </a>
                    </li>
                  </div>
                </div>

                <div className="package-notes">
                  {r.notes}
                </div>

                <section className="package-resources ">
                  <div className="section-title">
                    <h5 className="inline">{_t({ id: 'dataset.resources' })}</h5>
                    <hr className="separator" />
                  </div>
                  <div className="package-resource-list">
                    {r.resources.length !== 0 &&
                      r.resources.map(resource => (
                        <li key={resource.id} className="resource-component clearfix" data-id={resource.id}>
                          <a className="resource-title" href={`${host}/dataset/${r.name}/resource/${resource.id}`} title={resource.name}>
                            {resource.name}
                            <span className="format-label" property="dc:format" data-format={resource.format.toLowerCase()}></span>
                          </a>
                          <div className="btn-download btn-group ">
                            <a className=" btn-group-main" href={resource.url}>{_t({ id: 'dataset.buttons.download' })}</a>
                          </div>
                          <p className="description">
                            {resource.description || _t({ id: 'dataset.no-description' })}
                          </p>
                        </li>
                      ))
                    }
                  </div>
                </section>

              </div>
            </section>

          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  dataset: state.ui.dataset,
  favorites: state.user.favorites,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavorite,
  getDataset,
  removeFavorite,
  searchAll,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DatasetDetails);
