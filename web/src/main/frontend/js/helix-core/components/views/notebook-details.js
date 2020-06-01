import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { injectIntl } from 'react-intl';

import moment from '../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  search as searchAll,
} from '../../ducks/ui/views/main';

import {
  getNotebook,
} from '../../ducks/ui/views/notebook';

import {
  addFavorite,
  removeFavorite,
} from '../../ducks/user';

import {
  EnumCatalog,
  StaticRoutes,
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

class NotebookDetails extends React.Component {

  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.scrollToTop();
    this.props.getNotebook(params[PARAM_ID]);
  }

  get organizationLogo() {
    const {
      config: { lab: { host } },
      notebook: { data: n },
    } = this.props;

    if (n.organization) {
      const image = n.organization.image_url;
      if (image) {
        const url = image.startsWith('http') ? image : `${host}/uploads/group/${image}`;

        return (
          <div className="image">
            <a href="/organization/helix">
              <img src={url} width="200" alt={n.organization.title} />
            </a>
          </div>
        );
      }
      return n.organization.title;
    }
    return null;
  }

  get isLoading() {
    const { notebook: { data: n }, loading } = this.props;
    return ((!n) || (loading));
  }

  onSearchTag(e, tag) {
    e.preventDefault();

    this.props.searchAll(tag);
    this.props.history.push(StaticRoutes.MAIN_RESULTS);
  }

  isFavoriteActive(handle) {
    return !!this.props.favorites.find(f => f.catalog === EnumCatalog.LAB && f.handle === handle);
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
          toast.error(<FormattedMessage id={`favorite.${active ? 'remove' : 'add'}-error-notebook`} />);
        });
    } else {
      toast.dismiss();
      toast.error(<FormattedMessage id='favorite.login-required' />);
    }
  }

  getViewerUrl() {
    const { config: { jupyterNotebookViewer }, notebook: { data: n } } = this.props;
    const url = n.resources && n.resources.length === 1 ? n.resources[0].url : null;
    if (!url) {
      return null;
    }

    const index = url.indexOf('://');
    if (index !== -1) {
      return `${jupyterNotebookViewer}${url.substring(index + 3)}`;
    }

    return `${jupyterNotebookViewer}${url}`;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { config: { lab: { host } }, notebook: { data: r } } = this.props;
    const _t = this.props.intl.formatMessage;

    if (this.isLoading) {
      return (
        <div className="results-lab">
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
      <div className="results-lab">
        <section className="main-results-page-content">
          <div className="results-main-content">

            <section className="results-main-sidebar">

              <h5 className="side-heading org-heading">{_t({ id: 'notebook.publisher' })}</h5>
              <section className="side-content">
                {this.organizationLogo}
              </section>

              <h5 className="side-heading">{_t({ id: 'notebook.subjects' })}</h5>
              <section className="side-tags">
                {r.tags &&
                  _.uniq(r.tags).sort().map(tag => (
                    <Tag key={tag} text={tag} onClick={(e, tag) => this.onSearchTag(e, tag)} />
                  ))
                }
              </section>

              {r.license_title &&
                <React.Fragment>
                  <h5 className="side-heading grayed">{_t({ id: 'notebook.license' })}</h5>
                  <section className="license">
                    <img className="facet-icon" src="/images/icons/various/license.svg" />
                    <a href={r.license_url} rel="dc:rights">{r.license_title}</a>
                    {r.isopen &&
                      < a href={r.license_url} title={_t({ id: 'notebook.open-data-license' })}>
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
                      <a href={this.getViewerUrl()} target="_blank">{r.title}</a>
                    </h1>
                  </div>
                  <div className="result-icons">
                    <Favorite
                      active={this.isFavoriteActive(r.id)}
                      catalog={EnumCatalog.LAB}
                      description={r.notes}
                      handle={r.id}
                      onClick={this.toggleFavorite}
                      title={r.title}
                      url={`${host}/dataset/${r.id}`}
                    />
                    {r.datacite &&
                      <div className="package-language">
                        <a href=''> {r.datacite.languagecode}</a>
                      </div>
                    }
                  </div>
                  <div className="dataset-dates">
                    <div className="title">{_t({ id: 'notebook.publication' })}</div>
                    <div className="date"> {moment(r.metadata_created).format('YYYY-MM-DD')}</div>
                    <div className="title">{_t({ id: 'notebook.last-revision' })}</div>
                    <div className="date"> {moment(r.metadata_modified).format('YYYY-MM-DD')}</div>
                  </div>
                  <div className="nav-menu">
                    <li className="active">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fa fa-flask"></i>{_t({ id: 'notebook.notebook' })}
                      </a>
                    </li>
                  </div>
                </div>

                <div className="package-notes">
                  {r.notes}
                </div>

                <section className="package-resources ">
                  <div className="section-title">
                    <h5 className="inline">{_t({ id: 'notebook.resources' })}</h5>
                    <hr className="separator" />
                  </div>
                  <div className="package-resource-list">
                    {r.resources.length !== 0 &&
                      r.resources.map(resource => (
                        <li key={resource.id} className="resource-component clearfix" data-id={resource.id}>
                          <a className="resource-title" href={resource.url} title={resource.name}>
                            {resource.name}
                            <span className="format-label" property="dc:format" data-format={resource.format.toLowerCase()}></span>
                          </a>
                          <div className="btn-group ">
                            <a className=" btn-group-main" href={resource.url}>
                              {_t({ id: 'notebook.buttons.download' })}
                            </a>
                            <a className=" btn-group-main" href={this.getViewerUrl()} target="_blank">
                              {_t({ id: 'notebook.buttons.view' })}
                            </a>
                          </div>
                          <p className="description">
                            {resource.description || _t({ id: 'notebook.no-description' })}
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
  favorites: state.user.profile ? state.user.profile.favorites : [],
  notebook: state.ui.notebook,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavorite,
  getNotebook,
  removeFavorite,
  searchAll,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(NotebookDetails));
