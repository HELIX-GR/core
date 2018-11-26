import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import moment from '../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  Link,
} from 'react-router-dom';

import {
  search as searchAll,
} from '../../ducks/ui/views/main';

import {
  getPublication,
} from '../../ducks/ui/views/publication';

import {
  addFavorite,
  removeFavorite,
} from '../../ducks/user';

import {
  buildPath,
  DynamicRoutes,
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
  ProgressBar,
  Tag,
} from '../helpers';

import {
  Citation,
} from './publications-parts';

const PARAM_ID = 'id';

class PublicationDetails extends React.Component {

  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  static contextTypes = {
    intl: PropTypes.object,
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.props.getPublication(params[PARAM_ID]);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: previousParams } } = this.props;
    const { match: { params: nextParams } } = nextProps;

    if (previousParams[PARAM_ID] !== nextParams[PARAM_ID]) {
      this.props.getPublication(nextParams[PARAM_ID]);
    }
  }

  get hostedBy() {
    const {
      publication: { data: pub },
    } = this.props;

    if (pub && pub.instances.length !== 0) {
      return pub.instances[0].hostedBy || null;
    }
    return null;
  }

  get getRepositoryLogo() {
    const {
      config: { openaire: { providers } },
      publication: { data: pub },
    } = this.props;
    const _t = this.context.intl.formatMessage;

    if (this.hostedBy) {
      const provider = providers.find(p => p.id === this.hostedBy.id) || null;
      if (provider) {
        const src = `/images/providers/${this.hostedBy.id}.png`;
        return (
          <div className="image">
            <a>
              <img src={src} alt={pub.publisher} />
            </a>
          </div>
        );
      }
      return (
        <React.Fragment>
          <div className="mb-3">{pub.publisher}</div>
          <div>{_t({ id: 'publication.hosted-by' }, { host: this.hostedBy.name })}</div>
        </React.Fragment>
      );
    }

    return (
      <div>{pub.publisher}</div>
    );
  }

  onSearchTag(e, tag) {
    e.preventDefault();

    this.props.searchAll(tag);
    this.props.history.push(StaticRoutes.MAIN_RESULTS);
  }

  isFavoriteActive(handle) {
    return !!this.props.favorites.find(f => f.catalog === EnumCatalog.OPENAIRE && f.handle === handle);
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
    const { config: { openaire: { host } }, publication: { data: p }, loading } = this.props;
    const _t = this.context.intl.formatMessage;

    if ((!p) || (loading)) {
      return null;
    }

    return (
      <div className="results-pubs">
        <section className="main-results-page-content">
          <div className="results-main-content">

            <section className="results-main-sidebar">

              <h5 className="side-heading org-heading">{_t({ id: 'publication.publisher' })}</h5>
              <section className="side-content">
                {this.getRepositoryLogo}
              </section>

              <h5 className="side-heading">{_t({ id: 'publication.subjects' })}</h5>
              <section className="side-tags">
                {p.subjects &&
                  p.subjects.sort().map(tag => (
                    <Tag key={tag} text={tag} onClick={(e, tag) => this.onSearchTag(e, tag)} />
                  ))
                }
              </section>

              {p.license_title &&
                <React.Fragment>
                  <h5 className="side-heading grayed">{_t({ id: 'publication.license' })}</h5>
                  <section className="license">
                    <img className="facet-icon" src="/images/icons/various/license.svg" />
                    <a href={p.license_url} rel="dc:rights">{p.license_title}</a>
                    {p.isopen &&
                      < a href={p.license_url} title="This publication satisfies the Open Definition.">
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
                  <a className="breadcrumbs-part">{p.publisher || (this.hostedBy ? this.hostedBy.name : '')}</a>
                  <a className="breadcrumbs-part">{p.title}</a>
                </div>
              </div>

              <div className="main-results-border-bottom">
              </div>

              <div className="result-items clearfix">
                <div className="nav-bar">
                  <div>
                    <h1 className="package-title">
                      <a href={`${host}/search/publication?articleId=${p.objectIdentifier}`} target="_blank">
                        {p.title}
                      </a>
                    </h1>
                  </div>
                  <div className="result-icons">
                    <Favorite
                      active={this.isFavoriteActive(p.objectIdentifier)}
                      catalog={EnumCatalog.OPENAIRE}
                      description={p.description[0] || null}
                      handle={p.objectIdentifier}
                      onClick={this.toggleFavorite}
                      title={p.title}
                      url={`${host}/search/publication?articleId=${p.objectIdentifier}`}
                    />
                    {p.instances.length !== 0 && p.instances[0].url &&
                      <div className="btn-save">
                        <a href={p.instances[0].url} target="_blank" data-toggle="tooltip" data-placement="bottom" title="">
                          <img src="/images/png/save.png" />
                        </a>
                      </div>
                    }
                  </div>
                  <div className="dataset-dates">
                    {p.embargoEndDate &&
                      <React.Fragment>
                        <div className="title">{_t({ id: 'publication.embargo-end-date' })}</div>
                        <div className="date"> {p.embargoEndDate}</div>
                      </React.Fragment>
                    }
                    <div className="title">{_t({ id: 'publication.date-of-acceptance' })}</div>
                    <div className="date"> {p.dateOfAcceptance}</div>
                  </div>
                  <div className="nav-menu">
                    <li className="active">
                      <a href="">
                        <i className="fa fa-sitemap"></i>{_t({ id: 'publication.publication' })}
                      </a>
                    </li>
                  </div>
                </div>

                <div className="tag-list">
                  {p.creators.length > 0 &&
                    p.creators.map(creator => {
                      if ((!creator.surname) && (!creator.name)) {
                        return null;
                      }
                      return (
                        <a
                          key={creator.rank}
                          href=''
                          onClick={(e) => e.preventDefault()}
                          className="tag-box tag-box-category"
                          target="blank"
                        >
                          <div>
                            {`${creator.surname}, ${creator.name}`}
                          </div>
                        </a>
                      );
                    })
                  }
                </div>

                <div className="package-notes">
                  {p.description[0] || _t({ id: 'publication.no-description' })}
                </div>

                <div className="tag-list">
                  {p.instances.length !== 0 && p.instances[0].type &&
                    <a
                      href=''
                      onClick={(e) => e.preventDefault()}
                      className="tag-box tag-box-category"
                      target="blank"
                    >
                      <div>
                        {p.instances[0].type}
                      </div>
                    </a>
                  }
                  {p.language &&
                    <a
                      href=''
                      onClick={(e) => e.preventDefault()}
                      className="tag-box tag-box-other"
                      target="blank"
                    >
                      <div>
                        {p.language}
                      </div>
                    </a>
                  }
                  {p.bestAccessRight &&
                    <a
                      href=''
                      onClick={(e) => e.preventDefault()}
                      className="tag-box tag-box-other"
                      target="blank"
                    >
                      <div>
                        {p.bestAccessRight}
                      </div>
                    </a>
                  }
                  {p.fullTextUrl &&
                    <a
                      href={p.fullTextUrl}
                      className="tag-box tag-box-other link"
                      target="blank"
                    >
                      <div>
                        PDF
                      </div>
                    </a>
                  }
                </div>

                {p.related.length !== 0 &&
                  <section className="related-publications">
                    <div className="section-title">
                      <h5 className="inline">{_t({ id: 'publication.related-publications' }, { count: p.related.length })}</h5>
                      <hr className="separator" />
                    </div>
                    <div className="related-publication-list">
                      {p.related.map(pub => (
                        <li key={pub.id} className="publication-component clearfix" data-id={pub.id}>
                          <div className="publication-component-group">
                            <div className="publication-component-title">
                              <Link to={buildPath(DynamicRoutes.PUBLICATION_PAGE, [pub.id])} title={pub.title}>
                                {pub.title}
                              </Link>
                              {pub.dateOfAcceptance &&
                                <span className="pl-1">
                                  ({moment(pub.dateOfAcceptance).year()})
                            </span>
                              }
                            </div>
                            <div className=" btn-group publication-component-similarity" title={_t({ id: 'publication.similarity' })}>
                              <ProgressBar value={pub.similarity * 100} width={'40px'} />
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </section>
                }

                <section className="citation">
                  <div className="section-title">
                    <h5 className="inline">{_t({ id: 'publication.citation' }, { count: p.related.length })}</h5>
                    <hr className="separator" />
                  </div>
                  <div className="citation-component">
                    <Citation publication={p} />
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
  publication: state.ui.publication,
  favorites: state.user.favorites,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFavorite,
  getPublication,
  removeFavorite,
  searchAll,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicationDetails);
