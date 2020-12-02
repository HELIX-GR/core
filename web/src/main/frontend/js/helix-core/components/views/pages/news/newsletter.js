import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import moment from '../../../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import { injectIntl } from 'react-intl';

import {
  Link,
  NavLink,
} from 'react-router-dom';

import {
  FormattedDate,
} from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
  EnumPostCategory,
  StaticRoutes,
  WordPressField,
} from '../../../../model';

import {
  getPosts,
} from '../../../../ducks/ui/views/posts';

import ClimateClock from '../../climate-clock';

class Newsletter extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.getPosts(1, 100, EnumPostCategory.Newsletter);
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  onDownload(e, file) {
    e.preventDefault();

    if (file) {
      window.open(file);
    }
  }

  renderDate(post) {
    if (post[WordPressField.Date]) {
      return post[WordPressField.Date];
    }

    const modifiedAt = moment(post.modified);
    const age = moment.duration(moment() - modifiedAt);

    return age.asHours() < 24 ?
      moment(modifiedAt).fromNow() :
      <FormattedDate value={post.modified} day='numeric' month='numeric' year='numeric' />;
  }

  renderPosts(posts) {
    const _t = this.props.intl.formatMessage;

    // Sort posts based on index
    const sortedPosts = _.sortBy(posts, (n) => n[WordPressField.Index]);

    return sortedPosts.map((p) => {
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          this.toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
          '/images/dummy_card.png'
      );

      return (
        <a key={`post-${p.id}`} href="#" onClick={(e) => this.onDownload(e, p[WordPressField.File])} className="cards__item cards__item--newsletter">
          <div className="cards__item__top" style={{ backgroundImage: `url(${imageUrl})` }}></div>
          <h3 className="cards__item__title">{p.title.rendered}</h3>
          <span className="cards__item__button">{_t({ id: 'buttons.card.newsletter-more' })}</span>
        </a>
      );
    });
  }

  render() {
    const { countdown, pages } = this.props;
    const { posts } = pages[EnumPostCategory.Newsletter];

    const _t = this.props.intl.formatMessage;

    return (
      <main className="about page page--sidebar">
        <div className="container">
          <div className="page__wrapper">
            <div className="page__sidebar">
              <h2 className="page__title">{_t({ id: 'breadcrumb.news' })}</h2>
              <ul className="page__sidebar__menu">
                <li>
                  <NavLink to={StaticRoutes.Workshops} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.workshops' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.OtherEvents} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.other-events' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Newsletter} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.newsletter' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.Blog} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.blog' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.DialogueForum} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.dialogue-forum' })}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={StaticRoutes.PressReleases} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.press-releases' })}
                  </NavLink>
                </li>
              </ul>
              <ClimateClock countdown={countdown} minimal />
            </div>
            <div className="page__content">
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.news' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.newsletter' })}</a></li>
              </ul>

              <section className="cards cards--sidebar">
                <div className="cards__inner">
                  {posts && posts.length !== 0 &&
                    this.renderPosts(posts)
                  }
                  <div className="cards__item cards__item--empty"></div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    );
  }

}

const mapStateToProps = (state) => ({
  pages: state.ui.posts.pages,
  countdown: state.countdown.value,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Newsletter));
