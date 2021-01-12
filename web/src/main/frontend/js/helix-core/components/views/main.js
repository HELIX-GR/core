import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';

import classnames from 'classnames';
import moment from '../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  FormattedDate,
} from 'react-intl';

import {
  Link,
} from 'react-router-dom';

import {
  getLatestPosts,
} from '../../ducks/ui/views/posts';

import {
  buildPath,
  DynamicRoutes,
  EnumPostCategory,
  StaticRoutes,
  WordPressField,
} from '../../model';

import ClimateClock from './climate-clock';
import { Draggable } from './parts';

const KEYSTROKE_INTERVAL = 800;

const toggleSecureUrl = (content) => {
  return content.replace(/(http:\/\/)/g, 'https://');
};

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  showModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  componentDidMount() {
    this.props.getLatestPosts(5);

    this.interval = setInterval(() => {

    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onPostClick(e, category, post) {
    if (category && category.name === EnumPostCategory.Newsletter) {
      e.preventDefault();

      const file = post[WordPressField.File];

      if (file) {
        window.open(file);
      }
    }
  }

  renderPostDate(post) {
    if (post[WordPressField.Date]) {
      return post[WordPressField.Date];
    }

    const modifiedAt = moment(post.modified);
    const age = moment.duration(moment() - modifiedAt);

    return age.asHours() < 24 ?
      moment(modifiedAt).fromNow() :
      <FormattedDate value={post.modified} day='numeric' month='numeric' year='numeric' />;
  }

  renderPostIcon(post, category) {
    let icon = 'blog_icon.svg';

    if (category) {
      switch (category.name) {
        case EnumPostCategory.DialogueForum:
          icon = 'dialogue_forum_icon.svg';
          break;
        case EnumPostCategory.Newsletter:
          icon = 'newsletter_icon.svg';
          break;
        case EnumPostCategory.OtherEvent:
          icon = 'events_icon.svg';
          break;
        case EnumPostCategory.PressRelease:
          icon = 'press_release_icon.svg';
          break;
        case EnumPostCategory.Workshop:
          icon = 'workshop_icon.svg';
          break;
      }
    }
    return (
      <img src={`/images/icons/${icon}`} alt="" className="cards__item__icon" />
    );
  }

  renderPosts(posts = []) {
    const { config: { wordPress: { categories } } } = this.props;

    const _t = this.props.intl.formatMessage;

    const items = [];

    const titleStyle = { maxWidth: 360 };
    const imageStyle = { maxWidth: 400 };

    posts.forEach((p) => {
      // Must have at least one category
      if (!p.categories.length) {
        return;
      }

      // Convert category id to number
      const category = categories.find(c => +c.id === p.categories[0]);
      if (!category) {
        return;
      }

      // Get featured image
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
          '/images/dummy_card.png'
      );

      // Get author
      const author = p[WordPressField.Author] || p._embedded.author[0].name;

      // Get date either as a fixed date from a custom field or as
      // the interval from the publication date
      const date = this.renderPostDate(p);

      // Get title
      const title = p[WordPressField.Location] || p[WordPressField.Title] || '';

      // Get card class
      let cardClassName = 'cards__item cards__item';
      let buttonResource = '';

      switch (category.name) {
        case EnumPostCategory.Blog:
          cardClassName += '--blog';
          buttonResource = 'buttons.card.blog-more';
          break;
        case EnumPostCategory.DialogueForum:
          cardClassName += '--forum';
          buttonResource = 'buttons.card.dialogue-forum-more';
          break;
        case EnumPostCategory.Newsletter:
          cardClassName += '--newsletter';
          buttonResource = 'buttons.card.newsletter-more';
          break;
        case EnumPostCategory.OtherEvent:
          cardClassName += '--events';
          buttonResource = 'buttons.card.other-event-more';
          break;
        case EnumPostCategory.PressRelease:
          buttonResource = 'buttons.card.press-release-more';
          break;
        case EnumPostCategory.Workshop:
          buttonResource = 'buttons.card.workshop-more';
          break;
      }

      items.push(
        <Link
          key={`post-${p.id}`}
          className={cardClassName}
          to={buildPath(DynamicRoutes.POST_PAGE, [p.id])}
          onClick={(e) => this.onPostClick(e, category, p)}
        >
          <div className="cards__item__top">
            {this.renderPostIcon(p, category)}
            <span className="cards__item__date">{title ? `${title} • ` : ''}{date}</span>
            <h3 className="cards__item__title" style={titleStyle}>{p.title.rendered}</h3>
          </div>
          <div className="cards__item__img">
            <img src={imageUrl} alt="" style={imageStyle} />
          </div>
          <span className="cards__item__button">{_t({ id: buttonResource })}</span>
        </Link >
      );
    });

    // Add 3 placeholders for each missing post (5 posts are rendered)
    for (let i = items.length * 3; i < 15; i++) {
      items.push(
        <div key={`latest-posts-last-element-${i}`} className="cards__item cards__item--empty"></div>
      );
    }

    return items;
  }

  render() {
    const { open } = this.state;
    const { countdown, posts: { latest: { posts } } } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <React.Fragment>
        <main className="home">
          <div className="container">
            <ClimateClock countdown={countdown} />

            <section className="home__bigtext">
              <div className="home__bigtext__main">
                <h1><FormattedMessage id="text.main.header" /></h1>
                <div className="home__bigtext__buttons">
                  <Link to={StaticRoutes.Overview} className="btn btn--std">{_t({ id: 'buttons.learn-more' })}</Link>
                  <Link to={StaticRoutes.Targets} className="btn btn--std">{_t({ id: 'buttons.our-targets' })}</Link>
                </div>
              </div>
              <div className="home__bigtext__video">
                <div className="home__bigtext__video__wrapper open-modal-video" onClick={(e) => {
                  e.preventDefault();

                  this.showModal();
                }}>
                  <img src="/images/video.jpg" alt="" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="47.184" height="52.931" viewBox="0 0 47.184 52.931">
                    <path id="Polygon_1" data-name="Polygon 1" d="M26.465,0,52.931,47.184H0Z" transform="translate(47.184) rotate(90)" fill="#c9e9fc" />
                  </svg>
                </div>
              </div>
            </section>
            <section className="home__climpact">
              <div className="home__climpact__text">
                <p><FormattedMessage id="text.main.content" /></p>
              </div>
              <div className="home__climpact__logos">
                <a target="_blank" href="http://www.noa.gr/"><img src="/images/logos/asteroskopio-logo-white.png" alt="" /></a>
                <a target="_blank" href="http://www.academyofathens.gr/"><img src="/images/logos/athens-Academy-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.uoa.gr/"><img src="/images/logos/ekpa-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.auth.gr/"><img src="/images/logos/aristoteleio-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.hcmr.gr/"><img src="/images/logos/hcmr-logo-white.png" alt="" /></a>
                <a target="_blank" href="http://www.demokritos.gr/"><img src="/images/logos/demokritos-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.ntua.gr/"><img src="/images/logos/metsovio-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.uoc.gr/"><img src="/images/logos/uoc-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.tuc.gr/"><img src="/images/logos/polutechneio-kritis-logo-white.png" alt="" /></a>
                <a target="_blank" href="http://www.athena-innovation.gr/"><img src="/images/logos/athena-RC-logo-white.png" alt="" /></a>
                <a target="_blank" href="https://www.ekke.gr/"><img src="/images/logos/ekke-logo-white.png" alt="" /></a>
                <a href="#" className="empty"></a>
              </div>
            </section>
            <section className="cards">
              <h1><FormattedMessage id="text.main.recent-activity" /></h1>
              <div className="container">
                <Draggable className="cards__inner">
                  {posts && this.renderPosts(posts)}
                </Draggable>
              </div>
            </section>
          </div>
        </main>

        <div id="modal_video_home" className={
          classnames({
            'people_modal': true,
            "modal": true,
            'show-modal': open,
          })
        }>
          <a href="#" className="modal__close" onClick={(e) => {
            e.preventDefault();
            this.closeModal();
          }}>
            <img src="/images/icons/modal_close_white.svg" alt="" />
          </a>
          <div className="people_modal__wrapper">
            <div className="modal__iframe">
              <div className="modal__iframe__cont">
                {open &&
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/UtgYSgJyeJo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => ({
  config: state.config,
  countdown: state.countdown.value,
  locale: state.i18n.locale,
  posts: state.ui.posts,
  viewport: state.ui.viewport,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getLatestPosts
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main));
