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

const truncateText = (text, tag, length = 200) => {
  const result = text.replace(`<${tag}>`, '').replace(`</${tag}>`, '');
  return result.length > length ? result.substring(0, length) + '...' : result;
};

class DialogueForum extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.getPosts(1, 100, EnumPostCategory.DialogueForum);
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  renderHeader(p) {
    const location = p[WordPressField.Location];
    const date = p[WordPressField.Date];

    if (location && date) {
      return (<div className="cards__item__date">{`${location} • ${date}`}</div>);
    }

    return (<div className="cards__item__date">{location ? location : date ? date : ''}</div>);
  }

  renderPosts(posts) {
    const _t = this.props.intl.formatMessage;

    return posts.map((p) => {
      const author = p[WordPressField.Author] || p._embedded.author[0].name;

      return (
        <Link key={`post-${p.id}`} to={buildPath(DynamicRoutes.POST_PAGE, [p.id])} className="cards__item cards__item--forum">
          <div className="cards__item__top cards__item__top--flex">
            <div className="cards__item__top__upper">
              {this.renderHeader(p)}
              <div className="cards__item__title">{p.title.rendered}</div>
              <p className="cards__item__text" dangerouslySetInnerHTML={{ __html: truncateText(this.toggleSecureUrl(p.excerpt.rendered), 'p') }}></p>
            </div>
            <div className="cards__item__top__lower">
              <p className="cards__item__text">{author}</p>
            </div>
          </div>
          <span className="cards__item__button">{_t({ id: 'buttons.card.dialogue-forum-more' })}</span>
        </Link>
      );
    });
  }

  render() {
    const { countdown, pages } = this.props;
    const { posts } = pages[EnumPostCategory.DialogueForum];

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
                {/* <li>
                  <NavLink to={StaticRoutes.OtherEvents} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.other-events' })}
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to={StaticRoutes.Newsletter} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.newsletter' })}
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to={StaticRoutes.Blog} activeClassName="active">
                    {_t({ id: 'header.menu.news-events.items.blog' })}
                  </NavLink>
                </li> */}
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
                <li><a href="#">{_t({ id: 'breadcrumb.dialogue-forum' })}</a></li>
              </ul>

              <section className="cards cards--sidebar">
                <div className="cards__inner">
                  {posts && posts.length !== 0 &&
                    this.renderPosts(posts)
                  }
                  <div className="cards__item cards__item--empty"></div>
                </div>
              </section>

              {/*
              <div className="pagination">
                <a href="#" className="pagination__arrow pagination__arrow--left pagination__arrow--inactive"></a>
                <ul>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li className="dots"><span></span><span></span><span></span></li>
                  <li><a href="#">8</a></li>
                </ul>
                <a href="#" className="pagination__arrow pagination__arrow--right"></a>
              </div>
              */}
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

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(DialogueForum));
