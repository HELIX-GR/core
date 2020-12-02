import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import moment from '../../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  FormattedDate,
} from 'react-intl';

import {
  getPost,
} from '../../../ducks/ui/views/posts';

import {
  EnumCatalog,
  EnumPostCategory,
  PathVariable,
  WordPressField,
} from '../../../model';

const toggleSecureUrl = (content) => {
  return content.replace(/(http:\/\/)/g, 'https://');
};

class PostPage extends React.Component {

  constructor(props) {
    super(props);

    const id = this.getId(props);

    props.getPost(id);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  getId(props) {
    const params = props.match.params;
    const id = params[PathVariable.Id];

    if (!isNaN(id)) {
      return +id;
    }
    return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const prevId = this.getId(prevProps);
    const nextId = this.getId(this.props);

    if (prevId !== nextId) {
      this.props.getPost(nextId);
    }
  }

  renderIcon(post, category) {
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
          icon = 'newsletter_icon.svg';
          break;
        case EnumPostCategory.Workshop:
          icon = 'workshop_icon.svg';
          break;
      }
    }
    return (
      <div className="hero__icon">
        <img src={`/images/icons/${icon}`} style={{ maxWidth: 27 }} />
      </div>
    );
  }

  renderBreadcrumb(post, category) {
    const _t = this.props.intl.formatMessage;

    return (
      <ul className="page__breadcrumbs">
        <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
        <li><a href="#">{_t({ id: 'breadcrumb.news' })}</a></li>
        {category &&
          <li><a href="#">{_t({ id: `breadcrumb.${category.name}` })}</a></li>
        }
        <li><a href="#">{post.title.rendered}</a></li>
      </ul>
    );
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

  render() {
    const {
      config: { wordPress: { categories } },
      posts: { current: p }
    } = this.props;


    if (!p) {
      return null;
    }

    // NOTE: Convert category id to number
    const category = categories.find(c => +c.id === p.categories[0]);

    // Get featured image
    const imageUrl = (
      p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
        toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
        '/images/dummy_card.png'
    );

    const layerStyle = { backgroundImage: imageUrl ? `url(${imageUrl})` : '' };

    // Get author
    const author = p[WordPressField.Author] || p._embedded.author[0].name;

    return (
      <main className="single page">
        <div className="single__layer" style={layerStyle}></div>

        <section className="hero">
          <div className="hero__wrapper">
            <div className="container container--md">
              {this.renderIcon(p, category)}
              {this.renderBreadcrumb(p, category)}
              <h1>{p.title.rendered}</h1>
              <div className="hero__info"><strong>{author}</strong> • {this.renderDate(p)}</div>
            </div>
          </div>
        </section>

        <div className="container container--md" dangerouslySetInnerHTML={{ __html: toggleSecureUrl(p.content.rendered) }}>
        </div>
      </main>
    );
  }

}

const mapStateToProps = (state) => ({
  config: state.config,
  posts: state.ui.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPost,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostPage));
